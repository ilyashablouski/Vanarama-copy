import { IAddressPerson } from '../../containers/PersonalInformationContainer/interfaces';

export interface IPersonInformationFormValues {
  firstName: string;
  lastName: string;
  email?: string;
  mobile: string;
  address?: { id: string; label: string; uuid: string };
}

export interface IAdress {
  uuid: string;
  serviceId: string;
  lineOne: string;
  lineTwo: string;
  lineThree: string;
  city: string;
  kind: string;
  postcode: string;
  country: string;
}

export interface ITelephoneNumber {
  uuid: string;
  primary: boolean;
  value: string;
}

export interface IEmailAddress {
  uuid: string;
  primary: boolean;
  value: string;
}

export interface IPerson {
  uuid: string;
  firstName: string;
  lastName: string;
}

export interface IPropsPersonFormValues {
  uuid?: string;
  person: IPerson;
  emailAddresses: [IEmailAddress];
  telephoneNumbers: [ITelephoneNumber];
  addresses: [IAdress];
}

export interface IProps {
  person: IPropsPersonFormValues;
  submit: (
    values: IPersonInformationFormValues,
    address: IAddressPerson | undefined,
    addressId: string | undefined,
  ) => Promise<any>;
}
