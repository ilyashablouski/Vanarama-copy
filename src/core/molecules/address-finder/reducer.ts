import { ILoqateSuggestion } from '../../../hooks/useLoqate/interfaces';
import { suggestionToDisplay } from './utils';

interface IState {
  focused: boolean;
  intermediate?: ILoqateSuggestion;
  preventBlur: boolean;
  formFocus: boolean;
  value: string;
}

type TAction =
  | { type: 'SELECT_POSTCODE'; suggestion: ILoqateSuggestion }
  | { type: 'SELECT_ADDRESS'; suggestion: ILoqateSuggestion }
  | { type: 'CHANGE_INPUT'; value: string }
  | { type: 'CLEAR_INTERMEDIATE' }
  | { type: 'FOCUS_INPUT' }
  | { type: 'FOCUS_FORM' }
  | { type: 'BLUR_FORM' }
  | { type: 'BLUR_INPUT' };

export default function reducer(state: IState, action: TAction): IState {
  switch (action.type) {
    case 'SELECT_ADDRESS':
      return {
        ...state,
        intermediate: undefined,
        preventBlur: false,
        value: suggestionToDisplay(action.suggestion),
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

    default:
      return state;
  }
}
