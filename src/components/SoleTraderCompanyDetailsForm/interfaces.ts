import { IAddressSuggestion } from '@vanarama/uibook/lib/components/molecules/address-finder/interfaces';

export interface ISoleTraderCompanyDetailsFormValues {
  tradingName: string;
  tradingAddress: IAddressSuggestion;
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
  onSubmit: (values: ISoleTraderCompanyDetailsFormValues) => void;
}
