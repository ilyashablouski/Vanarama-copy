import { IFiltersData } from '../../containers/GlobalSearchPageContainer/interfaces';
import { productFilter_productFilter as IProductFilter } from '../../../generated/productFilter';

export interface IInnerSelect {
  title: string;
  placeholder: string;
  key: keyof IFiltersData | string;
}

export interface IFiltersConfig {
  /** type of filter* */
  type: string;
  /** possibility to choose one more values* */
  multiselect: boolean;
  /** text for add new button* */
  addNewButtonLabel?: string;
  /** filter dropdown placeholder should have selected value text* */
  selectedLabel?: boolean;
  /** dropdown placeholder* */
  label: string;
  /** accessor key */
  key: string;
  /** function for convert text of labels on dropdown window* */
  renderValuesFunction?: (value: string | number) => string;
  /** function for convert text of labels on selected tag* */
  renderSelectedFunction?: (values: (string | number)[]) => string | string[];
  /** should be render on general filter block* */
  generalFilter: boolean;
  /** additional filters on dropdown */
  innerSelects?: IInnerSelect[];
  /** additional condition for render* */
  shouldRender?: (
    activeFilters: IFiltersData,
    filtersData: IProductFilter,
  ) => boolean;
}
