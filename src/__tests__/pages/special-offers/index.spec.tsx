import React from 'react';
// @ts-ignore
import preloadAll from 'jest-next-dynamic';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { render, screen, waitFor } from '@testing-library/react';
import { PRODUCT_CARD_CONTENT } from '../../../gql/productCard';
import { OffersPage } from '../../../pages/leasing-offers';
import { ProductCardData } from '../../../../generated/ProductCardData';
import { VehicleTypeEnum } from '../../../../generated/globalTypes';
import { useCarDerivativesData } from '../../../containers/OrdersInformation/gql';
import { useGenericPageHead } from '../../../gql/genericPage';
import { useVehicleListUrl } from '../../../gql/vehicleList';

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

const mocked: MockedResponse[] = [
  {
    request: {
      query: PRODUCT_CARD_CONTENT,
      variables: {
        type: VehicleTypeEnum.LCV,
        excludeBodyType: 'Pickup',
        size: 9,
        offer: true,
      },
    },
    result: () => {
      return {
        data: {
          productCarousel: [
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
        } as ProductCardData,
      };
    },
  },
  {
    request: {
      query: PRODUCT_CARD_CONTENT,
      variables: {
        type: VehicleTypeEnum.LCV,
        bodyType: 'Pickup',
        size: 9,
        offer: true,
      },
    },
    result: () => {
      return {
        data: {
          productCarousel: [
            {
              capId: '44514',
              isOnOffer: true,
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
        } as ProductCardData,
      };
    },
  },
  {
    request: {
      query: PRODUCT_CARD_CONTENT,
      variables: {
        type: VehicleTypeEnum.CAR,
        offer: true,
        size: 9,
      },
    },
    result: () => {
      return {
        data: {
          productCarousel: [
            {
              capId: '83615',
              isOnOffer: true,
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
        } as ProductCardData,
      };
    },
  },
];

describe('<OffersPage />', () => {
  beforeEach(async () => {
    (useVehicleListUrl as jest.Mock).mockReturnValue({
      loading: false,
      data: {
        vehicleList: {
          totalCount: 1,
          pageInfo: {
            startCursor: 'startCursor',
            endCursor: 'endCursor',
            hasNextPage: 'hasNextPage',
            hasPreviousPage: 'hasPreviousPage',
          },
          edges: [
            {
              cursor: 'cursor',
              node: {
                derivativeId: '44514',
                url: '/van-leasing/ford/focus/10-ecoBoost-125-st-line-nav-5dr',
                legacyUrl: null,
              },
            },
          ],
        },
      },
      error: undefined,
    });

    (useCarDerivativesData as jest.Mock).mockReturnValue({
      loading: false,
      data: {
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
        ],
        vehicleImages: [
          {
            vehicleType: VehicleTypeEnum.LCV,
            capId: 1212,
            mainImageUrl: 'mainImageUrl',
          },
        ],
      },
      error: undefined,
    });

    (useGenericPageHead as jest.Mock).mockReturnValue({
      loading: false,
      data: {
        genericPage: {
          id: 'id',
          intro: '',
          metaData: {
            canonicalUrl: 'https://www.vanarama.com/car-leasing.html',
            legacyUrl: 'https://www.vanarama.com/car-leasing.html',
            metaDescription:
              'Find unbeatable Car Leasing Deals at Vanarama. Get top personal & business lease offers on brand new, in-stock cars in every make and model. Save money and lease your dream car today.',
            metaRobots: 'all',
            name: 'HubCarPage',
            pageType: null,
            publishedOn: null,
            slug: 'hubcarpage',
            title:
              'Car Leasing Deals | Personal & Business Contract Hire | Vanarama',
            schema: null,
          },
          featuredImage: {
            title: '',
            description: '',
            file: {
              url: '',
              fileName: '',
              contentType: '',
            },
          },
        },
      },
    });

    await preloadAll();
    render(
      <MockedProvider addTypename={false} mocks={mocked}>
        <OffersPage />
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
