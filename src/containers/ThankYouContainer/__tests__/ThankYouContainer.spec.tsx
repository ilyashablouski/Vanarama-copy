import React from 'react';
import preloadAll from 'jest-next-dynamic';
import { screen, render, waitFor } from '@testing-library/react';
import ThankYouContainer from '../ThankYouContainer';

jest.mock('next/router', () => ({
  useRouter: () => ({
    asPath: '/',
  }),
}));

// ARRANGE
const SECTIONS = {
  leadText: {
    titleTag: 'h1',
    heading: 'Thank You For Your Request',
    description:
      'A member of our team will contact you shortly. If you wish to speak to the insurance team please call us on 01442 838173\n',
    position: 0,
  },
  carousel: {
    title: 'Other Insurance Products',
    name: 'Other Insurance Products',
    cards: [
      {
        name: 'Multi-Year Insurance',
        title: 'Multi-Year Insurance',
        image: {
          title: 'placeholder',
          description: null,
          file: {
            url:
              '//images.ctfassets.net/3xid768u5joa/ufm5sstitBVeCwZ71417K/29d8383eb233ed514ea00ffc650879e3/placeholder.jpg',
            fileName: 'placeholder.jpg',
          },
        },
        body: 'Protect yourself against future insurance price increases',
        link: {
          text: 'Multi-Year Van Insurance',
          url:
            'https://beta.vanarama.com/van-insurance/multi-year-van-insurance.html',
        },
      },
      {
        name: 'Finance GAP Insurance',
        title: 'Finance GAP Insurance',
        image: {
          title: 'placeholder',
          description: null,
          file: {
            url:
              '//images.ctfassets.net/3xid768u5joa/ufm5sstitBVeCwZ71417K/29d8383eb233ed514ea00ffc650879e3/placeholder.jpg',
            fileName: 'placeholder.jpg',
          },
        },
        body: 'Extra protection should the worst happen',
        link: {
          text: 'Finance GAP Insurance',
          url:
            'https://beta.vanarama.com/van-insurance/finance-gap-insurance.html',
        },
      },
      {
        name: 'Tools in Transit Insurance',
        title: 'Tools in Transit Insurance',
        image: {
          title: 'placeholder',
          description: null,
          file: {
            url:
              '//images.ctfassets.net/3xid768u5joa/ufm5sstitBVeCwZ71417K/29d8383eb233ed514ea00ffc650879e3/placeholder.jpg',
            fileName: 'placeholder.jpg',
          },
        },
        body: "Get up to £3k's worth of tools cover for only £75 per year",
        link: {
          text: 'Tools in Transit Insurance',
          url: 'https://beta.vanarama.com/van-insurance/tools-in-transit.html',
        },
      },
    ],
  },
  __typename: 'Sections',
} as any;

describe('<ThankYouContainer />', () => {
  beforeEach(async () => {
    await preloadAll();
  });
  it('should match snapshot', async () => {
    const getComponent = render(<ThankYouContainer sections={SECTIONS} />);
    // ASSERT
    await waitFor(() => {
      expect(
        screen.getByText(`Thank You For Your Request`),
      ).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(
        screen.getByText(
          `A member of our team will contact you shortly. If you wish to speak to the insurance team please call us on 01442 838173`,
        ),
      ).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText(`Other Insurance Products`)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText(`Finance GAP Insurance`)).toBeInTheDocument();
    });

    const tree = getComponent.baseElement;
    expect(tree).toMatchSnapshot();
  });
});
