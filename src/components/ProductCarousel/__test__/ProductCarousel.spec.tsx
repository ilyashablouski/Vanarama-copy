import React from 'react';
import Router from 'next/router';
import { fireEvent, render, waitFor, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import ProductCarousel from '../ProductCarousel';
import {
  LeaseTypeEnum,
  VehicleTypeEnum,
} from '../../../../generated/globalTypes';

jest.mock('next/router', () => ({ push: jest.fn() }));

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
    manufacturerName: 'Ford',
    derivativeName: '1.0 EcoBoost 125 ST-Line Nav 5dr',
    rangeName: 'Focus',
    bodyStyleName: 'Hatchback',
    slug: '10-ecoBoost-125-st-line-nav-5dr',
    capCode: 'capCode',
    name: 'name',
    modelName: 'modelName',
    manufacturer: {
      name: 'name',
    },
    model: {
      name: 'name',
    },
    fuelType: {
      name: 'name',
    },
    fuelTypeName: 'fuelTypeName',
    transmission: {
      name: 'name',
    },
    transmissionName: 'transmissionName',
    bodyStyle: {
      name: 'name',
    },
    range: {
      name: 'name',
    },
    __typename: 'derivative',
  },
];

describe('<ProductCarousel />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    render(
      <ProductCarousel
        leaseType={LeaseTypeEnum.PERSONAL}
        data={{
          derivatives: DERIVATIVES,
          productCard: PRODUCT_CARDS,
        }}
        countItems={6}
        dataTestIdBtn="van-view-offer"
      />,
    );
  });

  it('should trigger route push when clicking car View Offer', async () => {
    await screen.findByTestId('van-view-offer');
    fireEvent.click(screen.getByTestId('van-view-offer'));
    await waitFor(() =>
      expect(Router.push).toHaveBeenCalledWith(
        '/van-leasing/[...manufacturer]',
        '/van-leasing/ford/focus/10-ecoBoost-125-st-line-nav-5dr',
      ),
    );
  });
});
