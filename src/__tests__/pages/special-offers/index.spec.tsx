import React from 'react';
// @ts-ignore
import preloadAll from 'jest-next-dynamic';
import { MockedProvider } from '@apollo/client/testing';
import { render, screen, waitFor } from '@testing-library/react';
import { OffersPage } from '../../../pages/leasing-offers';
import { ProductCardData } from '../../../../generated/ProductCardData';
import { VehicleTypeEnum } from '../../../../generated/globalTypes';
import { VehicleListUrl_vehicleList as IVehicleList } from '../../../../generated/VehicleListUrl';
import { PageTypeEnum } from '../../../types/common';
import { OnOffer } from '../../../../entities/global';

jest.mock('next/router', () => ({
  push: jest.fn(),
  useRouter: () => ({
    asPath: '/',
  }),
}));
jest.mock('../../../containers/OrdersInformation/gql');
jest.mock('../../../gql/vehicleList');
jest.mock('../../../gql/genericPage');
jest.mock('../../../hooks/useMediaQuery');

const productsVan = {
  productCarousel: [
    {
      capId: '44514',
      isOnOffer: OnOffer.FILTER_ENABLED_AND_SET_TO_TRUE,
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
      keyInformation: [
        {
          name: 'Transmission',
          value: 'Manual',
        },
        {
          name: 'Fuel Type',
          value: 'Diesel',
        },
        {
          name: 'Emissions',
          value: '111',
        },
        {
          name: 'Fuel Economy',
          value: '67.2',
        },
      ],
      vehicleType: VehicleTypeEnum.LCV,
    },
  ],
} as ProductCardData;
const productsCar = {
  productCarousel: [
    {
      capId: '83615',
      isOnOffer: OnOffer.FILTER_ENABLED_AND_SET_TO_TRUE,
      manufacturerName: 'Ford',
      derivativeName: '1.0 EcoBoost 125 ST-Line Nav 5dr',
      rangeName: 'Focus',
      imageUrl:
        'https://images.autorama.co.uk/Photos/Vehicles/155485/im_3411.jpg',
      leadTime: '14-21 Day Delivery',
      averageRating: 4.8,
      businessRate: 175.96,
      personalRate: 210.96,
      offerPosition: 1,
      keyInformation: [
        {
          name: 'Transmission',
          value: 'Manual',
        },
        {
          name: 'Fuel Type',
          value: 'Petrol',
        },
        {
          name: 'Emissions',
          value: '97',
        },
        {
          name: 'Fuel Economy',
          value: '67.3',
        },
      ],
      vehicleType: VehicleTypeEnum.CAR,
    },
  ],
} as ProductCardData;
const productsPickup = {
  productCarousel: [
    {
      capId: '44514',
      isOnOffer: OnOffer.FILTER_ENABLED_AND_SET_TO_TRUE,
      manufacturerName: 'Mitsubishi',
      derivativeName: 'Double Cab DI-D 150 Warrior 4WD',
      rangeName: 'L200',
      imageUrl:
        'https://images.autorama.co.uk/Photos/Cap/Vehicles/161237/cap-44514-161237.jpg',
      leadTime: 'Factory Order',
      averageRating: 4.7,
      businessRate: 139,
      personalRate: 186.98,
      offerPosition: null,
      keyInformation: [
        {
          name: 'Transmission',
          value: 'Manual',
        },
        {
          name: 'Fuel Type',
          value: 'Diesel',
        },
        {
          name: 'Emissions',
          value: '111',
        },
        {
          name: 'Fuel Economy',
          value: '67.2',
        },
      ],
      vehicleType: VehicleTypeEnum.LCV,
    },
  ],
} as ProductCardData;

const vehicleListUrl: IVehicleList = {
  totalCount: 1,
  pageInfo: {
    startCursor: 'startCursor',
    endCursor: 'endCursor',
    hasNextPage: false,
    hasPreviousPage: false,
  },
  edges: [
    {
      cursor: 'cursor',
      node: {
        vehicleType: VehicleTypeEnum.LCV,
        derivativeId: '44514',
        url: '/van-leasing/ford/focus/10-ecoBoost-125-st-line-nav-5dr',
        legacyUrl: null,
      },
    },
  ],
};
const derivatives = {
  derivatives: [
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
        slug: 'name',
      },
      model: {
        name: 'name',
        slug: 'name',
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
        slug: 'name',
      },
    },
  ],
  vehicleImages: [
    {
      vehicleType: VehicleTypeEnum.LCV,
      capId: 1212,
      mainImageUrl: 'mainImageUrl',
    },
  ],
};

describe('<OffersPage />', () => {
  beforeEach(async () => {
    await preloadAll();
    render(
      <MockedProvider addTypename={false}>
        <OffersPage
          pageType={PageTypeEnum.DEFAULT}
          vehicleListUrlData={vehicleListUrl}
          productsVanDerivatives={derivatives}
          productsCarDerivatives={derivatives}
          productsPickupDerivatives={derivatives}
          productsCar={productsCar}
          productsPickup={productsPickup}
          productsVan={productsVan}
        />
      </MockedProvider>,
    );
  });

  it('should successfully query Van offers data', async () => {
    await waitFor(() => {
      expect(
        screen.getByText('1.5 BlueHDi 650Kg Enterprise 75ps'),
      ).toBeInTheDocument();
    });
  });

  it('should successfully query Car offers data', async () => {
    await waitFor(() => {
      expect(
        screen.getByText('1.0 EcoBoost 125 ST-Line Nav 5dr'),
      ).toBeInTheDocument();
    });
  });

  it('should successfully query Pickup offers data', async () => {
    await waitFor(() => {
      expect(
        screen.getByText('Double Cab DI-D 150 Warrior 4WD'),
      ).toBeInTheDocument();
    });
  });
});
