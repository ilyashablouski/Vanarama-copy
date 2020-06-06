export interface IPersonInformationFormValues {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  address: string;
}

export interface IProps {
  person?: any | null;
  submit: (values: IPersonInformationFormValues) => Promise<any>;
}
