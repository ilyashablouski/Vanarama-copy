import { IncomeCalculatorExpenditure } from '../../../generated/IncomeCalculatorExpenditure';
import { IIncomeCalculatorFormValues } from './interfaces';

// eslint-disable-next-line import/prefer-default-export
export const responseToInitialFormValues = (
  expenditure: IncomeCalculatorExpenditure | null,
): IIncomeCalculatorFormValues => {
  return {
    averageMonthlyIncome: expenditure?.averageMonthlyIncome.toString() || '',
    carFinance: expenditure?.carFinance?.toString() || '',
    creditCardPayments: expenditure?.creditCardPayments?.toString() || '',
    foodAndClothes: expenditure?.foodAndClothes?.toString() || '',
    fuel: expenditure?.fuel?.toString() || '',
    futureMonthlyIncome: expenditure?.futureMonthlyIncome?.toString() || '',
    insurance: expenditure?.insurance?.toString() || '',
    isFutureMonthlyIncome: Boolean(expenditure?.anticipateMonthlyIncomeChange),
    monthlyHouseholdIncome: expenditure?.householdIncome?.toString() || '',
    mortgageOrRent: expenditure?.mortgageOrRent?.toString() || '',
    otherCredit: expenditure?.otherCredit?.toString() || '',
    phoneAndInternet: expenditure?.phoneAndInternet?.toString() || '',
    studentLoans: expenditure?.studentLoan?.toString() || '',
    utilities: expenditure?.utilities?.toString() || '',
    suitabilityConsent: Boolean(expenditure?.suitabilityConsent),
  };
};
