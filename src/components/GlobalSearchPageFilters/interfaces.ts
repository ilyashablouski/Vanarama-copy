import { IFiltersData } from '../../containers/GlobalSearchPageContainer/interfaces';

export interface IInnerSelect {
  title: string;
  placeholder: string;
  key: keyof IFiltersData | string;
}

export interface IFiltersConfig {
  type: string;
  multiselect: boolean;
  selectedLabel?: boolean;
  label: string;
  key: string;
  renderValuesFunction?: (value: string | number) => string;
  renderSelectedFunction?: (values: (string | number)[]) => string | string[];
  generalFilter: boolean;
  innerSelects?: IInnerSelect[];
  includedVehicleType?: string[];
}
