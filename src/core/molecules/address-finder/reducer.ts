import { IManualAddressFormValues } from 'core/molecules/address-finder/interfaces';
import { ILoqateSuggestion } from '../../../hooks/useLoqate/interfaces';
import { suggestionToDisplay } from './utils';
import { addressToDisplay } from '../../../utils/address';

export enum InputTypeEnum {
  MANUAL = 'MANUAL',
  LOOKUP = 'LOOKUP',
}

interface IState {
  focused: boolean;
  intermediate?: ILoqateSuggestion;
  preventBlur: boolean;
  formFocus: boolean;
  value: string;
  showManualForm: boolean;
  skipLookUp: boolean;
}

type TAction =
  | { type: 'SELECT_POSTCODE'; suggestion: ILoqateSuggestion }
  | { type: 'SELECT_ADDRESS'; suggestion: ILoqateSuggestion }
  | { type: 'SELECT_ADDRESS_MANUALLY'; manualAddress: IManualAddressFormValues }
  | { type: 'CHANGE_INPUT'; value: string }
  | { type: 'CLEAR_INTERMEDIATE' }
  | { type: 'FOCUS_INPUT' }
  | { type: 'FOCUS_FORM' }
  | { type: 'BLUR_FORM' }
  | { type: 'BLUR_INPUT' }
  | { type: 'ADD_MANUAL' }
  | { type: 'BACK_TO_SEARCH' };

export default function reducer(state: IState, action: TAction): IState {
  switch (action.type) {
    case 'SELECT_ADDRESS':
      return {
        ...state,
        intermediate: undefined,
        preventBlur: false,
        value: suggestionToDisplay(action.suggestion),
      };

    case 'SELECT_ADDRESS_MANUALLY':
      return {
        ...state,
        intermediate: undefined,
        preventBlur: false,
        showManualForm: false,
        skipLookUp: true,
        value: addressToDisplay({
          lineOne: action.manualAddress.addressLine1,
          lineTwo: action.manualAddress.addressLine2 || '',
          city: action.manualAddress.townOrCity,
          postcode: action.manualAddress.postcode,
        }),
      };

    case 'SELECT_POSTCODE':
      return { ...state, intermediate: action.suggestion, preventBlur: true };

    case 'CLEAR_INTERMEDIATE':
      return { ...state, intermediate: undefined };

    case 'BLUR_INPUT':
      return { ...state, focused: false };

    case 'FOCUS_INPUT':
      return { ...state, focused: true };

    case 'CHANGE_INPUT':
      return { ...state, value: action.value };

    case 'FOCUS_FORM':
      return { ...state, formFocus: true };

    case 'BLUR_FORM':
      return { ...state, formFocus: false };

    case 'ADD_MANUAL':
      return { ...state, showManualForm: true };

    case 'BACK_TO_SEARCH':
      return {
        ...state,
        value: '',
        focused: false,
        skipLookUp: false,
        showManualForm: false,
        intermediate: undefined,
      };

    default:
      return state;
  }
}
