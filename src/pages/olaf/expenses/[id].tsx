import { gql } from 'apollo-boost';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { getDataFromTree } from '@apollo/react-ssr';
import { useMutation, useQuery } from '@apollo/react-hooks';
import OlafContainer from '../../../components/olaf/olaf-container';
import withApollo from '../../../hocs/withApollo';
import IncomeCalculator from '../../../components/olaf/income-calculator';
import {
  CreateExpenseMutation as Mutation,
  CreateExpenseMutationVariables as MutationVariables,
} from '../../../../generated/CreateExpenseMutation';
import {
  GetExpensesPageDataQuery as Query,
  GetExpensesPageDataQueryVariables as QueryVariables,
} from '../../../../generated/GetExpensesPageDataQuery';

export const EXPENSE_CREATE_MUTATION = gql`
  mutation CreateExpenseMutation($input: IncomeAndExpenseInputObject) {
    createUpdateIncomeAndExpense(input: $input) {
      uuid
      averageMonthlyIncome
    }
  }
`;

export const GET_EXPENSES_PAGE_DATA = gql`
  query GetExpensesPageDataQuery($uuid: ID!) {
    personByUuid(uuid: $uuid) {
      uuid
      partyId
    }
  }
`;

const ExpensesPage: NextPage = () => {
  const router = useRouter();
  const personUuid = router.query.id as string;
  const { loading, error, data } = useQuery<Query, QueryVariables>(
    GET_EXPENSES_PAGE_DATA,
    { variables: { uuid: personUuid } },
  );

  const [expenses] = useMutation<Mutation, MutationVariables>(
    EXPENSE_CREATE_MUTATION,
    {
      onCompleted: () => {
        const url = '/olaf/bank-details';
        router.push(`${url}/[id]`, `${url}/${personUuid}`);
      },
    },
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!data || !data.personByUuid) {
    return null;
  }

  return (
    <OlafContainer activeStep={4}>
      <IncomeCalculator
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
    </OlafContainer>
  );
};

export default withApollo(ExpensesPage, { getDataFromTree });
