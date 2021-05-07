import { IManualAddressFormValues } from 'core/molecules/address-finder/interfaces';
import { ILoqateSuggestion } from '../../../hooks/useLoqate/interfaces';
import { suggestionToDisplay } from './utils';

export enum InputTypeEnum {
  MANUAL = 'MANUAL',
  LOOKUP = 'LOOKUP',
}

export interface IAddressValue {
  label?: string;
  lineOne?: string;
  lineTwo?: string;
  city?: string;
  country?: string;
  postcode?: string;
}

interface IState {
  focused: boolean;
  intermediate?: ILoqateSuggestion;
  preventBlur: boolean;
  formFocus: boolean;
  value: IAddressValue;
  showManualForm: boolean;
  inputType: InputTypeEnum;
}

export const initValue: IAddressValue = {
  label: '',
};

export const initialState = {
  value: initValue,
  focused: false,
  formFocus: false,
  preventBlur: false,
  showManualForm: false,
  inputType: InputTypeEnum.LOOKUP,
};

type TAction =
  | { type: 'SELECT_POSTCODE'; suggestion: ILoqateSuggestion }
  | { type: 'SELECT_ADDRESS'; suggestion: ILoqateSuggestion }
  | {
      type: 'SELECT_ADDRESS_MANUALLY';
      manualAddress: IManualAddressFormValues & { label: string };
    }
  | { type: 'CHANGE_INPUT'; value: string }
  | { type: 'CLEAR_VALUE' }
  | { type: 'CLEAR_INTERMEDIATE' }
  | { type: 'FOCUS_INPUT' }
  | { type: 'FOCUS_FORM' }
  | { type: 'BLUR_FORM' }
  | { type: 'BLUR_INPUT' }
  | { type: 'SHOW_MANUAL_ADDING_FORM' }
  | { type: 'CLOSE_MANUAL_ADDING_FORM' }
  | { type: 'BACK_TO_SEARCH' };

export default function reducer(state: IState, action: TAction): IState {
  switch (action.type) {
    case 'SELECT_ADDRESS':
      return {
        ...state,
        intermediate: undefined,
        preventBlur: false,
        value: {
          label: suggestionToDisplay(action.suggestion),
        },
      };

    case 'SELECT_ADDRESS_MANUALLY':
      return {
        ...state,
        intermediate: undefined,
        preventBlur: false,
        showManualForm: false,
        value: action.manualAddress,
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
      return { ...state, value: { label: action.value } };

    case 'CLEAR_VALUE':
      return { ...state, value: { label: '' } };

    case 'FOCUS_FORM':
      return { ...state, formFocus: true };

    case 'BLUR_FORM':
      return { ...state, formFocus: false };

    case 'SHOW_MANUAL_ADDING_FORM':
      return {
        ...state,
        showManualForm: true,
        inputType: InputTypeEnum.MANUAL,
      };

    case 'CLOSE_MANUAL_ADDING_FORM':
      return {
        ...state,
        showManualForm: false,
      };

    case 'BACK_TO_SEARCH':
      return {
        ...state,
        value: {
          label: '',
        },
        focused: false,
        showManualForm: false,
        intermediate: undefined,
        inputType: InputTypeEnum.LOOKUP,
      };

    default:
      return state;
  }
}
