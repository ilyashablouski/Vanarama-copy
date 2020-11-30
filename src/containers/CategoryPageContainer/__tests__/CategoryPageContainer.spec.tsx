import React from 'react';
import preloadAll from 'jest-next-dynamic';
import { MockedProvider } from '@apollo/client/testing';
import { screen, render, waitFor } from '@testing-library/react';
import CategoryPageContainer from '../CategoryPageContainer';
import { GenericPageQuery_genericPage_sections_featured as Featured } from '../../../../generated/GenericPageQuery';

jest.mock('../../../hooks/useMediaQuery');
jest.mock('next/router', () => ({
  useRouter: () => ({
    asPath: '/',
    query: {},
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
    body: 'Body',
    featuredImage: { file: null, __typename: 'Image' },
    intro: null,
    slug: 'blog/cars/best-cars-for-mpg',
    tags: null,
    publishedOn: '2020-02-22',
    isFeatured: false,
    name: 'Best Cars For MPG',
    title: 'Best Cars For MPG | Vanarama',
    legacyUrl: 'blog/cars/best-cars-for-mpg',
    _typename: 'Article',
  },
];

const FEATURED = {
  body:
    'Eu ex nulla ea veniam nisi tempor pariatur consectetur duis ea adipisicing aliqua ullamco ipsum↵↵Tempor sit magna eu eu tempor sunt officia esse velit excepteur laborum non ea amet aliqua adipisicing voluptate adipisicing velit quis ut ut mollit officia aute eiusmod cillum adipisicing et↵↵Culpa sint consectetur sit anim enim occaecat nulla quis minim velit Lorem ea voluptate cillum proident nostrud ut irure cupidatat.)',
  image: {
    title: 'Image',
    description: null,
    file: {
      contentType: 'image/jpeg',
      fileName: 'photo-1543934686-54bae151bd4c',
      details: {
        image: { width: 900, height: 500, __typename: 'ImageDimensions' },
        size: 75472,
        __typename: 'FileDetails',
      },
      url:
        '//images.ctfassets.net/3xid768u5joa/3NMAHSKcOLSuiHzRa6DE46/190659547927a1af84fa8ca2eb5afb40/photo-1543934686-54bae151bd4c',
      __typename: 'File',
    },
    __typename: 'Image',
  },
  layout: ['Media Left'],
  link: null,
  title: 'Featured Article Title',
  titleTag: null,
  video: null,
  iconList: null,
  cards: null,
  testimonials: null,
  defaultHeight: null,
  __typename: 'Featured',
} as Featured;

const TILES = {
  name: 'Top Articles',
  position: 2,
  tiles: [
    { body: null, title: null, link: null, image: null, __typename: 'Tile' },
    {
      body:
        'Sunt enim sunt laborum culpa eiusmod do aliqua voluptate in aute nisi anim magna ullamc',
      title: 'Category Titles',
      link: null,
      image: {
        description: null,
        file: {
          contentType: 'image/jpeg',
          fileName: 'boxer4.jpg',
          url:
            '//images.ctfassets.net/3xid768u5joa/2orLDit2z21KrvoHfleXI5/ff92ffe3245b88f55b4ad3bf442e4283/boxer4.jpg',
          __typename: 'File',
        },
        title: 'boxer4',
        __typename: 'Image',
      },
      __typename: 'Tile',
    },
  ],
  tilesTitle: 'Top Articles',
  titleTag: 'h3',
  __typename: 'Tiles',
};

describe('<CategoryPageContainer />', () => {
  beforeEach(async () => {
    await preloadAll();
  });
  it('should match snapshot', async () => {
    // ACT
    const getComponent = render(
      <MockedProvider addTypename={false}>
        <CategoryPageContainer
          featured={FEATURED}
          metaData={METADATA}
          articles={ARTICLES}
          tiles={TILES}
          breadcrumbsItems={null}
        />
      </MockedProvider>,
    );
    // ASSERT
    await waitFor(() => {
      expect(
        screen.getByText(
          `Sunt enim sunt laborum culpa eiusmod do aliqua voluptate in aute nisi anim magna ullamc`,
        ),
      ).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText(`Featured Article Title`)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText(`Best Cars For MPG`)).toBeInTheDocument();
    });

    const tree = getComponent.baseElement;
    expect(tree).toMatchSnapshot();
  });
});
