import { MockedProvider, MockedResponse } from '@apollo/react-testing';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import React from 'react';
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
          variables: { uuid: personUuid },
        },
        result: {
          data: {
            personByUuid: {
              uuid: personUuid,
              partyId: '911',
              __typename: 'PersonType',
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
          },
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
                  companyAddressServiceId: undefined,
                  companyName: undefined,
                  contract: undefined,
                  employedSinceDate: '1990-01-01',
                  employmentStatus: 'Retired',
                  grossAnnualIncome: undefined,
                  jobTitle: undefined,
                  workPhoneNumber: undefined,
                },
              ],
            },
          },
        },
        result: () => {
          mutationCalled = true;
          return {
            data: {
              createUpdateEmploymentHistory: [{ id: '1' }, { id: '2' }],
            },
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
