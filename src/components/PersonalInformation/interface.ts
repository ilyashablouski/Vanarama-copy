import { MyAccount_myAccountDetailsByPersonUuid as IPerson } from '../../../generated/MyAccount';

export interface IPersonInformationFormValues {
  firstName: string;
  lastName: string;
  emailAddress: string;
  telephoneNumber: string | null;
  address?: { id: string; label: string };
  emailConsent: boolean;
  smsConsent: boolean;
}

export interface IAdress {
  serviceId: string;
  lineOne: string;
  lineTwo: string;
  city: string;
  postcode: string;
}

export interface IProps {
  person: IPerson | null;
  submit: (
    values: IPersonInformationFormValues,
    serviceId: string | undefined,
  ) => Promise<any>;
}
