import { IIncomeCalculatorFormValues } from './interfaces';

// eslint-disable-next-line import/prefer-default-export
export const calculateIncome = (values: IIncomeCalculatorFormValues) => {
  const monthlyExpenses =
    Number(values.mortgageOrRent) +
    Number(values.phoneAndInternet) +
    Number(values.creditCardPayments) +
    Number(values.insurance) +
    Number(values.foodAndClothes) +
    Number(values.studentLoans) +
    Number(values.utilities) +
    Number(values.carFinance) +
    Number(values.fuel) +
    Number(values.otherCredit);

  const disposableIncome =
    Number(values.averageMonthlyIncome) - monthlyExpenses;

  return {
    monthlyExpenses,
    disposableIncome,
  };
};
