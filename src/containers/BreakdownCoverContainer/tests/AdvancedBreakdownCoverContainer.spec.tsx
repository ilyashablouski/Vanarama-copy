import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { screen, render, waitFor } from '@testing-library/react';
import AdvancedBreakdownCoverContainer from '../AdvancedBreakdownCoverContainer';

// ARRANGE
const TITLE = `Advanced Breakdown Cover`;
const BODY = ``;

const SECTIONS = {
  __typename: 'Sections',
  featured1: {
    __typename: 'Featured',
    title: 'Advanced Breakdown Cover',
    titleTag: 'h2',
    body:
      "## Full & Drama-Free Breakdown Cover For Less\n\nBreaking down is the last thing you want to think about when you order your brand-new van or pickup truck from us. But it could happen, & if you don't have breakdown cover, you're likely to find yourself forking out a fortune to recover your vehicle & find a replacement.\n\nSo, get our Advanced Breakdown Cover when you lease a brand-new van or pickup truck from Vanarama. If you break down, you're covered! If your vehicle needs repairing we'll give you a similar-sized vehicle for up to 7 days to keep your business moving!\n\n[View Deals](https://beta.vanarama.com/special-offers.html)",
    image: {
      __typename: 'Image',
      title: 'abc-man',
      description: null,
      file: {
        __typename: 'File',
        url:
          '//images.ctfassets.net/3xid768u5joa/5Z6WeTc9kvkrnJpomCE1s4/0a3ec860b45748e384761e24be3d2e42/abc-man.jpg',
        fileName: 'abc-man.jpg',
        contentType: 'image/jpeg',
      },
    },
  },
  featured2: {
    __typename: 'Featured',
    title: 'How Much Will It Cost You?',
    titleTag: 'h2',
    body:
      'Advanced Breakdown Cover is only £9 per month for the entire length of your lease. You get all that piece of mind for less than a tenner a month... talk about a no-brainer.\n\n[View Deals](https://beta.vanarama.com/special-offers.html)',
  },
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

describe('<AdvancedBreakdownCoverContainer />', () => {
  it('should match snapshot', async () => {
    // ACT
    const getComponent = render(
      <MockedProvider addTypename={false}>
        <AdvancedBreakdownCoverContainer
          sections={SECTIONS}
          title={TITLE}
          body={BODY}
        />
      </MockedProvider>,
    );
    // ASSERT
    await waitFor(() => {
      expect(
        screen.getByText(`Full & Drama-Free Breakdown Cover For Less`),
      ).toBeInTheDocument();
    });
    const tree = getComponent.baseElement;
    expect(tree).toMatchSnapshot();
  });
});
