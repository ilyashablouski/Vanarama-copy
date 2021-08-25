import { IncomeCalculatorExpenditure } from '../../../generated/IncomeCalculatorExpenditure';
import { IOrderStorageData } from '../../hooks/useGetOrder';

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
  studentLoan?: string;
  utilities?: string;
  totalMonthlyExpenses?: string;
  netDisposableIncome?: string;
  suitabilityConsent?: boolean;
}

export interface IIncomeCalculatorProps {
  expenditure: IncomeCalculatorExpenditure | null;
  onSubmit: (values: IIncomeCalculatorFormValues) => Promise<any>;
  isSubmitting?: boolean;
  order: IOrderStorageData;
}

export interface IInitPayModalShowingValues {
  isOpen?: boolean;
  controlId?: string;
}
