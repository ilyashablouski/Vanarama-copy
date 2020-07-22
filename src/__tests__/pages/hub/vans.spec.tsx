import React from 'react';
// @ts-ignore
import preloadAll from 'jest-next-dynamic';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import Router from 'next/router';
import { HubVanPageData } from '../../../../generated/HubVanPageData';
import { HUB_VAN_CONTENT } from '../../../gql/hubVanPage';
import { PRODUCT_CARD_CONTENT } from '../../../gql/productCard';
import { GET_SEARCH_POD_DATA } from '../../../containers/SearchPodContainer/gql';
import { VansPage } from '../../../pages/hub/vans';
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
      query: HUB_VAN_CONTENT,
    },
    result: {
      data: {
        hubVanPage: {
          id: '1sCJXpfTMcC11f2rob8qaJ',
          sections: {
            hero: {
              title: 'Best Van Lease Deals',
              body:
                'Brand New Vans, In Stock Delivered Fast and Free __From Just £115pm__',
              image: null,
            },
            leadText: {
              heading: 'Large Sales Heading',
              description:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio aspernatur fugiat. Lorem ipsum dolor sit amet consectetur adipisicing elit.',
            },
            featured1: {
              title: 'Van Leasing Deals UK',
              body:
                "If you're looking to drive a brand new car, van or truck without any of the hassle -",
              image: null,
            },
            featured2: {
              title: 'Why Choose Vanarama For Your Van?',
              body: 'Vanarama is more than just a broker or leasing company',
              image: null,
            },
            rowText: {
              heading: 'Not Sure How Van Leasing Works?',
              subHeading:
                'Everything you need to know is a click away in our easy to understand guide',
              body:
                'Leasing a van is really simple. You drive a brand new vehicle and pay fixed monthly rentals over 2-5 years',
            },
            cards: {
              name: 'What Type Of Van Do You Need?',
              description:
                "Choose from Small, Medium and Large vans, or Tippers/Lutons, Crew/Minibus, Pickups and Refrigerated Vans - whatever you need, we've got it.",
              cards: [
                {
                  title: 'Small Vans',
                  body: null,
                  image: {
                    file: {
                      url:
                        '//images.ctfassets.net/3xid768u5joa/7AJTJFhI12DvAWtWuT50U7/349cb17d71c3effb89841ed7f2161f76/CitroenBerlingo0718_4_xjonps.jpg',
                    },
                  },
                  link: {
                    url: '',
                    text: '',
                  },
                },
              ],
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
      } as HubVanPageData,
    },
  },
  {
    request: {
      query: GET_SEARCH_POD_DATA,
      variables: {
        vehicleTypes: [VehicleTypeEnum.LCV],
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
        type: VehicleTypeEnum.LCV,
        subType: 'SMALLVAN',
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
        subType: 'MEDIUMVAN',
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
        subType: 'LARGEVAN',
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
];

describe('<VansPage />', () => {
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
        <VansPage />
      </MockedProvider>,
    );
  });

  it('should successfully query all hub VansPage data', async () => {
    await waitFor(() => {
      expect(
        screen.getByText('Why Choose Vanarama For Your Van?'),
      ).toBeInTheDocument();
    });
  });

  it('should trigger route push when clicking deal of the month View Offer', async () => {
    await screen.findByTestId('deal-of-month__view-offer');
    fireEvent.click(screen.getByTestId('deal-of-month__view-offer'));
    await waitFor(() =>
      expect(Router.push).toHaveBeenCalledWith(
        '/van-leasing/[...manufacturer]',
        '/van-leasing/ford/focus/10-ecoBoost-125-st-line-nav-5dr',
      ),
    );
  });

  it('should trigger route push when clicking View Small Vans', async () => {
    await screen.findAllByText('View Small Vans');
    fireEvent.click(screen.getAllByText('View Small Vans')[0]);
    await waitFor(() =>
      expect(Router.push).toHaveBeenCalledWith(
        '/van-leasing?bodyStyles=Small+Van',
      ),
    );
  });

  it('should trigger route push when clicking View Medium Vans', async () => {
    await screen.findAllByText('View Small Vans');
    fireEvent.click(screen.getAllByText('View Medium Vans')[0]);
    await waitFor(() =>
      expect(Router.push).toHaveBeenCalledWith(
        '/van-leasing?bodyStyles=Medium+Van',
      ),
    );
  });

  it('should trigger route push when clicking View Large Vans', async () => {
    await screen.findAllByText('View Small Vans');
    fireEvent.click(screen.getAllByText('View Large Vans')[0]);
    await waitFor(() =>
      expect(Router.push).toHaveBeenCalledWith(
        '/van-leasing?bodyStyles=Large+Van',
      ),
    );
  });
});
