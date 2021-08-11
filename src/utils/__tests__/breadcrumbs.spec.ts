import { getBlogBreadCrumbsFromSlug } from '../breadcrumbs';

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
