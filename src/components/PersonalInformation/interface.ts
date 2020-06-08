import { IAddressPerson } from '../../containers/PersonalInformationContainer/interfaces';

export interface IPersonInformationFormValues {
  firstName: string;
  lastName: string;
  email?: string;
  mobile: string;
  address?: { id: string; label: string; uuid: string };
}

export interface IPropsPersonFormValues {
  uuid?: string;
  person: {
    uuid: string;
    firstName: string;
    lastName: string;
  };
  emailAddresses: [
    {
      uuid: string;
      primary: boolean;
      value: string;
    },
  ];
  telephoneNumbers: [
    {
      uuid: string;
      primary: boolean;
      value: string;
    },
  ];
  addresses: [
    {
      uuid: string;
      serviceId: string;
      lineOne: string;
      lineTwo: string;
      lineThree: string;
      city: string;
      kind: string;
      postcode: string;
      country: string;
    },
  ];
}

export interface IProps {
  person: IPropsPersonFormValues;
  submit: (
    values: IPersonInformationFormValues,
    address: IAddressPerson | undefined,
    addressId: string | undefined,
  ) => Promise<any>;
}
