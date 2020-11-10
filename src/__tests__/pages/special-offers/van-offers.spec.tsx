import React from 'react';
// @ts-ignore
import preloadAll from 'jest-next-dynamic';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { render, screen, waitFor } from '@testing-library/react';
import { VAN_OFFERS_CONTENT } from '../../../gql/special-offers/van-offers';
import { PRODUCT_CARD_CONTENT } from '../../../gql/productCard';
import { ProductCardData } from '../../../../generated/ProductCardData';
import { useCarDerivativesData } from '../../../containers/OrdersInformation/gql';
import { VehicleTypeEnum } from '../../../../generated/globalTypes';
import { useVehicleListUrl } from '../../../gql/vehicleList';
import { VanOffers } from '../../../pages/van-leasing/special-offers';

jest.mock('../../../containers/OrdersInformation/gql');
jest.mock('../../../gql/vehicleList');
jest.mock('../../../hooks/useImperativeQuery');

jest.mock('next/router', () => ({
  push: jest.fn(),
  useRouter: () => ({
    asPath: '/',
  }),
}));

const mocked: MockedResponse[] = [
  {
    request: {
      query: VAN_OFFERS_CONTENT,
    },
    result: () => {
      return {
        data: {
          vanOffersPage: {
            id: '',
            body: 'van offers page mocked body',
            sections: {
              featured: {
                body: 'van offers page featured mocked body...',
              },
              iconBullets: {
                title: 'Best New Van Deals',
                iconBullets: [
                  {
                    text:
                      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
                  },
                ],
              },
            },
          },
        },
      };
    },
  },
  {
    request: {
      query: PRODUCT_CARD_CONTENT,
      variables: {
        type: VehicleTypeEnum.LCV,
        bodyType: 'SmallVan',
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
              manufacturerName: 'Volkswagen',
              derivativeName: '2.0 TDI BMT 102 Highline Kombi Van Euro 6',
              rangeName: 'Transporter',
              imageUrl:
                'https://images.autorama.co.uk/Photos/Cap/Vehicles/129783/cap-35088-129783.jpg',
              leadTime: 'Factory Order',
              averageRating: 4.8,
              businessRate: 219,
              personalRate: 278.98,
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
                  value: '189',
                },
                {
                  name: 'Fuel Economy',
                  value: '39.2',
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
        bodyType: 'MediumVan',
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
        bodyType: 'LargeVan',
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
              derivativeName: '2.2 BlueHDi H2 Van 140ps Enterprise',
              rangeName: 'Relay',
              imageUrl:
                'https://images.autorama.co.uk/Photos/Cap/Vehicles/162520/cap-44275-162520.jpg',
              leadTime: 'Factory Order',
              averageRating: 4.5,
              businessRate: 216.97,
              personalRate: 260.97,
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
                  value: '162',
                },
                {
                  name: 'Load Height',
                  value: '1932',
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
              manufacturerName: 'Citroen',
              derivativeName: '2.2 BlueHDi H2 Van 140ps Enterprise',
              rangeName: 'Relay',
              imageUrl: '',
              leadTime: 'Factory Order',
              averageRating: 4.5,
              businessRate: 216.97,
              personalRate: 260.97,
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
                  value: '162',
                },
                {
                  name: 'Load Height',
                  value: '1932',
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
        bodyType: 'Specialist',
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
              derivativeName: '2.2 BlueHDi H2 Van 140ps Enterprise',
              rangeName: 'Relay',
              imageUrl: '',
              leadTime: 'Factory Order',
              averageRating: 4.5,
              businessRate: 216.97,
              personalRate: 260.97,
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
                  value: '162',
                },
                {
                  name: 'Load Height',
                  value: '1932',
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
        bodyType: 'DropsideTipper',
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
              derivativeName: '2.2 BlueHDi H2 Van 140ps Enterprise',
              rangeName: 'Relay',
              imageUrl: '',
              leadTime: 'Factory Order',
              averageRating: 4.5,
              businessRate: 216.97,
              personalRate: 260.97,
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
                  value: '162',
                },
                {
                  name: 'Load Height',
                  value: '1932',
                },
              ],
              vehicleType: VehicleTypeEnum.LCV,
            },
          ],
        } as ProductCardData,
      };
    },
  },
];

xdescribe('<VanOffers />', () => {
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

    await preloadAll();

    render(
      <MockedProvider addTypename={false} mocks={mocked}>
        <VanOffers pageData />
      </MockedProvider>,
    );
  });

  it('should successfully query all VanOffers data', async () => {
    await waitFor(() => {
      expect(
        screen.getByText('2.0 TDI BMT 102 Highline Kombi Van Euro 6'),
      ).toBeInTheDocument();
    });
  });

  it('should have link in See All Small Vans', async () => {
    await screen.findAllByText('See All Small Vans');
    expect(screen.getByTestId('small-van-leasing')).toHaveAttribute(
      'href',
      '/small-van-leasing.html',
    );
  });

  it('should have link in See All Medium Vans', async () => {
    await screen.findAllByText('See All Medium Vans');
    expect(screen.getByTestId('medium-van-leasing')).toHaveAttribute(
      'href',
      '/medium-van-leasing.html',
    );
  });

  it('should have link in See All Large Vans', async () => {
    await screen.findAllByText('See All Large Vans');
    expect(screen.getByTestId('large-van-leasing')).toHaveAttribute(
      'href',
      '/large-van-leasing.html',
    );
  });

  it('should have link in See All Specialist Vans', async () => {
    await screen.findAllByText('See All Specialist Vans');
    expect(screen.getByTestId('crew-vans')).toHaveAttribute(
      'href',
      '/crew-vans.html',
    );
  });
});
