export interface IDetails {
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
  allDropDowns: any;
  preloadData: any;
  submit: (details: IDetails) => void;
}
