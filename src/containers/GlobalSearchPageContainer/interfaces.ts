import { ICardTitleProps } from 'core/molecules/cards/CardTitle';
import { IServiceBanner } from 'core/molecules/service-banner/interfaces';
import {
  productFilter_productFilter as IProductFilter,
  productFilter_productFilter,
} from '../../../generated/productFilter';
import {
  GenericPageQuery,
  GenericPageQuery_genericPage_metaData as PageMetaData,
} from '../../../generated/GenericPageQuery';
import { GlobalSearchCardsData_productCard as ICardsData } from '../../../generated/GlobalSearchCardsData';
import { ProductDerivativeSort } from '../../../generated/globalTypes';
import { productDerivatives_productDerivatives as IProductDerivatives } from '../../../generated/productDerivatives';
import { Nullable } from '../../types/common';
import { GetProductCard_productCard as ICard } from '../../../generated/GetProductCard';

export enum ITabs {
  Filter,
  Sort,
}

export interface ISelectedTags {
  filterKey: keyof IFiltersData;
  tags: string[];
  order: number;
}

export interface IFiltersData
  extends Omit<productFilter_productFilter, 'enginePowerBhp'> {
  from: string[];
  to: string[];
  toEnginePower: number[];
  fromEnginePower: number[];
}

export interface IProps {
  pageData?: GenericPageQuery;
  filtersData?: Nullable<IProductFilter>;
  initialFilters: IFiltersData;
  metaData: PageMetaData;
  preLoadProductDerivatives?: Nullable<IProductDerivatives>;
  carsData?: Nullable<ICardsData[]>;
  vansData?: Nullable<ICardsData[]>;
  defaultSort?: ProductDerivativeSort[];
  isAllProductsRequest: boolean;
  serviceBanner?: IServiceBanner;
}

export interface IVehicleListForRender {
  data: ICard;
  derivativeId: string;
  title: ICardTitleProps;
  url: string;
  capBodyStyle: string;
}
