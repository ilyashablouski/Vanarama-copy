import { ISortOrder } from '../../hooks/useSortOrder';
import { RateInputObject } from '../../../generated/globalTypes';
import { filterList_filterList as IFilterList } from '../../../generated/filterList';

export interface IFilterContainerProps {
  isPersonal: boolean;
  setType: (value: boolean) => void;
  isCarSearch: boolean;
  onSearch: (filters: IFilters) => void;
  preSearchVehicleCount: number;
  isSpecialOffers: boolean | null;
  setIsSpecialOffers: (value: boolean) => void;
  isMakePage?: boolean;
  isPickups?: boolean;
  isRangePage?: boolean;
  isModelPage?: boolean;
  isAllMakesPage?: boolean;
  isBodyPage?: boolean;
  isBudgetPage?: boolean;
  isFuelPage?: boolean;
  isTransmissionPage?: boolean;
  isDynamicFilterPage?: boolean;
  sortOrder: ISortOrder;
  preLoadFilters?: IFilterList;
  isPreloadList: boolean;
  setSearchFilters: (filters: IFilters) => void;
}

export interface IFilters {
  manufacturerSlug: string;
  rangeSlug: string;
  rate: RateInputObject;
  bodyStyles: string[];
  transmissions: string[];
  fuelTypes: string[];
}

export interface ISelectedFiltersState {
  [index: string]: string[];
}
