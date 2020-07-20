import React from 'react';
import Router from 'next/router';
// @ts-ignore
import preloadAll from 'jest-next-dynamic';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { HubCarPageData } from '../../../../generated/HubCarPageData';
import { HUB_CAR_CONTENT } from '../../../gql/hubCarPage';
import { PRODUCT_CARD_CONTENT } from '../../../gql/productCard';
import { GET_SEARCH_POD_DATA } from '../../../containers/SearchPodContainer/gql';
import { CarsPage } from '../../../pages/hub/cars';
import { mockSearchPodResponse } from '../../../../__mocks__/searchpod';
import { ProductCardData } from '../../../../generated/ProductCardData';
import { useCarDerivativesData } from '../../../containers/OrdersInformation/gql';
import { VehicleTypeEnum } from '../../../../generated/globalTypes';

/**
 * NOTE: Mock the SearchPodContainer as it is out of scope for this test and is doing state
 * updates after the test has finished.
 */
jest.mock('../../../containers/SearchPodContainer', () => () => {
  return <div />;
});
jest.mock('../../../containers/OrdersInformation/gql');

jest.mock('next/router', () => ({ push: jest.fn() }));

const mocked: MockedResponse[] = [
  {
    request: {
      query: HUB_CAR_CONTENT,
    },
    result: {
      data: {
        hubCarPage: {
          id: '6lae4EttQxsYLqZpTIh2kS',
          sections: {
            hero: {
              title: 'Best Car Lease Deals',
              body:
                'Brand New Cars, In Stock Delivered Fast and Free __From Just £115pm__',
              image: null,
            },
            leadText: {
              heading: 'Large Sales Heading',
              description:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio aspernatur fugiat.',
            },
            featured1: {
              title: 'Car Leasing with Vanarama?',
              body:
                'Leasing your brand new car with Vanarama means you can drive the car of your dreams at a price you can afford',
              image: null,
            },
            featured2: {
              title: 'How Does Car Leasing Work?',
              body:
                'Personal car leasing works very much like renting, but for a longer time period.',
              image: null,
            },
            steps: {
              heading: 'Leasing - The Simple Way To Get Your Brand New Vehicle',
              steps: [
                {
                  title: 'Check',
                  body:
                    'See if you’re eligible to lease without affecting your credit score by using our quick & easy Eligibility Checker.',
                },
                {
                  title: 'Choose',
                  body:
                    'Get the car you want from our range of manufacturers - from something sporty to something for all the family.',
                },
                {
                  title: 'Apply',
                  body:
                    "To lease your new car, we'll just need a few details to apply for finance from one of our funding partners.",
                },
                {
                  title: 'Drive',
                  body:
                    'And that’s it - once you’ve been approved, your brand new car will be delivered direct to your door.',
                },
              ],
            },
            tiles: {
              name: 'Tiles',
              tiles: [
                {
                  title: 'Price Protection',
                  body:
                    'Pretium facilisi etiam pretium, cras interdum enim, nullam.',
                  image: null,
                },
                {
                  title: 'Customer Reviews',
                  body:
                    'Pretium facilisi etiam pretium, cras interdum enim, nullam.',
                  image: null,
                },
                {
                  title: 'Quote Online',
                  body:
                    'Pretium facilisi etiam pretium, cras interdum enim, nullam.',
                  image: null,
                },
                {
                  title: 'Confused About Leasing?',
                  body:
                    'Pretium facilisi etiam pretium, cras interdum enim, nullam.',
                  image: null,
                },
              ],
            },
          },
        },
      } as HubCarPageData,
    },
  },
  {
    request: {
      query: GET_SEARCH_POD_DATA,
      variables: {
        vehicleTypes: ['LCV'],
      },
    },
    result: () => {
      return {
        data: {
          ...mockSearchPodResponse,
        },
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

describe('<CarPage />', () => {
  beforeEach(async () => {
    (useCarDerivativesData as jest.Mock).mockReturnValue({
      loading: false,
      data: {
        derivatives: [
          {
            id: '83615',
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
            vehicleType: VehicleTypeEnum.CAR,
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
        <CarsPage />
      </MockedProvider>,
    );
  });

  it('should successfully query all hub CarsPage data', async () => {
    await waitFor(() => {
      expect(
        screen.getByText('Car Leasing with Vanarama?'),
      ).toBeInTheDocument();
    });
  });

  it('should trigger route push when clicking View All Cars', async () => {
    await screen.findByText('View All Cars');
    fireEvent.click(screen.getByText('View All Cars'));
    await waitFor(() =>
      expect(Router.push).toHaveBeenCalledWith('/car-leasing'),
    );
  });

  it('should trigger router push when clicking product View Offer', async () => {
    await screen.findAllByText('View Offer');
    fireEvent.click(screen.getAllByText('View Offer')[0]);
    await waitFor(() =>
      expect(Router.push).toHaveBeenCalledWith(
        '/car-leasing/[...manufacturer]',
        '/car-leasing/ford/focus/hatchback/10-ecoBoost-125-st-line-nav-5dr',
      ),
    );
  });
});
