import { AddressFormDropDownData } from '../../../generated/AddressFormDropDownData';

export type TAddressEntry = {
  address: string;
  status: string;
  month: string;
  year: string;
};

export interface IAddressFormValues {
  history: TAddressEntry[];
}

export interface IAddressFormProps {
  dropDownData: AddressFormDropDownData;
  onSubmit: (values: IAddressFormValues) => Promise<void>;
}
