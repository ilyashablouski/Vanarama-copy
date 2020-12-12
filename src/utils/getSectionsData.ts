// @ts-ignore
import path from '@ramda/path';

export const getSectionsData = (
  sectionPath: string[],
  data: any,
): any | undefined => path(sectionPath, data);

export const getCardsName = (data: any): any | undefined =>
  path(['sections', 'cards', 'name'], data);
