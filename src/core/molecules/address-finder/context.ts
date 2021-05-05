import { createContext, useContext } from 'react';
import { ILoqateSuggestion } from '../../../hooks/useLoqate/interfaces';
import { IAddressSuggestion, IManualAddressFormValues } from './interfaces';

export interface IAddressFinderContext {
  data: ILoqateSuggestion[];
  inputFocused: boolean;
  formFocus?: boolean;
  preventBlur: boolean;
  showManualForm: boolean;
  intermediate?: ILoqateSuggestion;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSuggestionSelected: (suggestion: ILoqateSuggestion) => void;
  selectedSuggestion?: IAddressSuggestion;
  onManualSubmit: (values: IManualAddressFormValues) => void;
  onClearIntermediate: () => void;
  onClearSuggestion: () => void;
  setInputBlur: () => void;
  setBlurForm?: () => void;
  setInputFocus: () => void;
  onManualAdding: () => void;
  onBackToSearch: () => void;
  value: string;
}

const AddressFinderContext = createContext<IAddressFinderContext | null>(null);

export const AddressFinderProvider = AddressFinderContext.Provider;

export function useAddressFinderContext() {
  const context = useContext(AddressFinderContext);
  if (!context) {
    throw new Error('Must be wrapped in a AddressFinderProvider');
  }

  return context;
}
