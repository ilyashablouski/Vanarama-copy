export interface IIncomeCalculatorFormValues {
  partyId?: number;
  averageMonthlyIncome?: string;
  monthlyHouseholdIncome?: string;
  futureMonthlyIncome?: string;
  isFutureMonthlyIncome?: boolean;
  mortgageOrRent?: string;
  creditCardPayments?: string;
  insurance?: string;
  foodAndClothes?: string;
  studentLoans?: string;
  phoneAndInternet?: string;
  utilities?: string;
  carFinance?: string;
  fuel?: string;
  otherCredit?: string;
}

export interface IBaseProps {
  id?: string;
  className?: string;
}

export interface IIncomeCalculatorProps extends IBaseProps {
  data?: IIncomeCalculatorFormValues;
  onSubmit: (values: IIncomeCalculatorFormValues) => Promise<void>;
  isSubmitting?: boolean;
}
