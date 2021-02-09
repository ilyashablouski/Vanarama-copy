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
  termsAndConditions?: boolean;
  marketing?: boolean;
  companyType?: string;
  privacyPolicy?: boolean;
}

export interface IProps {
  dropdownData: AboutFormDropdownData;
  person?: AboutFormPerson | null;
  submit: (values: IAboutFormValues) => Promise<any>;
  emailValidator: (email: string) => Promise<string | undefined>;
  isEmailDisabled?: boolean;
  onLogInClick?: () => void;
  onRegistrationClick?: () => void;
}
