import { SearchCompaniesQuery_searchCompanies_nodes as SearchResult } from '../../../generated/SearchCompaniesQuery';
import { InputMode } from './interfaces';

interface IState {
  companySearchTerm: string;
  confirmedCompany?: SearchResult;
  inputMode: InputMode;
  tentativeCompany?: SearchResult;
}
type TAction =
  | { type: 'PROCEED'; company: SearchResult }
  | { type: 'SEARCH_AGAIN' }
  | { type: 'SET_MANUAL_MODE' }
  | { type: 'SET_SEARCH_MODE' }
  | { type: 'CLEAR_COMPANY' }
  | { type: 'TYPE_COMPANY_NAME'; value: string }
  | { type: 'COMPANY_SELECTED'; company: SearchResult };

export default function reducer(state: IState, action: TAction): IState {
  switch (action.type) {
    case 'PROCEED':
      return { ...state, confirmedCompany: action.company };
    case 'SET_MANUAL_MODE':
      return { ...state, inputMode: 'manual' };
    case 'SET_SEARCH_MODE':
      return { ...state, inputMode: 'search' };
    case 'CLEAR_COMPANY':
      return {
        ...state,
        companySearchTerm: '',
        confirmedCompany: undefined,
        tentativeCompany: undefined,
      };
    case 'TYPE_COMPANY_NAME':
      return { ...state, companySearchTerm: action.value };
    case 'COMPANY_SELECTED':
      return { ...state, tentativeCompany: action.company };
    case 'SEARCH_AGAIN':
      return {
        ...state,
        companySearchTerm: '',
        confirmedCompany: undefined,
        tentativeCompany: undefined,
      };
    default:
      throw new Error('Unknown action type');
  }
}
