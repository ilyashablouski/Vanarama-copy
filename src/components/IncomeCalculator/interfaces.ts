import { IncomeCalculatorExpenditure } from '../../../generated/IncomeCalculatorExpenditure';

export interface IIncomeCalculatorFormValues {
  averageMonthlyIncome?: string;
  carFinance?: string;
  creditCardPayments?: string;
  foodAndClothes?: string;
  fuel?: string;
  futureMonthlyIncome?: string;
  insurance?: string;
  isFutureMonthlyIncome?: boolean;
  monthlyHouseholdIncome?: string;
  mortgageOrRent?: string;
  otherCredit?: string;
  phoneAndInternet?: string;
  studentLoans?: string;
  utilities?: string;
  suitabilityConsent?: boolean;
}

export interface IIncomeCalculatorProps {
  expenditure: IncomeCalculatorExpenditure | null;
  onSubmit: (values: IIncomeCalculatorFormValues) => Promise<any>;
  isSubmitting?: boolean;
}
