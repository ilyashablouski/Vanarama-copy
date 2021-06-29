import { IFiltersData } from '../../containers/GlobalSearchPageContainer/interfaces';
import { IInnerSelect } from './config';

// eslint-disable-next-line import/prefer-default-export
export const getInnerConfigKeys = (innerSelects: IInnerSelect[]) =>
  innerSelects.map(select => select.key as keyof IFiltersData);
