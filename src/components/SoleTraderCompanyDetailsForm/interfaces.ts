import { IAddressSuggestion } from '@vanarama/uibook/lib/components/molecules/address-finder/interfaces';

export interface ISoleTraderCompanyDetailsFormValues {
  tradingName: string;
  tradingAddress?: IAddressSuggestion;
  nature: string;
  tradingSinceMonth: string;
  tradingSinceYear: string;
  businessTelephoneNumber: string;
  email: string;
  annualTurnover: string;
  annualCostOfSales: string;
  annualExpenses: string;
  existingFinanceReplacement: string;
  vehicleRegistrationNumber: string;
  monthlyAmountBeingReplaced: string;
}

export interface ISoleTraderCompanyDetailsFormProps {
  companyDetails?: any;
  onSubmit: (values: ISoleTraderCompanyDetailsFormValues) => void;
  natureOfBusiness: string[];
  setNatureOfBusiness: (values: string[]) => void;
}
