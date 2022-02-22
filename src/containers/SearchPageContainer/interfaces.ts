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

export interface ISearchPageContainerProps {
  isServer: boolean;
  isCarSearch?: boolean;
  isManufacturerPage?: boolean;
  isSimpleSearchPage?: boolean;
  isSpecialOfferPage?: boolean;
  isPickups?: boolean;
  isRangePage?: boolean;
  isModelPage?: boolean;
  isAllManufacturersPage?: boolean;
  isBodyStylePage?: boolean;
  isTransmissionPage?: boolean;
  isFuelPage?: boolean;
  isBudgetPage?: boolean;
  isEvPage?: boolean;
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
}
