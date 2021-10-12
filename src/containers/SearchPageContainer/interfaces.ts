import {
  GenericPageQuery,
  GenericPageQuery_genericPage_metaData as PageMetaData,
} from '../../../generated/GenericPageQuery';
import { manufacturerPage_manufacturerPage_sections as sections } from '../../../generated/manufacturerPage';
import { filterList_filterList as IFilterList } from '../../../generated/filterList';
import { vehicleList as IVehiclesData } from '../../../generated/vehicleList';
import { GetProductCard } from '../../../generated/GetProductCard';
import { rangeList } from '../../../generated/rangeList';
import { genericPagesQuery_genericPages_items as ILegacyUrls } from '../../../generated/genericPagesQuery';
import { manufacturerList } from '../../../generated/manufacturerList';
import { bodyStyleList_bodyStyleList as IModelsData } from '../../../generated/bodyStyleList';
import { SortObject } from '../../../generated/globalTypes';

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
  preLoadFiltersData?: IFilterList | undefined;
  preLoadVehiclesList?: IVehiclesData;
  preLoadProductCardsData?: GetProductCard;
  preLoadResponseCapIds?: string[];
  preLoadTopOffersList?: IVehiclesData;
  preLoadTopOffersCardsData?: GetProductCard;
  preLoadRanges?: rangeList;
  rangesUrls?: ILegacyUrls[];
  manufacturersUrls?: ILegacyUrls[];
  preLoadManufacturers?: manufacturerList | null;
  preloadBodyStyleList?: IModelsData[];
  preloadRange?: string;
  preloadManufacturer?: string;
  defaultSort?: SortObject[];
  newRangePageSlug?: string;
}
