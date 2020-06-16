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
