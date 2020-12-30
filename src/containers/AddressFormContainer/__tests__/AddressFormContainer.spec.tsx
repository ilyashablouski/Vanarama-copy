import React from 'react';
import preloadAll from 'jest-next-dynamic';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { GetAddressContainerDataQueryVariables as QueryVariables } from '../../../../generated/GetAddressContainerDataQuery';
import {
  SaveAddressHistoryMutation as Mutation,
  SaveAddressHistoryMutationVariables as MutationVariables,
} from '../../../../generated/SaveAddressHistoryMutation';
import {
  reverseDefaultFormatDate,
  historyToDateObject,
} from '../../../utils/dates';
import AddressFormContainer from '../AddressFormContainer';
import {
  noSavedAddresses,
  withSavedAddresses,
  withSavedAddressesInWrongOrder,
} from '../fixtures';
import { GET_ADDRESS_CONTAINER_DATA, SAVE_ADDRESS_HISTORY } from '../gql';

describe('<AddressFormContainer />', () => {
  beforeEach(async () => {
    await preloadAll();
  });
  it.skip('should post data to the server correctly', async () => {
    // ARRANGE
    let mutationCalled = false;
    const personUuid = '1337';
    const onCompletedMock = jest.fn();
    const mocks: MockedResponse[] = [
      {
        request: {
          query: GET_ADDRESS_CONTAINER_DATA,
          variables: {
            uuid: personUuid,
          } as QueryVariables,
        },
        result: {
          data: noSavedAddresses,
        },
      },
      {
        request: {
          query: SAVE_ADDRESS_HISTORY,
          variables: {
            input: {
              partyId: '911',
              addresses: [
                {
                  serviceId: 'GB|001',
                  propertyStatus: 'Mortgage',
                  startedOn: '1990-01-01',
                },
              ],
            },
          } as MutationVariables,
        },
        result: () => {
          mutationCalled = true;
          return {
            data: {
              createUpdateAddress: [
                {
                  __typename: 'AddressType',
                  uuid: '24fee0a6-8953-11ea-bc55-0242ac130003',
                  city: '',
                  lineOne: '',
                  serviceId: 'GB|001',
                  lineTwo: null,
                  postcode: '',
                  propertyStatus: 'Mortgage',
                  startedOn: '1990-01-01',
                },
              ],
            } as Mutation,
          };
        },
      },
    ];

    // ACT
    render(
      <MockedProvider addTypename={false} mocks={mocks}>
        <AddressFormContainer
          personUuid={personUuid}
          onCompleted={onCompletedMock}
        />
      </MockedProvider>,
    );

    await screen.findByTestId('address-history-heading');

    fireEvent.change(screen.getByTestId('history[0].address'), {
      target: { value: 'GB|001' },
    });

    fireEvent.change(screen.getByTestId('history[0].status'), {
      target: { value: 'Mortgage' },
    });

    fireEvent.change(screen.getByTestId('history[0].month'), {
      target: { value: '1' },
    });

    fireEvent.change(screen.getByTestId('history[0].year'), {
      target: { value: '1990' },
    });

    fireEvent.click(screen.getByText('Continue'));

    // ASSERT
    await waitFor(() => expect(mutationCalled).toBeTruthy());
    expect(onCompletedMock).toHaveBeenCalledTimes(1);
  });

  it('should prefill data from the server', async () => {
    // ARRANGE
    let mutationCalled = false;
    const personUuid = '1337';

    const now = new Date();
    const lastYear = String(now.getFullYear() - 1);
    const currentMonth = String(now.getMonth() + 1);
    const asDateString = reverseDefaultFormatDate(
      historyToDateObject({
        month: currentMonth,
        year: lastYear,
      }),
    );

    const onCompletedMock = jest.fn();
    const mocks: MockedResponse[] = [
      {
        request: {
          query: GET_ADDRESS_CONTAINER_DATA,
          variables: {
            uuid: personUuid,
          } as QueryVariables,
        },
        result: {
          data: withSavedAddresses(asDateString),
        },
      },
      {
        request: {
          query: SAVE_ADDRESS_HISTORY,
          variables: {
            input: {
              partyId: '911',
              addresses: [
                {
                  serviceId: 'GB|1337',
                  propertyStatus: 'Rented',
                  startedOn: asDateString,
                },
                {
                  serviceId: 'GB|002',
                  propertyStatus: 'Mortgage',
                  startedOn: '1990-01-01',
                },
              ],
            },
          } as MutationVariables,
        },
        result: () => {
          mutationCalled = true;
          return {
            data: {
              createUpdateAddress: [
                {
                  __typename: 'AddressType',
                  uuid: 'a1e79c5d-4e69-4098-aede-e55ac8394123',
                  city: '',
                  lineOne: '',
                  serviceId: 'GB|1337',
                  lineTwo: null,
                  postcode: '',
                  propertyStatus: 'Rented',
                  startedOn: asDateString,
                },
                {
                  __typename: 'AddressType',
                  uuid: '88924d6c-ddb5-4067-97c4-081dbed0318a',
                  city: '',
                  lineOne: '',
                  serviceId: 'GB|002',
                  lineTwo: null,
                  postcode: '',
                  propertyStatus: 'Motgage',
                  startedOn: '1990-01-01',
                },
              ],
            } as Mutation,
          };
        },
      },
    ];

    // ACT
    render(
      <MockedProvider addTypename={false} mocks={mocks}>
        <AddressFormContainer
          personUuid={personUuid}
          onCompleted={onCompletedMock}
        />
      </MockedProvider>,
    );

    // Wait for the initial query to resolve
    await screen.findByTestId('address-history-heading');

    // Don't change anything, just save
    fireEvent.click(screen.getByText('Continue'));

    // ASSERT
    // Mutation should be called because data was pre-filled
    await waitFor(() => expect(mutationCalled).toBeTruthy());
    expect(onCompletedMock).toHaveBeenCalledTimes(1);
  });

  it('should not remove valid address entries when recieving data from the server in the wrong order', async () => {
    // ARRANGE
    let mutationCalled = false;
    const personUuid = '1337';

    const now = new Date();
    const lastYear = String(now.getFullYear() - 1);
    const currentMonth = String(now.getMonth() + 1);
    const asDateString = reverseDefaultFormatDate(
      historyToDateObject({
        month: currentMonth,
        year: lastYear,
      }),
    );

    const onCompletedMock = jest.fn();
    const mocks: MockedResponse[] = [
      {
        request: {
          query: GET_ADDRESS_CONTAINER_DATA,
          variables: {
            uuid: personUuid,
          } as QueryVariables,
        },
        result: {
          data: withSavedAddressesInWrongOrder(asDateString),
        },
      },
      {
        request: {
          query: SAVE_ADDRESS_HISTORY,
          variables: {
            input: {
              partyId: '911',
              addresses: [
                {
                  serviceId: 'GB|1337',
                  propertyStatus: 'Rented',
                  startedOn: asDateString,
                },
                {
                  serviceId: 'GB|002',
                  propertyStatus: 'Mortgage',
                  startedOn: '1990-01-01',
                },
              ],
            },
          } as MutationVariables,
        },
        result: () => {
          mutationCalled = true;
          return {
            data: {
              createUpdateAddress: [
                {
                  __typename: 'AddressType',
                  uuid: 'a1e79c5d-4e69-4098-aede-e55ac8394123',
                  city: '',
                  lineOne: '',
                  serviceId: 'GB|1337',
                  lineTwo: null,
                  postcode: '',
                  propertyStatus: 'Rented',
                  startedOn: asDateString,
                },
                {
                  __typename: 'AddressType',
                  uuid: '88924d6c-ddb5-4067-97c4-081dbed0318a',
                  city: '',
                  lineOne: '',
                  serviceId: 'GB|002',
                  lineTwo: null,
                  postcode: '',
                  propertyStatus: 'Motgage',
                  startedOn: '1990-01-01',
                },
              ],
            } as Mutation,
          };
        },
      },
    ];

    // ACT
    render(
      <MockedProvider addTypename={false} mocks={mocks}>
        <AddressFormContainer
          personUuid={personUuid}
          onCompleted={onCompletedMock}
        />
      </MockedProvider>,
    );

    // Wait for the initial query to resolve
    await screen.findByTestId('address-history-heading');

    // Don't change anything, just save
    fireEvent.click(screen.getByText('Continue'));

    // ASSERT
    // Mutation should be called because data was pre-filled
    await waitFor(() => expect(mutationCalled).toBeTruthy());
    expect(onCompletedMock).toHaveBeenCalledTimes(1);
  });
});
