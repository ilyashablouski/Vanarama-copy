import { AboutFormDropdownData } from '../../../../generated/AboutFormDropdownData';

export interface IAboutFormValues {
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  dayOfBirth: string;
  monthOfBirth: string;
  yearOfBirth: string;
  countryOfBirth: string;
  nationality: string;
  maritalStatus: string;
  dependants: string;
  adultsInHousehold: string;
  termsAndCons: boolean;
  consent: boolean;
}

export interface IProps {
  dropdownData: AboutFormDropdownData;
  submit: (values: IAboutFormValues) => void;
}
