export interface IDetails {
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  dayOfBirth: number;
  monthOfBirth: string;
  yearOfBirth: number;
  countryOfBirth: string;
  nationality: string;
  maritalStatus: string;
  dependants: string;
  adultsInHousehold: string;
  termsAndCons: boolean;
  consent: boolean;
}

export interface IState {
  details: IDetails;
}

export interface IProps {
  allDropDowns: Object;
  submit: (details: IDetails) => void;
  preloadData: Object;
}
