import * as R from 'ramda';

export const getSectionsData = (
  sectionPath: string[],
  data: any,
): any | undefined => R.path(sectionPath, data);

export const getCardsName = (data: any): any | undefined =>
  R.path(['sections', 'cards', 'name'], data);
