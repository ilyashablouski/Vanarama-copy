import { AboutFormDropdownData } from '../../../generated/AboutFormDropdownData';
import { AboutFormPerson } from '../../../generated/AboutFormPerson';

export interface IAboutFormValues {
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
  dayOfBirth: string;
  monthOfBirth: string;
  yearOfBirth: string;
  countryOfBirth: string;
  nationality: string;
  maritalStatus: string;
  dependants: string;
  adultsInHousehold: string;
  termsAndCons: boolean;
  consent?: boolean;
}

export interface IProps {
  dropdownData: AboutFormDropdownData;
  person?: AboutFormPerson | null;
  submit: (values: IAboutFormValues) => Promise<any>;
  onEmailExistenceCheck?: (value: string) => Promise<boolean>;
  onLogInClick?: () => void;
}
