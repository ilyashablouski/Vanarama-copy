import { createContext, useContext } from 'react';
import { ILoqateSuggestion } from '../../../hooks/useLoqate/interfaces';
import { IAddressSuggestion } from './interfaces';

export interface IAddressFinderContext {
  data: ILoqateSuggestion[];
  inputFocused: boolean;
  formFocus?: boolean;
  intermediate?: ILoqateSuggestion;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClearIntermediate: () => void;
  onClearSuggestion: () => void;
  onSuggestionSelected: (suggestion: ILoqateSuggestion) => void;
  preventBlur: boolean;
  selectedSuggestion?: IAddressSuggestion;
  setInputBlur: () => void;
  setBlurForm?: () => void;
  setInputFocus: () => void;
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
