import { IIncomeCalculatorFormValues } from './interfaces';
import { IncomeCalculatorExpenditure } from '../../../generated/IncomeCalculatorExpenditure';
import { sum } from '../../utils/array';

export const calculateMonthlyExpenses = (
  values?: IIncomeCalculatorFormValues | IncomeCalculatorExpenditure | null,
) =>
  sum(
    [
      values?.mortgageOrRent,
      values?.phoneAndInternet,
      values?.creditCardPayments,
      values?.insurance,
      values?.foodAndClothes,
      values?.studentLoan,
      values?.utilities,
      values?.carFinance,
      values?.fuel,
      values?.otherCredit,
    ],
    item => Number(item || ''),
  );

// eslint-disable-next-line import/prefer-default-export
export const calculateIncome = (values: IIncomeCalculatorFormValues) => {
  const monthlyExpenses = calculateMonthlyExpenses(values);

  const disposableIncome =
    Number(values.averageMonthlyIncome) - monthlyExpenses;

  return {
    monthlyExpenses,
    disposableIncome,
  };
};
