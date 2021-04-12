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
  {
    slug: 'car-leasing/fca',
    legacyUrl: 'car-leasing/fca.html',
  },
] as PageCollection_pageCollection_items[];

const PATHS = ['/insurance/faq', '/insurance/tools-in-transit/thank-you'];

describe('getPathsFromPageCollection', () => {
  it('getPathsFromPageCollection should return correct paths', () => {
    const paths = getPathsFromPageCollection(ITEMS, 'insurance');

    expect(paths).toEqual(PATHS);
  });

  it('getPathsFromPageCollection should return empty array', () => {
    const paths = getPathsFromPageCollection([], 'insurance');

    expect(paths).toEqual([]);
  });
  it('getPathsFromPageCollection should filter excluded slugs', () => {
    const paths = getPathsFromPageCollection(ITEMS, 'insurance', [
      '/tools-in-transit',
    ]);

    expect(paths).toEqual(['/insurance/faq']);
  });
});
