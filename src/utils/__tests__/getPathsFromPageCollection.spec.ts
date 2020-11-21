/* eslint-disable @typescript-eslint/camelcase */
import { PageCollection_pageCollection_items } from '../../../generated/PageCollection';
import { getPathsFromPageCollection } from '../pageSlugs';

const ITEMS = [
  {
    slug: 'insurance/faq',
    legacyUrl: '/van-insurance/faq.html',
  },
  {
    slug: 'insurance/tools-in-transit/thank-you',
    legacyUrl: '/van-insurance/tools-in-transit/thank-you.html',
  },
  {
    slug: 'insurance',
    legacyUrl: '/van-insurance.html',
  },
] as PageCollection_pageCollection_items[];

const PATHS = ['/insurance/faq', '/insurance/tools-in-transit/thank-you'];

describe('getPathsFromPageCollection', () => {
  describe('getPathsFromPageCollection ', () => {
    it('getPathsFromPageCollection should return correct paths', () => {
      const paths = getPathsFromPageCollection(ITEMS);

      expect(paths).toEqual(PATHS);
    });
  });

  describe('getPathsFromPageCollection ', () => {
    it('getPathsFromPageCollection should return empty array', () => {
      const paths = getPathsFromPageCollection([]);

      expect(paths).toEqual([]);
    });
  });
});
