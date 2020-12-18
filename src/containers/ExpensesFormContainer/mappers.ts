import { IncomeAndExpenseInputObject } from '../../../generated/globalTypes';
import { IIncomeCalculatorFormValues } from '../../components/IncomeCalculator/interfaces';

// eslint-disable-next-line import/prefer-default-export
export const formValuesToInput = (
  partyId: string,
  values: IIncomeCalculatorFormValues,
): IncomeAndExpenseInputObject => ({
  partyId,
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
  suitabilityConsent: !!values.suitabilityConsent,
});
