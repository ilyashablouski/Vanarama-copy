import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { NextPage } from 'next';
import { getDataFromTree } from '@apollo/react-ssr';
import { useRouter } from 'next/router';
import OlafContainer from '../../../components/olaf/olaf-container';
import withApollo from '../../../hocs/withApollo';
import IncomeCalculator from '../../../components/olaf/income-calculator';
import {
  CreateExpenseMutation,
  CreateExpenseMutationVariables,
} from '../../../../generated/CreateExpenseMutation';

export const EXPENSE_CREATE_MUTATION = gql`
  mutation CreateExpenseMutation($input: IncomeAndExpenseInputObject) {
    createUpdateIncomeAndExpense(input: $input) {
      id
      uuid
      averageMonthlyIncome
    }
  }
`;

const ExpensesPage: NextPage = () => {
  const router = useRouter();

  const [expenses] = useMutation<
    CreateExpenseMutation,
    CreateExpenseMutationVariables
  >(EXPENSE_CREATE_MUTATION, {
    onCompleted: data => {
      router.push(`/olaf/details/${data.createUpdateIncomeAndExpense.id}`);
    },
  });

  return (
    <OlafContainer activeStep={4}>
      <IncomeCalculator
        onSubmit={async values => {
          await expenses({
            variables: {
              input: {
                partyId: '1',
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
