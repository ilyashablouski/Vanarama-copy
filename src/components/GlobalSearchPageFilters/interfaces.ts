import { IFiltersData } from '../../containers/GlobalSearchPageContainer/interfaces';

export interface IInnerSelect {
  title: string;
  placeholder: string;
  key: keyof IFiltersData | string;
}

export interface IFiltersConfig {
  type: string;
  multiselect: boolean;
  label: string;
  key: string;
  renderValuesFunction?: (value: string) => string;
  renderSelectedFunction?: (values: (string | null)[]) => string;
  innerSelects?: IInnerSelect[];
}
