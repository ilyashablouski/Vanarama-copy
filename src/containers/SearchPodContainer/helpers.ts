import { filterList_filterList as IFilterList } from '../../../generated/filterList';

export const makeHandler = (data: IFilterList): string[] =>
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
