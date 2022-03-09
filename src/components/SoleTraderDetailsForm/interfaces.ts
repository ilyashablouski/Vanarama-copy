import { SoleTraderDetailsDropDownData } from '../../../generated/SoleTraderDetailsDropDownData';
import {
  SoleTraderDetailsFormDataQuery_companyByUuid_associates as SoleTraderAssociates,
  SoleTraderDetailsFormDataQuery_personByUuid as SoleTraderPerson,
} from '../../../generated/SoleTraderDetailsFormDataQuery';
import { TAddressEntry } from '../AddressForm/interfaces';

export interface ISoleTraderDetailsFormValues {
  title: string;
  firstName: string;
  lastName: string;
  gender: string;
  dayOfBirth: string;
  monthOfBirth: string;
  yearOfBirth: string;
  placeOfBirth: string;
  maritalStatus: string;
  nationality: string;
  adultsInHousehold: string;
  dependants: string;
  occupation: string;
  annualIncome: number | null;
  avgMonthlyIncome: number | null;
  monthlyMortgagePayments: number | null;
  monthlyStudentPayments: number | null;
  monthlyIncomeChange?: boolean;
  futureMonthlyIncome?: number | null;
  history: TAddressEntry[];
  suitabilityConsent?: boolean;
}

export interface ISoleTraderDetailsProps {
  soleTrader?: SoleTraderAssociates | null;
  person?: SoleTraderPerson | null;
  dropdownData: SoleTraderDetailsDropDownData;
  onSubmit: (values: ISoleTraderDetailsFormValues) => Promise<void>;
  isEdited: boolean;
}
