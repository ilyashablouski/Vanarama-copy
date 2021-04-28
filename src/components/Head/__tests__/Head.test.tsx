import renderer from 'react-test-renderer';
import preloadAll from 'jest-next-dynamic';
import React from 'react';

import Head from '../Head';

jest.mock('next/router', () => ({
  useRouter: () => ({
    asPath: '/b2b/olaf/director-details',
  }),
}));

const meta = {
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

describe('<Head />', () => {
  beforeEach(async () => {
    await preloadAll();
  });
  it('renders correctly', () => {
    const getComponent = () => {
      return renderer.create(<Head metaData={meta} />).toJSON();
    };
    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });
});
