import { filterList_filterList as IFilterList } from '../../../generated/filterList';
import {
  IFilters,
  IFiltersContainerInjectedProps,
} from '../../containers/FiltersContainer/interfaces';

export interface ISearchPageFiltersProps
  extends IFiltersContainerInjectedProps {
  isCarSearch: boolean;
  onSearch: (filters: IFilters) => void;
  preSearchVehicleCount: number;
  isSpecialOffers: boolean | null;
  setIsSpecialOffers: (value: boolean) => void;
  isManufacturerPage?: boolean;
  isPickups?: boolean;
  isRangePage?: boolean;
  isModelPage?: boolean;
  isAllManufacturersPage?: boolean;
  isBodyPage?: boolean;
  isBudgetPage?: boolean;
  isFuelPage?: boolean;
  isTransmissionPage?: boolean;
  isDynamicFilterPage?: boolean;
  isPartnershipActive?: boolean;
  preLoadFilters?: IFilterList;
  isPreloadList: boolean;
  setSearchFilters: (filters: IFilters) => void;
}
