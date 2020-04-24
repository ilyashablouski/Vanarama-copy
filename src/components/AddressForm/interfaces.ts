import { ILoqateSuggestion } from '@vanarama/uibook/lib/hooks/useLoqate/interfaces';
import { AddressFormDropDownData } from '../../../generated/AddressFormDropDownData';

export type TAddressEntry = {
  address?: ILoqateSuggestion;
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
