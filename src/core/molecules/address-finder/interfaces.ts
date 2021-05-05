import { IBaseProps } from '../../interfaces/base';

export interface IAddressSuggestion {
  id?: string;
  label?: string;
  addressLine1?: string;
  addressLine2?: string;
  townOrCity?: string;
  country?: string;
  postcode?: string;
}

export interface IAddressFinderProps extends IBaseProps {
  /**
   * The API key for Loqate
   */
  apiKey: string;
  /**
   * Called when the user selects an address suggestion
   */
  onSuggestionChange: (suggestion?: IAddressSuggestion) => void;
  /**
   * Sets the currently selected suggestion
   */
  selected?: IAddressSuggestion;
}

export interface IManualAddressFormValues {
  addressLine1: string;
  addressLine2?: string;
  townOrCity: string;
  country?: string;
  postcode: string;
}

export interface IManualAddressFormProps {
  defaultValues?: IManualAddressFormValues;
}
