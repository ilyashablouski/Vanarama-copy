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
  annualIncome: string | number;
  avgMonthlyIncome: string | number;
  monthlyMortgagePayments: string | number;
  monthlyStudentPayments: string | number;
  monthlyIncomeChange: boolean;
  futureMonthlyIncome: string | number;
  history: TAddressEntry[];
}

export interface ISoleTraderDetailsProps {
  addresses: SoleTraderDetailsFormAddresses[];
  soleTrader?: SoleTraderAssociates | null;
  dropdownData: SoleTraderDetailsDropDownData;
  onSubmit: (values: ISoleTraderDetailsFormValues) => Promise<void>;
  isEdited: boolean;
}
