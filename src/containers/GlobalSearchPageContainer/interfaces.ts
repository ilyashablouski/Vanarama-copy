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

export enum ITabs {
  Filter,
  Sort,
}

export interface ISelectedTags {
  filterKey: string;
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
  filtersData?: IProductFilter;
  initialFilters: IFiltersData;
  metaData: PageMetaData;
  preLoadProductDerivatives: IProductDerivatives;
  carsData?: ICardsData[];
  vansData?: ICardsData[];
  defaultSort?: ProductDerivativeSort[];
  isAllProductsRequest: boolean;
}
