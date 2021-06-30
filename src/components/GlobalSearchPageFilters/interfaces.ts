import { IFiltersData } from '../../containers/GlobalSearchPageContainer/interfaces';

export interface IInnerSelect {
  title: string;
  placeholder: string;
  key: keyof IFiltersData;
}
