import React from 'react';
import preloadAll from 'jest-next-dynamic';
import { MockedProvider } from '@apollo/client/testing';
import { screen, render, waitFor } from '@testing-library/react';
import BlogPostContainer from '../BlogPostContainer';

jest.mock('../../../hooks/useMediaQuery');
jest.mock('next/router', () => ({
  useRouter: () => ({
    asPath: '/',
  }),
}));

// ARRANGE
const METADATA = {
  canonicalUrl: 'https://www.vanarama.com/car-leasing.html',
  legacyUrl: 'https://www.vanarama.com/car-leasing.html',
  metaDescription:
    'Find unbeatable Car Leasing Deals at Vanarama. Get top personal & business lease offers on brand new, in-stock cars in every make and model. Save money and lease your dream car today.',
  metaRobots: 'all',
  name: 'HubCarPage',
  pageType: null,
  publishedOn: null,
  slug: 'hubcarpage',
  title: 'Car Leasing Deals | Personal & Business Contract Hire | Vanarama',
  schema: null,
  breadcrumbs: null,
};

const ARTICLES = [
  {
    excerpt: 'Test1',
    featuredImage: { __typename: 'Image', file: null },
    intro: null,
    isFeatured: null,
    name: '4-year MoT exemption period could save YOU money!',
    metaData: { publishedOn: '2017-02-13' },
    slug: 'blog/vans/4-year-mot-exemption',
    tags: null,
    title: '4-year MoT exemption period proposed for vans | Vanarama',
    legacyUrl: 'https://www.vanarama.com/blog/vans/4-year-mot-exemption',
    __typename: 'Article',
  },
  {
    excerpt: 'Test2',
    featuredImage: { __typename: 'Image', file: null },
    intro: null,
    isFeatured: null,
    name: 'Top 5 Electric Vans… Sort Of',
    metaData: { publishedOn: '2017-02-13' },
    slug: 'blog/vans/top-5-electric-vans',
    tags: null,
    title: 'Top 5 Electric Vans | Vanarama',
    legacyUrl: 'https://www.vanarama.com/blog/vans/top-5-electric-vans',
    __typename: 'Article',
  },
  {
    excerpt: 'Test3',
    featuredImage: { __typename: 'Image', file: null },
    intro: null,
    isFeatured: null,
    name: '5 Things We Love About Peugeot Boxer',
    metaData: { publishedOn: '2020-06-02' },
    slug: 'blog/vans/5-things-we-love-about-peugeot-boxer',
    legacyUrl:
      'https://www.vanarama.com/blog/vans/5-things-we-love-about-peugeot-boxer',
    tags: null,
    title: '5 Things We Love About Peugeot Boxer',
    __typename: 'Article',
  },
];

const BODY =
  '#### **By Paul Kirby, Vanarama Head Of EV & LCV**\n\n\n**If I was to scour the internet for the best lease deals on an electric van I would probably find only 4 electric vehicles available for sale.';

const NAME = 'Top 5 Electric Vans Sort Of';

const IMAGE =
  '//images.ctfassets.net/3xid768u5joa/2FgrgR6JOuvUgIGRmV5rZg/648465d10d6aa137a720013270728029/maxus-top-electric-vans.jpg';

describe('<FinanceExplainedContainer />', () => {
  beforeEach(async () => {
    await preloadAll();
  });
  it('should match snapshot', async () => {
    // ACT
    const getComponent = render(
      <MockedProvider addTypename={false}>
        <BlogPostContainer
          articles={ARTICLES}
          image={IMAGE}
          name={NAME}
          body={BODY}
          breadcrumbsItems={null}
          metaData={METADATA}
        />
      </MockedProvider>,
    );
    // ASSERT
    await waitFor(() => {
      expect(
        screen.getByText(`Top 5 Electric Vans Sort Of`),
      ).toBeInTheDocument();
    });

    const tree = getComponent.baseElement;
    expect(tree).toMatchSnapshot();
  });
});
