export interface ISoleTraderCompanyDetailsFormValues {
  tradingName: string;
  tradingAddress: string;
  natureofBusiness: string;
  tradingSinceMonth: string;
  tradingSinceYear: string;
  businessTelephoneNumber: string;
  email: string;
  annualTurnover: string;
  annualCostOfSales: string;
  annualExpenses: string;
  vehicleRegistrationNumber: string;
  monthlyAmountBeingReplaced: string;
}

export interface ISoleTraderCompanyDetailsFormProps {
  onSubmit: (values: ISoleTraderCompanyDetailsFormValues) => Promise<any>;
}
