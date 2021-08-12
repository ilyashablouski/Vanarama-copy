import Cookies from 'js-cookie';
import {
  convertSlugToBreadcrumbsSchema,
  getBlogBreadCrumbsFromSlug,
  getBreadCrumbsItems,
} from '../breadcrumbs';

describe('getBreadCrumbsItems', () => {
  // Delete then feature flag will remove
  beforeEach(() => {
    Cookies.set('DIG-6993', '1');
  });

  it('getBreadCrumbsItems should return correct result', () => {
    const metaData = {
      breadcrumbs: null,
      canonicalUrl:
        'https://www.vanarama.com/latest-news/mitsubishi-outlander-commercial-review.html',
      legacyUrl: 'latest-news/mitsubishi-outlander-commercial-review.html',
      metaDescription:
        'Vanarama Van Expert Tom Roberts reviews a Mitsubishi Outlander Commercial',
      metaRobots: null,
      name: 'Mitsubishi Outlander Commercial',
      pageType: 'Blog Article',
      publishedOn: '2021-07-22',
      schema: null,
      slug: 'blog/vans/mitsubishi-outlander-commercial-review',
      title: 'Mitsubishi Outlander Commercial',
    };
    const expected = [
      { link: { href: '/', label: 'Home' } },
      { link: { href: '/blog', label: 'blog' } },
      { link: { href: '/blog/vans', label: 'Vans' } },
      {
        link: {
          href: '/blog/vans/mitsubishi-outlander-commercial-review',
          label: 'Mitsubishi Outlander Commercial Review',
        },
      },
    ];

    expect(getBreadCrumbsItems(metaData)).toStrictEqual(expected);
  });
});

describe('getBlogBreadCrumbsFromSlug', () => {
  it('getBreadcrumbSlugs should return correct result', () => {
    const slug = 'blog/vans/mitsubishi-outlander-commercial-review';
    const expected = [
      { link: { href: '/', label: 'Home' } },
      { link: { href: '/blog', label: 'blog' } },
      { link: { href: '/blog/vans', label: 'Vans' } },
      {
        link: {
          href: '/blog/vans/mitsubishi-outlander-commercial-review',
          label: 'Mitsubishi Outlander Commercial Review',
        },
      },
    ];

    expect(getBlogBreadCrumbsFromSlug(slug)).toStrictEqual(expected);
  });
});

describe('convertSlugToBreadcrumbsSchema', () => {
  it('convertSlugToBreadcrumbsSchema should return correct result', () => {
    const slug = 'blog/vans/mitsubishi-outlander-commercial-review';
    const expected = {
      '@context': 'https://schema.org/',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://www.vanarama.com',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Blog',
          item: 'https://www.vanarama.com/blog',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Vans',
          item: 'https://www.vanarama.com/blog/vans',
        },
        {
          '@type': 'ListItem',
          position: 4,
          name: 'Mitsubishi Outlander Commercial Review',
          item: '',
        },
      ],
    };

    expect(convertSlugToBreadcrumbsSchema(slug)).toStrictEqual(expected);
  });
});
