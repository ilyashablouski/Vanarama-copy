import { IAddressSuggestion } from 'core/molecules/address-finder/interfaces';

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
  existingVehicle: boolean;
}

export interface ISoleTraderCompanyDetailsFormProps {
  companyDetails?: any;
  onSubmit: (values: ISoleTraderCompanyDetailsFormValues) => void;
  natureOfBusiness: string[];
  setNatureOfBusiness: (values: string[]) => void;
}
