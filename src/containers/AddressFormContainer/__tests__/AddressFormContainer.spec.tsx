import React from 'react';
import preloadAll from 'jest-next-dynamic';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { GetAddressContainerDataQueryVariables as QueryVariables } from '../../../../generated/GetAddressContainerDataQuery';
import {
  SaveAddressHistoryMutation as Mutation,
  SaveAddressHistoryMutationVariables as MutationVariables,
} from '../../../../generated/SaveAddressHistoryMutation';
import { parseDate } from '../../../utils/dates';
import AddressFormContainer from '../AddressFormContainer';
import {
  noSavedAddresses,
  withSavedAddresses,
  withSavedAddressesInWrongOrder,
} from '../fixtures';
import { GET_ADDRESS_CONTAINER_DATA, SAVE_ADDRESS_HISTORY } from '../gql';
import { makeAddressResponseMock } from '../../../hooks/useLoqate/utils';
import useLoqate from '../../../hooks/useLoqate';

jest.mock('../../../hooks/useLoqate');
(useLoqate as jest.Mock).mockReturnValue(makeAddressResponseMock());

function typeIntoAddressField(value: string) {
  const input = screen.getByTestId('history[0].address');
  fireEvent.focus(input);
  fireEvent.change(input, { target: { value } });
}

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
              partyId: '13670',
              addresses: [
                {
                  serviceId: 'GB|RM|A|54725860',
                  propertyStatus: 'Rented',
                  startedOn: '1963-10-01',
                  uuid: 'GB|RM|A|54725860',
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
                  serviceId: 'GB|RM|A|54725860',
                  lineOne: 'B001',
                  lineTwo: 'Purbeck House',
                  postcode: 'BH8 8ES',
                  city: 'Bournemouth',
                  propertyStatus: 'Rented',
                  startedOn: '1963-10-01',
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

    typeIntoAddressField('GB|001');
    fireEvent.mouseDown(screen.getByText(/^B001, Purbeck House 5-7/));

    fireEvent.change(screen.getByTestId('history[0].status'), {
      target: { value: 'Rented' },
    });

    fireEvent.change(screen.getByTestId('history[0].month'), {
      target: { value: '10' },
    });

    fireEvent.change(screen.getByTestId('history[0].year'), {
      target: { value: '1963' },
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
    const asDateString = parseDate('01', currentMonth, lastYear);

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
                  uuid: 'GB|1337',
                  id: undefined,
                  label: undefined,
                  serviceId: 'GB|1337',
                  propertyStatus: 'Rented',
                  startedOn: asDateString,
                },
                {
                  uuid: 'GB|002',
                  id: undefined,
                  label: undefined,
                  serviceId: 'GB|002',
                  propertyStatus: 'Mortgage',
                  startedOn: '1990-1-01',
                },
              ],
            },
          },
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
    const asDateString = parseDate('01', currentMonth, lastYear);

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
                  uuid: 'GB|1337',
                  id: undefined,
                  label: undefined,
                  serviceId: 'GB|1337',
                  propertyStatus: 'Rented',
                  startedOn: asDateString,
                },
                {
                  uuid: 'GB|002',
                  id: undefined,
                  label: undefined,
                  serviceId: 'GB|002',
                  propertyStatus: 'Mortgage',
                  startedOn: '1990-1-01',
                },
              ],
            },
          },
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
