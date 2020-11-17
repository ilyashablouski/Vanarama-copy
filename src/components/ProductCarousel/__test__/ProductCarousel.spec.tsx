import React from 'react';
import preloadAll from 'jest-next-dynamic';
import { render, screen } from '@testing-library/react';
import ProductCarousel from '../ProductCarousel';
import {
  LeaseTypeEnum,
  VehicleTypeEnum,
} from '../../../../generated/globalTypes';

jest.mock('next/router', () => ({
  push: jest.fn(),
  useRouter: () => ({
    asPath: '/',
  }),
}));

const PRODUCT_CARDS = [
  {
    capId: '44514',
    isOnOffer: true,
    manufacturerName: 'Citroen',
    derivativeName: '1.5 BlueHDi 650Kg Enterprise 75ps',
    rangeName: 'Berlingo',
    imageUrl:
      'https://images.autorama.co.uk/Photos/Cap/Vehicles/161237/cap-44514-161237.jpg',
    leadTime: 'Factory Order',
    averageRating: 4.7,
    businessRate: 139,
    personalRate: 186.98,
    offerPosition: null,
    keyInformation: null,
    vehicleType: VehicleTypeEnum.LCV,
  },
];

const DERIVATIVES = [
  {
    id: '44514',
    derivativeName: '1.0 EcoBoost 125 ST-Line Nav 5dr',
    slug: '10-ecoBoost-125-st-line-nav-5dr',
    capCode: 'capCode',
    name: 'name',
    manufacturer: {
      name: 'Ford',
      slug: 'ford',
    },
    model: {
      name: 'Focus',
      slug: 'focus',
    },
    fuelType: {
      name: 'name',
    },
    transmission: {
      name: 'name',
    },
    bodyStyle: {
      name: 'Hatchback',
    },
    range: {
      name: 'Focus',
      slug: 'focus',
    },
    __typename: 'derivative',
  },
];

const VEHICLE_LIST = {
  edges: [
    {
      cursor: 'cursor',
      node: {
        derivativeId: '44514',
        url: '/ford/focus/10-ecoBoost-125-st-line-nav-5dr',
        legacyUrl: null,
        vehicleType: VehicleTypeEnum.LCV,
      },
    },
  ],
};

describe('<ProductCarousel />', () => {
  beforeEach(async () => {
    await preloadAll();
    jest.clearAllMocks();
    render(
      <ProductCarousel
        leaseType={LeaseTypeEnum.PERSONAL}
        data={{
          derivatives: DERIVATIVES,
          productCard: PRODUCT_CARDS,
          vehicleList: VEHICLE_LIST,
        }}
        countItems={6}
        dataTestIdBtn="van-view-offer"
      />,
    );
  });

  it('should trigger route push when clicking car View Offer', async () => {
    await screen.findByTestId('van-view-offer');

    expect(screen.getByTestId('van-view-offer')).toHaveAttribute(
      'href',
      '/ford/focus/10-ecoBoost-125-st-line-nav-5dr',
    );
  });
});
