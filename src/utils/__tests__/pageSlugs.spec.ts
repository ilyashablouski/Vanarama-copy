import { getBlogPaths } from '../pageSlugs';
import { BlogPosts_blogPosts as IBlogPosts } from '../../../generated/BlogPosts';

describe('pageSlugs', () => {
  const blogData = {
    blogPosts: {
      metaData: {
        title:
          'Competition Results | Vanarama Blog | Van, Industry & Company News | Vanarama',
        name: null,
        metaRobots: null,
        metaDescription: null,
        legacyUrl: '/latest-news/category/competition-results.html',
        pageType: 'Article Category',
        canonicalUrl:
          'https://www.vanarama.com/latest-news/category/competition-results.html',
        slug: 'blog/competition-results',
        schema: {
          '@type': 'BreadcrumbList',
          '@context': 'https://schema.org',
          itemListElement: [
            {
              item: 'https://www.vanarama.com/',
              name: 'Home',
              '@type': 'ListItem',
              position: 1,
            },
            {
              item: 'https://www.vanarama.com/latest-news.html',
              name: 'Latest News',
              '@type': 'ListItem',
              position: 2,
            },
            {
              name: 'Competition Results',
              '@type': 'ListItem',
              position: 3,
            },
          ],
        },
        publishedOn: null,
        breadcrumbs: [
          {
            href: '/',
            label: 'Home',
          },
          {
            href: 'https://www.vanarama.com/latest-news.html',
            label: 'Latest News',
          },
          {
            label: 'Vanarama National League',
          },
        ],
      },
      sections: {
        leadText: null,
        cards: null,
        carousel: null,
        tiles: null,
      },
      pageTitle:
        'Competition Results | Vanarama Blog | Van, Industry & Company News',
      articles: [
        {
          intro: null,
          name: 'Matthew Newton is the #VanaramaUltimateFan',
          metaData: { publishedOn: '2016-05-17' },
          excerpt: null,
          featuredImage: {
            file: {
              url:
                '//images.ctfassets.net/3xid768u5joa/6k2u1oLZAc3X4IzQASX7mB/0191e5f8f08443b7de5f31a028693691/winner.jpg',
            },
          },
          isFeatured: true,
          title: 'VanaramaUltimateFan2016 | Vanarama',
          tags: null,
          slug: 'blog/national-league/vanaramaultimatefan2016.html',
          body: '',
          legacyUrl: '/latest-news/vanaramaultimatefan2016.html',
        },
        {
          intro: null,
          name:
            'Vanarama Conference half season ticket and signed shirt competition winners',
          metaData: { publishedOn: '2014-12-30' },
          featuredImage: {
            file: {
              url:
                '//images.ctfassets.net/3xid768u5joa/25CTjISL7XKdl8RFqGM5jS/91dbcbb073448a1dd1b7bc27b0bdb892/competition.jpg',
            },
          },
          isFeatured: null,
          title: 'Half season ticket and shirt winners | Vanarama',
          tags: null,
          slug: 'blog/vans/half-season-ticket-and-shirt-winners',
          body: '',
          legacyUrl: '/latest-news/half-season-ticket-and-shirt-winners.html',
        },
      ],
    },
  };
  it.skip('getBlogPaths should filter slugs which includes .html', () => {
    const actual = getBlogPaths(blogData?.blogPosts as IBlogPosts);

    expect(actual).toEqual([
      {
        params: {
          articles: ['half-season-ticket-and-shirt-winners'],
        },
      },
    ]);
  });
});
