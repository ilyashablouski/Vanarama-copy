import { ISortOrder } from '../../hooks/useSortOrder';
import { RateInputObject } from '../../../generated/globalTypes';
import { filterList_filterList as IFilterList } from '../../../generated/filterList';

export interface IFilterContainerProps {
  isPersonal: boolean;
  setType: (value: boolean) => void;
  isCarSearch: boolean;
  onSearch: (filters: IFilters) => void;
  preSearchVehicleCount: number;
  isSpecialOffers: boolean;
  setIsSpecialOffers: (value: boolean) => void;
  isMakePage?: boolean;
  isPickups?: boolean;
  isRangePage?: boolean;
  isModelPage?: boolean;
  isAllMakesPage?: boolean;
  isBodyPage?: boolean;
  isFuelPage?: boolean;
  isTransmissionPage?: boolean;
  isDynamicFilterPage?: boolean;
  sortOrder: ISortOrder;
  preLoadFilters?: IFilterList;
}

export interface IFilters {
  manufacturerName: string;
  rangeName: string;
  rate: RateInputObject;
  bodyStyles: string[];
  transmissions: string[];
  fuelTypes: string[];
}

export interface ISelectedFiltersState {
  [index: string]: string[];
}
