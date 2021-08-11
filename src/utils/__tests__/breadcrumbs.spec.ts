import {
  convertSlugToBreadcrumbsSchema,
  getBlogBreadCrumbsFromSlug,
} from '../breadcrumbs';

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
