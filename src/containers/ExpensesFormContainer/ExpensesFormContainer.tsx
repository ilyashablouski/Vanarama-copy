import { useMutation, useQuery } from '@apollo/react-hooks';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import { gql, MutationUpdaterFn } from 'apollo-boost';
import React from 'react';
import {
  CreateExpenseMutation as Mutation,
  CreateExpenseMutationVariables as MutationVariables,
} from '../../../generated/CreateExpenseMutation';
import {
  GetExpensesPageDataQuery as Query,
  GetExpensesPageDataQueryVariables as QueryVariables,
} from '../../../generated/GetExpensesPageDataQuery';
import IncomeCalculator from '../../components/IncomeCalculator';
import { IProps } from './interfaces';

export const EXPENSE_CREATE_MUTATION = gql`
  mutation CreateExpenseMutation($input: IncomeAndExpenseInputObject) {
    createUpdateIncomeAndExpense(input: $input) {
      ...IncomeCalculatorExpenditure
    }
  }
  ${IncomeCalculator.fragments.expenditure}
`;

export const GET_EXPENSES_PAGE_DATA = gql`
  query GetExpensesPageDataQuery($uuid: ID!) {
    personByUuid(uuid: $uuid) {
      uuid
      partyId
      incomeAndExpense {
        ...IncomeCalculatorExpenditure
      }
    }
  }
  ${IncomeCalculator.fragments.expenditure}
`;

const ExpensesFormContainer: React.FC<IProps> = ({
  personUuid,
  onCompleted,
}) => {
  const { loading, error, data } = useQuery<Query, QueryVariables>(
    GET_EXPENSES_PAGE_DATA,
    {
      variables: {
        uuid: personUuid,
      },
    },
  );

  const [expenses] = useMutation<Mutation, MutationVariables>(
    EXPENSE_CREATE_MUTATION,
    {
      onCompleted,
      update: updateCache(personUuid),
    },
  );

  if (loading) {
    return <Loading size="large" />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!data || !data.personByUuid) {
    return null;
  }

  return (
    <IncomeCalculator
      expenditure={data.personByUuid.incomeAndExpense}
      onSubmit={async values => {
        await expenses({
          variables: {
            input: {
              partyId: data.personByUuid!.partyId,
              anticipateMonthlyIncomeChange: values.isFutureMonthlyIncome,
              averageMonthlyIncome: Number(values.averageMonthlyIncome),
              householdIncome: Number(values.monthlyHouseholdIncome),
              futureMonthlyIncome: Number(values.futureMonthlyIncome),
              mortgageOrRent: Number(values.mortgageOrRent),
              utilities: Number(values.utilities),
              insurance: Number(values.insurance),
              phoneAndInternet: Number(values.phoneAndInternet),
              creditCardPayments: Number(values.creditCardPayments),
              carFinance: Number(values.carFinance),
              foodAndClothes: Number(values.foodAndClothes),
              fuel: Number(values.fuel),
              studentLoan: Number(values.studentLoans),
              otherCredit: Number(values.otherCredit),
            },
          },
        });
      }}
    />
  );
};

function updateCache(uuid: string) {
  const updater: MutationUpdaterFn<Mutation> = (store, result) => {
    // Read the data from our cache for this query.
    const data = store.readQuery<Query, QueryVariables>({
      query: GET_EXPENSES_PAGE_DATA,
      variables: { uuid },
    });

    // Add the employment from the mutation to the end.
    if (data?.personByUuid?.incomeAndExpense) {
      data.personByUuid.incomeAndExpense =
        result.data?.createUpdateIncomeAndExpense || null;

      // Write our data back to the cache.
      store.writeQuery<Query, QueryVariables>({
        query: GET_EXPENSES_PAGE_DATA,
        variables: { uuid },
        data,
      });
    }
  };

  return updater;
}

export default ExpensesFormContainer;
