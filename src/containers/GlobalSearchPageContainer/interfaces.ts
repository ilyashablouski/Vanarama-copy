import { productFilter_productFilter } from '../../../generated/productFilter';

export enum ITabs {
  Filter,
  Sort,
}

export interface ISelectedTags {
  filterKey: string;
  tags: string[];
  order: number;
}

export interface IFiltersData extends productFilter_productFilter {
  from: string[];
  to: string[];
}
