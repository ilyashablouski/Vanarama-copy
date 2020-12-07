import React from 'react';
import preloadAll from 'jest-next-dynamic';
import { MockedProvider } from '@apollo/client/testing';
import { screen, render, waitFor } from '@testing-library/react';
import PageNotFoundContainer from '../PageNotFoundContainer';

jest.mock('../../../hooks/useMediaQuery');
jest.mock('next/router', () => ({
  useRouter: () => ({
    asPath: '/',
  }),
}));

// ARRANGE
const NAME = 'Top 5 Electric Vans Sort Of';

const CARDS = [
  {
    body:
      'Find the perfect van lease for your business with a huge range of brand new, in-stock, commercial vehicles to choose from at unbeatable prices.',
    image: {
      description: 'Trafic',
      file: {
        fileName: 'renaulttrafic0917(2).jpg',
        url:
          '//images.ctfassets.net/3xid768u5joa/22zuZfMLYzskVi3MQPcu7c/32caa929339dc2e88eee09ea2af84b79/renaulttrafic0917_2_.jpg',
      },
      title: 'Renaulttrafic0917(2)-full',
    },
    link: {
      text: 'Search Vans',
      url: '/van-leasing.html',
      legacyUrl: '/van-leasing.html',
    },
    name: 'Search Vans',
    title: 'Search Vans',
    titleTag: 'h2',
  },
  {
    body:
      'Drive a brand new car with affordable monthly payments. We offer superb business & personal contract hire deals on a range of lease cars.',
    image: {
      description: 'Trafics',
      file: {
        fileName: 'renaulttrafic0917(2).jpg',
        url:
          '//images.ctfassets.net/3xid768u5joa/22zuZfMLYzskVi3MQPcu7c/32caa929339dc2e88eee09ea2af84b79/renaulttrafic0917_2_.jpg',
      },
      title: 'Renaulttrafic0917(2)-full',
    },
    link: {
      text: 'Search Cars',
      url: '/van-leasing.html',
      legacyUrl: '/van-leasing.html',
    },
    name: 'Search Cars',
    title: 'Search Cars',
    titleTag: 'h2',
  },
];

const FEATURED = {
  body:
    "It looks like you've ventured down the wrong road. Let's get you back on track. Just choose your preferred vehicle to get you back where you should be ...",
  cards: null,
  iconList: null,
  image: {
    description: null,
    file: {
      fileName: 'shutterstock_773667343.jpg',
      url:
        '//images.ctfassets.net/3xid768u5joa/3onM1VAXZCIRTHPcHbfD55/f24511517067f91e7008765ff0c9656a/shutterstock_773667343.jpg',
    },
    title: 'shutterstock 773667343',
  },
  layout: ['Media Left'],
  link: null,
  testimonials: null,
  defaultHeight: null,
  title: null,
  titleTag: null,
  video: null,
};

describe('<PageNotFoundContainer />', () => {
  beforeEach(async () => {
    await preloadAll();
  });
  it('should match snapshot', async () => {
    // ACT
    const getComponent = render(
      <MockedProvider addTypename={false}>
        <PageNotFoundContainer
          cards={CARDS}
          name={NAME}
          featured={FEATURED}
          breadcrumbsItems={null}
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
