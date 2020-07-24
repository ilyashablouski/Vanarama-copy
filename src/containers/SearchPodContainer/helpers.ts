import { filterList_filterList as IFilterList } from '../../../generated/filterList';
import { filterTypeAndBudget_filterList as IFilterTypeAndBudget } from '../../../generated/filterTypeAndBudget';

export const makeHandler = (data: IFilterList | IFilterTypeAndBudget): string[] =>
  data.groupedRanges?.map(range => range.parent) || [];

export const modelHandler = (data: IFilterList, make: string): string[] => {
  if (make && data.groupedRanges) {
    return data.groupedRanges.reduce((acc: string[], range) => {
      if (range.parent === make) acc.push(...range.children);
      return acc;
    }, []);
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
