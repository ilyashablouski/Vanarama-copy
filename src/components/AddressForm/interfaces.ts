import { IAddressSuggestion } from '@vanarama/uibook/lib/components/molecules/address-finder/interfaces';
import { AddressFormDropDownData } from '../../../generated/AddressFormDropDownData';

export type TAddressEntry = {
  address?: IAddressSuggestion;
  month: string;
  status: string;
  year: string;
};

export interface IAddressFormValues {
  history: TAddressEntry[];
}

export interface IAddressFormProps {
  dropDownData: AddressFormDropDownData;
  onSubmit: (values: IAddressFormValues) => Promise<void>;
}

export const EMPTY_ADDRESS_ENTRY: TAddressEntry = {
  address: undefined,
  month: '',
  status: '',
  year: '',
};
