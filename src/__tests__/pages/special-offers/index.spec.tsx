import React from 'react';
// @ts-ignore
import preloadAll from 'jest-next-dynamic';
import Router from 'next/router';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { PRODUCT_CARD_CONTENT } from '../../../gql/productCard';
import { OffersPage } from '../../../pages/special-offers';
import { ProductCardData } from '../../../../generated/ProductCardData';
import { VehicleTypeEnum } from '../../../../generated/globalTypes';
import { useCarDerivativesData } from '../../../containers/OrdersInformation/gql';


jest.mock('../../containers/OrdersInformation/gql');

jest.mock('next/router', () => ({ push: jest.fn() }));

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
];

describe('<OffersPage />', () => {
  beforeEach(async () => {
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

  it('should trigger router push to with correct van details path  ', async () => {
    await screen.findByTestId('van-view-offer');
    fireEvent.click(screen.getByTestId('van-view-offer'));
    await waitFor(() =>
      expect(Router.push).toHaveBeenCalledWith('/van-leasing'),
    );
  });

  it('should trigger router push to with correct pickup details path  ', async () => {
    await screen.findByTestId('pickup-view-offer');
    fireEvent.click(screen.getByTestId('pickup-view-offer'));
    await waitFor(() =>
      expect(Router.push).toHaveBeenCalledWith(
        '/van-leasing?bodyStyles=Pickup',
      ),
    );
  });

  it('should trigger router push to with correct car details path  ', async () => {
    await screen.findByTestId('car-view-offer');
    fireEvent.click(screen.getByTestId('car-view-offer'));
    await waitFor(() =>
      expect(Router.push).toHaveBeenCalledWith('/car-leasing'),
    );
  });
});
