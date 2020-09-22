import { SoleTraderDetailsDropDownData } from '../../../generated/SoleTraderDetailsDropDownData';
import {
  SoleTraderDetailsFormDataQuery_companyByUuid_associates as SoleTraderAssociates,
  SoleTraderDetailsFormDataQuery_personByUuid as SoleTraderPerson,
} from '../../../generated/SoleTraderDetailsFormDataQuery';
import { SoleTraderDetailsAddresses } from '../../../generated/SoleTraderDetailsAddresses';
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
  email: string;
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
}

export interface ISoleTraderDetailsProps {
  addresses: SoleTraderDetailsAddresses[];
  soleTrader?: SoleTraderAssociates | null;
  person?: SoleTraderPerson | null;
  dropdownData: SoleTraderDetailsDropDownData;
  onSubmit: (values: ISoleTraderDetailsFormValues) => Promise<void>;
  isEdited: boolean;
}
