export interface IPersonInformationFormValues {
  firstName: string;
  lastName: string;
  emailAddress: string;
  telephoneNumber: string;
  address?: { id: string; label: string;};
}

export interface IAdress {
  serviceId: string;
  lineOne: string;
  lineTwo: string;
  city: string;
  postcode: string;
}

export interface IPropsPersonFormValues {
  personUuid?: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  telephoneNumber: string;
  address: IAdress;
}

export interface IProps {
  person: IPropsPersonFormValues;
  submit: (
    values: IPersonInformationFormValues,
    serviceId: string | undefined,
  ) => Promise<any>;
}
