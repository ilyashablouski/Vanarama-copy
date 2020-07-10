import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { GetAddressContainerDataQueryVariables as QueryVariables } from '../../../generated/GetAddressContainerDataQuery';
import {
  SaveAddressHistoryMutation as Mutation,
  SaveAddressHistoryMutationVariables as MutationVariables,
} from '../../../generated/SaveAddressHistoryMutation';
import { historyToMoment } from '../../utils/dates';
import AddressFormContainer from './AddressFormContainer';
import {
  noSavedAddresses,
  withSavedAddresses,
  withSavedAddressesInWrongOrder,
} from './fixtures';
import { GET_ADDRESS_CONTAINER_DATA, SAVE_ADDRESS_HISTORY } from './gql';

describe('<AddressFormContainer />', () => {
  it('should post data to the server correctly', async () => {
    // ARRANGE
    let mutationCalled = false;
    const personUuid = '6f6ed68c-0ccf-4799-b328-f9e0c7df5203';
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
              partyId: '1057',
              addresses: [
                {
                  serviceId: "GB|001",
                  propertyStatus: "Owned with mortgage",
                  startedOn: "1990-01-01",
                }
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
                  uuid: '2d56fa36-18e3-4f88-89df-9a2895f7e0dd',
                  city: 'Aberdeen',
                  lineOne: 'Marischal College',
                  serviceId: 'GB|001',
                  lineTwo: 'Broad Street',
                  postcode: 'AB10 1AF',
                  propertyStatus: 'Owned with mortgage',
                  startedOn: '1990-01-01',
                }
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
      target: { value: 'Owned with mortgage' },
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
    const personUuid = '6f6ed68c-0ccf-4799-b328-f9e0c7df5203';

    const now = new Date();
    const lastYear = String(now.getFullYear() - 1);
    const currentMonth = String(now.getMonth() + 1);
    const asDateString = historyToMoment({
      month: currentMonth,
      year: lastYear,
    }).format('YYYY-MM-DD');

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
              partyId: '1057',
              addresses: [
                {
                  serviceId: 'GB|002',
                  propertyStatus: 'Owned with mortgage',
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
                  serviceId: 'GB|002',
                  uuid: 'a829bc09-bfd9-4b60-98a9-b60f6622d9ad',
                  lineOne: 'Marischal College',
                  lineTwo: 'Broad Street',
                  city: 'Aberdeen',
                  postcode: 'AB10 1AG',
                  propertyStatus: 'Owned with mortgage',
                  startedOn: '1990-01-01',
                },
                {
                  __typename: 'AddressType',
                  serviceId: 'GB|1337',
                  uuid: 'dc3fc904-ed63-4b5d-b203-c5088c3a5047',
                  lineOne: '432 Union Street',
                  lineTwo: '',
                  city: 'Aberdeen',
                  postcode: 'AB10 1TR',
                  propertyStatus: 'Rented',
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
    fireEvent.click(screen.getByTestId('address-history-submit'));

    // ASSERT
    // Mutation should be called because data was pre-filled
    await waitFor(() => expect(mutationCalled).toBeTruthy());
    expect(onCompletedMock).toHaveBeenCalledTimes(1);
  });

  it('should not remove valid address entries when recieving data from the server in the wrong order', async () => {
    // ARRANGE
    let mutationCalled = false;
    const personUuid = 'ebdec701-6bc3-4f23-a636-cb4fbe419414';

    const now = new Date();
    const lastYear = String(now.getFullYear() - 1);
    const currentMonth = String(now.getMonth() + 1);
    const asDateString = historyToMoment({
      month: currentMonth,
      year: lastYear,
    }).format('YYYY-MM-DD');

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
              partyId: '1057',
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
