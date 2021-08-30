import {
  filterList_filterList as IFilterList,
  filterList_filterList_groupedRangesWithSlug_parent as IFiltersManufacturer,
  filterList_filterList_groupedRangesWithSlug_children as IFiltersChildren,
} from '../../../generated/filterList';
import { filterTypeAndBudget_filterList as IFilterTypeAndBudget } from '../../../generated/filterTypeAndBudget';

export const manufacturerHandler = (
  data: IFilterList | IFilterTypeAndBudget,
): IFiltersManufacturer[] =>
  data.groupedRangesWithSlug?.map(range => range.parent) || [];

export const modelHandler = (
  data: IFilterList | IFilterTypeAndBudget,
  manufacturer: string,
): IFiltersChildren[] => {
  if (manufacturer && data.groupedRangesWithSlug) {
    return data.groupedRangesWithSlug?.reduce(
      (acc: IFiltersChildren[], range) => {
        if (range.parent.slug === manufacturer) {
          acc.push(...range.children);
        }
        return acc;
      },
      [],
    );
  }
  return [];
};

export const budgetBetween = (range: string, price: number) => {
  const rangeArray = range
    .split('-')
    .map(value => parseFloat(value.replace('£', '')));
  return price >= rangeArray[0] && price <= rangeArray[1];
};

// build budget query
export const getBudgetForQuery = (range: string) => {
  if (range) {
    return range
      .split('£')
      .join('')
      .replace('-', '|');
  }
  return '';
};
