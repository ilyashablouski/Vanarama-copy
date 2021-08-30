import { IncomeCalculatorExpenditure } from '../../../generated/IncomeCalculatorExpenditure';
import { IIncomeCalculatorFormValues } from './interfaces';
import { calculateMonthlyExpenses } from './utils';

// eslint-disable-next-line import/prefer-default-export
export const responseToInitialFormValues = (
  expenditure: IncomeCalculatorExpenditure | null,
): IIncomeCalculatorFormValues => {
  const monthlyExpenses = calculateMonthlyExpenses(expenditure);
  const netDisposableIncome =
    expenditure?.averageMonthlyIncome || 0 - monthlyExpenses;

  return {
    averageMonthlyIncome: expenditure?.averageMonthlyIncome.toString() || '',
    carFinance: expenditure?.carFinance?.toString() || '0',
    creditCardPayments: expenditure?.creditCardPayments?.toString() || '0',
    foodAndClothes: expenditure?.foodAndClothes?.toString() || '0',
    fuel: expenditure?.fuel?.toString() || '0',
    futureMonthlyIncome: expenditure?.futureMonthlyIncome?.toString() || '0',
    insurance: expenditure?.insurance?.toString() || '0',
    isFutureMonthlyIncome: Boolean(expenditure?.anticipateMonthlyIncomeChange),
    monthlyHouseholdIncome: expenditure?.householdIncome?.toString() || '0',
    mortgageOrRent: expenditure?.mortgageOrRent?.toString() || '0',
    otherCredit: expenditure?.otherCredit?.toString() || '0',
    phoneAndInternet: expenditure?.phoneAndInternet?.toString() || '0',
    studentLoan: expenditure?.studentLoan?.toString() || '0',
    utilities: expenditure?.utilities?.toString() || '0',
    suitabilityConsent: Boolean(expenditure?.suitabilityConsent),
    totalMonthlyExpenses: monthlyExpenses?.toString() || '0',
    netDisposableIncome: netDisposableIncome?.toString() || '0',
  };
};
