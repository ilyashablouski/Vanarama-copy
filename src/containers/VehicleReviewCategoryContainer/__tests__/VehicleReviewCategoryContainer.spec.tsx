import React from 'react';
import preloadAll from 'jest-next-dynamic';
import { MockedProvider } from '@apollo/client/testing';
import { screen, render, waitFor } from '@testing-library/react';
import VehicleReviewCategoryContainer from '../VehicleReviewCategoryContainer';
import { ReviewsHubCategoryQuery } from '../../../../generated/ReviewsHubCategoryQuery';

jest.mock('next/router', () => ({
  useRouter: () => ({
    asPath: '/',
    pathname: 'test',
    query: {},
  }),
}));
jest.mock('../../../hooks/useMediaQuery');

// ARRANGE
const TITLE = 'Citroen Van Reviews';
const BODY =
  'Looking for advice on which van to lease? Check out our expert reviews of the latest Citroen vans and see how they fared in the Vanarama roadtest.\n';

const SECTIONS = {
  __typename: 'Sections',
  cards: {
    __typename: 'Cards',
    name: null,
    description: null,
    cards: [
      {
        __typename: 'Card',
        titleTag: 'h3',
        name: 'Citroen Berlingo Review',
        title: 'Citroen Berlingo Review',
        body:
          'The Citroen Berlingo small van is compact & capable - it also won a tonne of awards on launch....',
        reviewRating: '4.5',
        link: {
          __typename: 'Link',
          text: 'Read Review',
          url:
            'https://next-storefront.grid.dev.autorama.co.uk/van-reviews/citroen-berlingo-review',
        },
        image: {
          __typename: 'Image',
          title: 'berlingo-outside',
          file: {
            __typename: 'File',
            url:
              '//images.ctfassets.net/3xid768u5joa/1ufFnJNOsfjenEKcmSUeXt/f0978cb49686d6466600a17ea0d6d0e9/berlingo-outside.jpg',
          },
        },
      },
      {
        __typename: 'Card',
        titleTag: 'h3',
        name: 'Citroen Dispatch Review',
        title: 'Citroen Dispatch Review',
        body:
          "3 lengths to pick from, a tech-filled cabin that transforms into a mobile office and you'll get a choice of 5 engines...",
        reviewRating: '4.5',
        link: {
          __typename: 'Link',
          text: 'Read Review',
          url:
            'https://next-storefront.grid.dev.autorama.co.uk/van-reviews/citroen-dispatch-review',
        },
        image: {
          __typename: 'Image',
          title: 'citroen dispatch hero',
          file: {
            __typename: 'File',
            url:
              '//images.ctfassets.net/3xid768u5joa/3eBmv58a6e5OM3Ja5Tg2dJ/e47409765ce01ce8a19d874a465ac03b/citroen_dispatch_hero.jpg',
          },
        },
      },
      {
        __typename: 'Card',
        titleTag: 'h3',
        name: 'Citroen Relay Review',
        title: 'Citroen Relay Review',
        body:
          'he Citroen Relay 35 L3 Diesel takes a workhorse approach, and is suited to transporting capacity payloads over distance...',
        reviewRating: '4.5',
        link: {
          __typename: 'Link',
          text: 'Read Review',
          url:
            'https://next-storefront.grid.dev.autorama.co.uk/van-reviews/citroen-relay-review',
        },
        image: {
          __typename: 'Image',
          title: 'citroen-relay-hero',
          file: {
            __typename: 'File',
            url:
              '//images.ctfassets.net/3xid768u5joa/1TFjMfDaIJZyMSTHDNmzsI/795d1ce5e299bfb5f3af44f5ebb9af31/citroen-relay-hero.jpg',
          },
        },
      },
    ],
  },
} as any;

const genericPageData = {
  genericPage: {
    sections: SECTIONS,
    body: BODY,
    metaData: {
      name: TITLE,
      legacyUrl: 'van-reviews.html',
    },
  },
} as ReviewsHubCategoryQuery;

describe('<VehicleReviewContainer />', () => {
  beforeEach(async () => {
    await preloadAll();
  });
  it('should match snapshot', async () => {
    // ACT
    const getComponent = render(
      <MockedProvider addTypename={false}>
        <VehicleReviewCategoryContainer data={genericPageData} />
      </MockedProvider>,
    );
    // ASSERT
    await waitFor(() => {
      expect(screen.getByText(`Citroen Relay Review`)).toBeInTheDocument();
    });

    const tree = getComponent.baseElement;
    expect(tree).toMatchSnapshot();
  });
});
