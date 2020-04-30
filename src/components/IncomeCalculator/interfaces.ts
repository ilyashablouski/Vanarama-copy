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
}

export interface IIncomeCalculatorProps {
  onSubmit: (values: IIncomeCalculatorFormValues) => Promise<void>;
  isSubmitting?: boolean;
}
