import { SoleTraderDetailsDropDownData } from '../../../generated/SoleTraderDetailsDropDownData';
import { SoleTraderPerson_associates as SoleTraderAssociates } from '../../../generated/SoleTraderPerson';
import { SoleTraderDetailsFormAddresses } from '../../../generated/SoleTraderDetailsFormAddresses';
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
  monthlyIncomeChange: boolean;
  futureMonthlyIncome: number | null;
  history: TAddressEntry[];
}

export interface ISoleTraderDetailsProps {
  addresses: SoleTraderDetailsFormAddresses[];
  soleTrader?: SoleTraderAssociates | null;
  dropdownData: SoleTraderDetailsDropDownData;
  onSubmit: (values: ISoleTraderDetailsFormValues) => Promise<void>;
  isEdited: boolean;
}
