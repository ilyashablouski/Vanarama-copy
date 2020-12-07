import React from 'react';
import preloadAll from 'jest-next-dynamic';
import { MockedProvider } from '@apollo/client/testing';
import { screen, render, waitFor } from '@testing-library/react';
import FeaturedAndTilesContainer from '../FeaturedAndTilesContainer';
import { GenericPageQuery } from '../../../../generated/GenericPageQuery';

jest.mock('next/router', () => ({
  useRouter: () => ({
    asPath: '/',
  }),
}));
jest.mock('../../../hooks/useMediaQuery');

// ARRANGE
const TITLE = `Vanarama Smiles Container`;
const BODY = ``;

const SECTIONS = {
  __typename: 'Sections',
  featured1: {
    __typename: 'Featured',
    title: 'Welcome To Vanarama Smiles',
    titleTag: 'h2',
    body:
      "As a thank you, we're giving Vanarama customers exclusive access to our rewards scheme. When you lease with us you'll earn Smiles to enjoy some of the very best offers, discounts and free gifts.\n",
    image: {
      __typename: 'Image',
      title: 'gymarama',
      description: 'Vanarama smiles gym',
      file: {
        __typename: 'File',
        url:
          '//images.ctfassets.net/3xid768u5joa/6kt6I38iXsoiLAxzJDH9Ti/f3d607d7c220c9c038f434553927878d/gymarama.jpg',
        fileName: 'gymarama.jpg',
        contentType: 'image/jpeg',
      },
    },
    layout: null,
  },
  featured2: {
    __typename: 'Featured',
    title: 'Vanarama Smiles 2',
    titleTag: 'h2',
    body:
      'Due to the Covid-19 outbreak, earning and spending Smiles points on certain rewards is now temporarily on hold. We are sorry for any inconvenience this may cause. We are working hard behind the scenes to source some of the best in-home offers for you during this difficult time. To view these offers, simply visit the My Offers page on vanaramasmiles.co.uk',
    image: null,
    layout: null,
  },
  featured3: null,
  tiles: {
    __typename: 'Tiles',
    name: "What's Included?",
    tilesTitle: "What's Included?",
    titleTag: 'h2',
    tiles: [
      {
        __typename: 'Tile',
        title: 'Breakdown Cover',
        body:
          "Wherever your vehicle breaks down, our trusted partner, the RAC, will provide assistance, so you'll never be left stranded.",
        link: null,
        image: {
          __typename: 'Image',
          title: 'Fleet-Icon',
          description: 'Fleet-Icon',
          file: {
            __typename: 'File',
            url:
              '//images.ctfassets.net/3xid768u5joa/3a609lEJL2WBF9fBG9V6N6/9bbcee8eba6f7deecfbbab92582283e2/Fleet-Icon.png',
            fileName: 'Fleet-Icon.png',
            contentType: 'image/png',
          },
        },
      },
      {
        __typename: 'Tile',
        title: 'At Home Cover',
        body:
          "If your vehicle won't start, the RAC will fix your vehicle if you break down at, or within ¼ mile of home. Just pop the kettle on & sit tight.",
        link: null,
        image: {
          __typename: 'Image',
          title: 'free-safe-contactless-delivery',
          description: 'free-safe-contactless-delivery',
          file: {
            __typename: 'File',
            url:
              '//images.ctfassets.net/3xid768u5joa/7gH6pHpHcgXHt14wJlfqmz/0acc5f3d654e0a2f1e2e1e584901983e/delivery.jpg',
            fileName: 'delivery.jpg',
            contentType: 'image/jpeg',
          },
        },
      },
      {
        __typename: 'Tile',
        title: 'Recovery',
        body:
          "If your vehicle can't be fixed at the roadside, the RAC will take it for repair. All part of the service!",
        link: null,
        image: {
          __typename: 'Image',
          title: 'Insurance-Icon',
          description: 'Insurance-Icon',
          file: {
            __typename: 'File',
            url:
              '//images.ctfassets.net/3xid768u5joa/3KhuHOZWIeppLEsCTcouiY/a384211adc3f246728f3c5fd9d8cf637/Insurance-Icon.png',
            fileName: 'Insurance-Icon.png',
            contentType: 'image/png',
          },
        },
      },
      {
        __typename: 'Tile',
        title: 'Replacement Vehicle',
        body:
          "If your vehicle's off the road needing repair, we'll keep your business moving by giving you a similar-sized vehicle for up to 7 days.",
        link: null,
        image: {
          __typename: 'Image',
          title: 'Vanarama-Price-Promise-Icon',
          description: null,
          file: {
            __typename: 'File',
            url:
              '//images.ctfassets.net/3xid768u5joa/4v2ALClaL6YnE0NYRsd8uc/7e92f2b83eb9e594ced8269152961026/Icon-PricePromise-RGB.png',
            fileName: 'Icon-PricePromise-RGB.png',
            contentType: 'image/png',
          },
        },
      },
    ],
  },
} as any;

const DATA = {
  genericPage: {
    sections: SECTIONS,
    body: BODY,
    metaData: {
      name: TITLE,
    },
  },
} as GenericPageQuery;

describe('<FeaturedAndTilesContainer />', () => {
  beforeEach(async () => {
    await preloadAll();
  });
  it('should match snapshot', async () => {
    // ACT
    const getComponent = render(
      <MockedProvider addTypename={false}>
        <FeaturedAndTilesContainer data={DATA} />
      </MockedProvider>,
    );
    // ASSERT
    await waitFor(() => {
      expect(screen.getByText(`Vanarama Smiles Container`)).toBeInTheDocument();
    });
    const tree = getComponent.baseElement;
    expect(tree).toMatchSnapshot();
  });
});
