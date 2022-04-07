import { filterList_filterList as IFilterList } from '../../../generated/filterList';
import {
  IFilters,
  IFiltersContainerInjectedProps,
} from '../../containers/FiltersContainer/interfaces';
import { Nullable } from '../../types/common';
import { SearchPageTypes } from '../../containers/SearchPageContainer/interfaces';

export interface ISearchPageFiltersProps
  extends IFiltersContainerInjectedProps {
  isCarSearch: boolean;
  onSearch: (filters: IFilters) => void;
  preSearchVehicleCount: number;
  isSpecialOffers: boolean | null;
  setIsSpecialOffers: (value: boolean) => void;
  isPickups?: boolean;
  pageType?: SearchPageTypes;
  isDynamicFilterPage?: boolean;
  isPartnershipActive?: boolean;
  preLoadFilters?: Nullable<IFilterList>;
  isPreloadList: boolean;
  setSearchFilters: (filters: IFilters) => void;
  dataUiTestId?: string;
}
