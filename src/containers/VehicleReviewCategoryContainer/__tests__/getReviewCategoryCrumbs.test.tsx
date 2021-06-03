import { getReviewCategoryCrumbs } from '../Utils';

describe('getReviewCategoryCrumbs', () => {
  it('should have correct actual label', () => {
    const input = {
      genericPage: {
        id: '1',
        intro: null,
        body: null,
        featuredImage: null,
        metaData: {
          title: null,
          name: 'Test Name',
          metaRobots: null,
          metaDescription: null,
          publishedOn: null,
          legacyUrl: null,
          pageType: null,
          canonicalUrl: null,
          slug: null,
          schema: null,
          breadcrumbs: null,
        },
        sections: null,
      },
    };

    const expected = [
      { label: 'Home', href: '/' },
      {
        label: 'Van Reviews',
        href: '/van-reviews',
      },
      {
        label: 'Test Name',
        href: '/',
      },
    ];

    const actual = getReviewCategoryCrumbs(input);
    expect(actual).toEqual(expected);
  });
});
