import { MockedProvider, MockedResponse } from '@apollo/react-testing';
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import {
  GetExpensesPageDataQuery,
  GetExpensesPageDataQueryVariables,
} from '../../../generated/GetExpensesPageDataQuery';
import ExpensesFormContainer from './ExpensesFormContainer';
import { GET_EXPENSES_PAGE_DATA } from './gql';

describe('<ExpensesFormContainer />', () => {
  it('should prepopulate the form with existing data', async () => {
    // ARRANGE
    const personUuid = '1927e308-18f8-4d95-aef3-57cc46459930';
    const mocks: MockedResponse[] = [
      {
        request: {
          query: GET_EXPENSES_PAGE_DATA,
          variables: {
            uuid: personUuid,
          } as GetExpensesPageDataQueryVariables,
        },
        result: {
          data: {
            personByUuid: {
              uuid: personUuid,
              partyId: '1',
              incomeAndExpense: {
                __typename: 'IncomeAndExpenseType',
                uuid: '4663c46b-3543-4e0e-a4b8-6d3f69857246',
                anticipateMonthlyIncomeChange: true,
                averageMonthlyIncome: 6000,
                carFinance: 450,
                creditCardPayments: 120,
                foodAndClothes: 180,
                fuel: 90,
                futureMonthlyIncome: 7500,
                householdIncome: 8000,
                insurance: 15,
                mortgageOrRent: 1195,
                otherCredit: 0,
                phoneAndInternet: 49.99,
                studentLoan: 435,
                utilities: 99,
              },
            },
          } as GetExpensesPageDataQuery,
        },
      },
    ];

    // ACT
    render(
      <MockedProvider addTypename={false} mocks={mocks}>
        <ExpensesFormContainer
          personUuid={personUuid}
          onCompleted={jest.fn()}
        />
      </MockedProvider>,
    );

    // Wait for the initial query to resolve
    await waitFor(() => screen.findByTestId('expenses'));
    expect(
      (screen.getByLabelText(/Average Monthly Income/) as HTMLInputElement)
        .value,
    ).toEqual('6000');

    expect(
      (screen.getByLabelText(/Monthly Household Income/) as HTMLInputElement)
        .value,
    ).toEqual('8000');

    expect(
      (screen.getByLabelText(
        /Do You Anticipate Your Monthly Income Will Change/,
      ) as HTMLInputElement).checked,
    ).toEqual(true);

    expect(
      (screen.getByLabelText(/Future Monthly Income/) as HTMLInputElement)
        .value,
    ).toEqual('7500');

    expect(
      (screen.getByLabelText(/Mortgage or Rent/) as HTMLInputElement).value,
    ).toEqual('1195');

    expect(
      (screen.getByLabelText(/Phone and Internet/) as HTMLInputElement).value,
    ).toEqual('49.99');

    expect(
      (screen.getByLabelText(/Credit Card Payments/) as HTMLInputElement).value,
    ).toEqual('120');

    expect(
      (screen.getByLabelText(/Utilities/) as HTMLInputElement).value,
    ).toEqual('99');

    expect(
      (screen.getByLabelText(/Insurance/) as HTMLInputElement).value,
    ).toEqual('15');

    expect(
      (screen.getByLabelText(/Car Finance/) as HTMLInputElement).value,
    ).toEqual('450');

    expect(
      (screen.getByLabelText(/Food and Clothes/) as HTMLInputElement).value,
    ).toEqual('180');

    expect((screen.getByLabelText(/Fuel/) as HTMLInputElement).value).toEqual(
      '90',
    );

    expect(
      (screen.getByLabelText(/Student Loan/) as HTMLInputElement).value,
    ).toEqual('435');

    expect(
      (screen.getByLabelText(/Other Credit/) as HTMLInputElement).value,
    ).toEqual('0');

    expect(
      (screen.getByLabelText(/Total Monthly Expenses/) as HTMLInputElement)
        .value,
    ).toEqual('2633.99');

    expect(
      (screen.getByLabelText(/Net Disposable Income/) as HTMLInputElement)
        .value,
    ).toEqual('3366.01');
  });
});
