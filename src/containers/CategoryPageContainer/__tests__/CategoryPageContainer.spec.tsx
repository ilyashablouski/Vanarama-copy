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

describe('<CategoryPageContainer />', () => {
  it('should match snapshot', async () => {
    // ACT
    const getComponent = render(
      <MockedProvider addTypename={false}>
        <CategoryPageContainer metaData={METADATA} carousel={CAROUSEL} />
      </MockedProvider>,
    );
    // ASSERT
    await waitFor(() => {
      expect(screen.getByText(`Van News`)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText(`Van News`)).toBeInTheDocument();
    });

    const tree = getComponent.baseElement;
    expect(tree).toMatchSnapshot();
  });
});
