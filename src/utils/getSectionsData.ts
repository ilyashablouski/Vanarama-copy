import * as R from 'ramda';

export const getSectionsData = (
  sectionPath: string[],
  data: any,
): any | undefined => R.path(sectionPath, data);

export default getSectionsData;
