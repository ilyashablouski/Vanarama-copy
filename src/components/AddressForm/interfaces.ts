import { IAddressSuggestion } from '@vanarama/uibook/lib/components/molecules/address-finder/interfaces';
import { AddressFormAddresses } from '../../../generated/AddressFormAddresses';
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
  addresses: AddressFormAddresses[];
  dropDownData: AddressFormDropDownData;
  onSubmit: (values: IAddressFormValues) => Promise<any>;
  requiredMonths: number;
}

export const EMPTY_ADDRESS_ENTRY: TAddressEntry = {
  address: undefined,
  month: '',
  status: '',
  year: '',
};
