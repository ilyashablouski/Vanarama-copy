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
  dependants: number;
  adultsInHousehold: number;
  termsAndCons: boolean;
  consent: boolean;
}

export interface IState {
  details: IDetails;
}

export interface IProps {
  captchaOlafData: (pageRef: string, data: {}) => void;
  allDropDowns: any;
  details: Object;
}
