import {
  GenericPageQuery,
  GenericPageQuery_genericPage_metaData as PageMetaData,
} from '../../../generated/GenericPageQuery';
import { manufacturerPage_manufacturerPage_sections as sections } from '../../../generated/manufacturerPage';
import { filterList_filterList as IFilterList } from '../../../generated/filterList';
import { vehicleList as IVehiclesData } from '../../../generated/vehicleList';
import { GetProductCard } from '../../../generated/GetProductCard';
import { rangeList } from '../../../generated/rangeList';
import { genericPagesQuery_genericPages as IGenericPage } from '../../../generated/genericPagesQuery';
import { manufacturerList } from '../../../generated/manufacturerList';
import { bodyStyleList_bodyStyleList as IModelsData } from '../../../generated/bodyStyleList';
import { SortObject } from '../../../generated/globalTypes';
import { Nullable } from '../../types/common';

export enum SearchPageTypes {
  SIMPLE_SEARCH_PAGE = 'SIMPLE_SEARCH_PAGE',
  SPECIAL_OFFER_PAGE = 'SPECIAL_OFFER_PAGE',
  MANUFACTURER_PAGE = 'MANUFACTURER_PAGE',
  ALL_MANUFACTURERS_PAGE = 'ALL_MANUFACTURERS_PAGE',
  BODY_STYLE_PAGE = 'BODY_STYLE_PAGE',
  RANGE_PAGE = 'RANGE_PAGE',
  MODEL_PAGE = 'MODEL_PAGE',
  FUEL_TYPE_PAGE = 'FUEL_TYPE_PAGE',
  TRANSMISSION_PAGE = 'TRANSMISSION_PAGE',
  BUDGET_PAGE = 'BUDGET_PAGE',
}

export interface ISearchPageContainerProps {
  isServer?: boolean;
  isCarSearch?: boolean;
  pageType?: SearchPageTypes;
  isPickups?: boolean;
  pageData?: GenericPageQuery;
  metaData: PageMetaData;
  topInfoSection?: sections | null;
  preLoadFiltersData?: Nullable<IFilterList>;
  preLoadVehiclesList?: Nullable<IVehiclesData>;
  preLoadProductCardsData?: Nullable<GetProductCard>;
  preLoadResponseCapIds?: Nullable<string[]>;
  preLoadTopOffersList?: Nullable<IVehiclesData>;
  preLoadTopOffersCardsData?: Nullable<GetProductCard>;
  preLoadRanges?: Nullable<rangeList>;
  rangesUrls?: IGenericPage['items'];
  manufacturersUrls?: IGenericPage['items'];
  preLoadManufacturers?: manufacturerList | null;
  preloadBodyStyleList?: Nullable<IModelsData[]>;
  preloadRange?: string;
  preloadManufacturer?: string;
  defaultSort?: Nullable<SortObject[]>;
  newRangePageSlug?: string;
  dataUiTestId?: string;
  isManufacturerFeatureFlagEnabled?: boolean;
}
