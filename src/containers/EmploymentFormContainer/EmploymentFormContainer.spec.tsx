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
    const personId = '1337';
    const onCompletedMock = jest.fn();
    const mocks: MockedResponse[] = [
      {
        request: {
          query: GET_EMPLOYMENT_CONTAINER_DATA,
          variables: { id: personId },
        },
        result: {
          data: {
            personById: {
              id: personId,
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
                  employedSinceDate: '1990-01-01',
                  employmentStatus: 'Retired',
                  grossAnnualIncome: null,
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
          personId={personId}
          onCompleted={onCompletedMock}
        />
      </MockedProvider>,
    );

    // Wait for the initial query to resolve
    await waitFor(() => screen.findByTestId('employment-history-heading'));

    const status = screen.getByLabelText('Your Current Employment Status');
    fireEvent.input(status, { target: { value: 'Retired' } });

    const month = screen.getByTestId('history[0].month');
    fireEvent.input(month, { target: { value: '1' } });

    const year = screen.getByTestId('history[0].year');
    fireEvent.input(year, { target: { value: '1990' } });

    await act(async () => {
      fireEvent.click(screen.getByText('Continue'));
    });

    // ASSERT
    await waitFor(() => expect(mutationCalled).toBeTruthy());
    expect(onCompletedMock).toHaveBeenCalledTimes(1);
  });
});
