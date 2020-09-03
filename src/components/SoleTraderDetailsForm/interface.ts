export interface ISoleTraderDetailsFormValues {
  title: string;
  firstName: string;
  lastName: string;
  gender: string;
  dayOfBirth: string;
  monthOfBirth: string;
  yearOfBirth: string;
  placeOfBirth: string;
  nationality: string;
  email: string;
  adultsInHousehold: string;
  dependants: string;
  occupation: string;
  annualIncome: string;
  avgMonthlyIncome: string;
  monthlyMortgagePayments: string;
  monthlyStudentPayments: string;
  incomeChange: boolean;
  futureMonthlyIncome: string;
}

export interface ISoleTraderDetailsProps {
  onSubmit: (values: ISoleTraderDetailsFormValues) => Promise<void>;
  isEdited: boolean;
}
