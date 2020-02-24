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
  
  export interface IState {
    details: IDetails;
    allDropDowns: any;
  }

  export interface IProps {
    captchaFormData: (pageRef: string, data: {}) => void;
  }