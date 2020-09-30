import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { screen, render, waitFor } from '@testing-library/react';
import CategoryPageContainer from '../CategoryPageContainer';

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
};

const CAROUSEL = {
  name: 'Insurance News',
  title: 'Insurance News',
  cards: [
    {
      titleTag: null,
      link: null,
      name: 'Do I Need Insurance For A Leased Car?',
      title: 'Do I Need Insurance For A Leased Car?',
      body:
        'Find out what type of coverage you need for a new leased car.\n\n[Read More](https://beta.vanarama.com/car-leasing-explained/do-i-need-insurance-for-leased-car.html)',
      image: null,
    },
  ],
};

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
  __typename: 'Featured',
};

const TILES = {
  name: 'Top Articles',
  position: 2,
  tiles: [
    { body: null, title: null, link: null, image: null, __typename: 'Tile' },
    {
      body:
        'Sunt enim sunt laborum culpa eiusmod do aliqua voluptate in aute nisi anim magna ullamc',
      title: 'Category Title',
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
  it('should match snapshot', async () => {
    // ACT
    const getComponent = render(
      <MockedProvider addTypename={false}>
        <CategoryPageContainer
          featured={FEATURED}
          metaData={METADATA}
          carousel={CAROUSEL}
          tiles={TILES}
        />
      </MockedProvider>,
    );
    // ASSERT
    await waitFor(() => {
      expect(screen.getByText(`Insurance News`)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(
        screen.getByText(`Do I Need Insurance For A Leased Car?`),
      ).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText(`Featured Article Title`)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText(`Top Articles`)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText(`Category Title`)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(
        screen.getByText(
          `Sunt enim sunt laborum culpa eiusmod do aliqua voluptate in aute nisi anim magna ullamc`,
        ),
      ).toBeInTheDocument();
    });

    const tree = getComponent.baseElement;
    expect(tree).toMatchSnapshot();
  });
});
