import { MockedProvider, MockedResponse } from '@apollo/react-testing';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import React from 'react';
import {
  GetEmploymentContainerDataQuery as Query,
  GetEmploymentContainerDataQueryVariables as QueryVariables,
} from '../../../generated/GetEmploymentContainerDataQuery';
import {
  SaveEmploymentHistoryMutation as Mutation,
  SaveEmploymentHistoryMutationVariables as MutationVariables,
} from '../../../generated/SaveEmploymentHistoryMutation';
import EmploymentFormContainer, {
  GET_EMPLOYMENT_CONTAINER_DATA,
  SAVE_EMPLOYMENT_HISTORY,
} from './EmploymentFormContainer';

describe('<EmploymentFormContainer />', () => {
  it('should post data to the server correctly', async () => {
    // ARRANGE
    let mutationCalled = false;
    const personUuid = '1337';
    const onCompletedMock = jest.fn();
    const mocks: MockedResponse[] = [
      {
        request: {
          query: GET_EMPLOYMENT_CONTAINER_DATA,
          variables: {
            uuid: personUuid,
          } as QueryVariables,
        },
        result: {
          data: {
            personByUuid: {
              uuid: personUuid,
              partyId: '911',
              employmentHistories: [],
            },
            allDropDowns: {
              __typename: 'DropDownType',
              employmentStatuses: {
                __typename: 'DropDownDataType',
                data: [
                  'Employed',
                  'Self employed',
                  'Unemployed',
                  'Student',
                  'Retired',
                ],
                favourites: [],
              },
            },
          } as Query,
        },
      },
      {
        request: {
          query: SAVE_EMPLOYMENT_HISTORY,
          variables: {
            input: {
              partyId: '911',
              employmentHistories: [
                {
                  employedSinceDate: '1990-01-01',
                  employmentStatus: 'Retired',
                },
              ],
            },
          } as MutationVariables,
        },
        result: () => {
          mutationCalled = true;
          return {
            data: {
              createUpdateEmploymentHistory: [
                {
                  __typename: 'EmploymentHistoryType',
                  uuid: '4f3ff930-090f-400b-b7fa-f51d83e7eaa9',
                  companyAddressCity: null,
                  companyAddressLineOne: null,
                  companyAddressLineTwo: null,
                  companyAddressPostcode: null,
                  companyName: null,
                  contract: null,
                  employedSinceDate: '1990-01-01',
                  employmentStatus: 'Retired',
                  grossAnnualIncome: null,
                  jobTitle: null,
                  workPhoneNumber: null,
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
        <EmploymentFormContainer
          personUuid={personUuid}
          onCompleted={onCompletedMock}
        />
      </MockedProvider>,
    );

    // Wait for the initial query to resolve
    await waitFor(() => screen.findByTestId('employment-history-heading'));

    const status = screen.getByLabelText('Your Current Employment Status');
    fireEvent.change(status, { target: { value: 'Retired' } });

    const month = screen.getByTestId('history[0].month');
    fireEvent.change(month, { target: { value: '1' } });

    const year = screen.getByTestId('history[0].year');
    fireEvent.change(year, { target: { value: '1990' } });

    await act(async () => {
      fireEvent.click(screen.getByText('Continue'));
    });

    // ASSERT
    await waitFor(() => expect(mutationCalled).toBeTruthy());
    expect(onCompletedMock).toHaveBeenCalledTimes(1);
  });
});
