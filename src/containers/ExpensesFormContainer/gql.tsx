import { useMutation, useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import {
  CreateExpenseMutation as Mutation,
  CreateExpenseMutationVariables as MutationVariables,
} from '../../../generated/CreateExpenseMutation';
import {
  GetExpensesPageDataQuery as Query,
  GetExpensesPageDataQueryVariables as QueryVariables,
} from '../../../generated/GetExpensesPageDataQuery';
import IncomeCalculator from '../../components/IncomeCalculator';

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

export function useExpensesData(personUuid: string) {
  return useQuery<Query, QueryVariables>(GET_EXPENSES_PAGE_DATA, {
    variables: {
      uuid: personUuid,
    },
  });
}

export function useUpdateExpenses(
  personUuid: string,
  onCompleted: (data: Mutation) => void,
) {
  return useMutation<Mutation, MutationVariables>(EXPENSE_CREATE_MUTATION, {
    onCompleted,
    update: (store, result) => {
      // Read the data from our cache for this query.
      const data = store.readQuery<Query, QueryVariables>({
        query: GET_EXPENSES_PAGE_DATA,
        variables: { uuid: personUuid },
      });

      // Add the employment from the mutation to the end.
      if (data?.personByUuid) {
        data.personByUuid.incomeAndExpense =
          result.data?.createUpdateIncomeAndExpense || null;

        // Write our data back to the cache.
        store.writeQuery<Query, QueryVariables>({
          query: GET_EXPENSES_PAGE_DATA,
          variables: { uuid: personUuid },
          data,
        });
      }
    },
  });
}
