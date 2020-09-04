import React from 'react';
import Router from 'next/router';
// @ts-ignore
import preloadAll from 'jest-next-dynamic';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { HubCarPageData } from '../../../../generated/HubCarPageData';
import { HUB_CAR_CONTENT } from '../../../gql/hub/hubCarPage';
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

jest.mock('next/router', () => ({
  push: jest.fn(),
  useRouter() {
    return {
      asPath: '/hub/cars',
      query: {
        score: 75,
      },
    };
  },
}));

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
              titleTag: 'h2',
              body:
                'Brand New Cars, In Stock Delivered Fast and Free __From Just £115pm__',
              image: null,
            },
            leadText: {
              heading: 'Best Car Lease Deals In The UK',
              titleTag: 'h1',
              description:
                'Upgrade To A Brand New Car Today From As Little As £129pm',
            },
            featured1: {
              title: 'Why Lease A Car?',
              titleTag: 'h2',
              body:
                "Leasing your brand new car with Vanarama means you can drive the car of your dreams at a price you can afford. And you can upgrade to a new one every few years!\n\nWhether you're looking for your first car, a family car, or a brand new car for your business, we have a massive range of the latest models from all manufacturers.\n\nOnce you've found your ideal car, we'll get you the best deal from our panel of over 10 funders. We get the best deals around because of our buying power. Your new car will be delivered to your door... and you get to enjoy it until it's time to upgrade.\n\nWe're a leasing company, and since 2004 we've leased vehicles to hundreds of thousands of personal and business customers. Our 5* customer service team will ensure you get what you need from enquiry right through to delivery.",
              image: null,
              layout: [''],
            },
            featured2: {
              title: 'How Does Car Leasing Work?',
              titleTag: 'h2',
              body:
                "Personal car leasing works very much like renting, but for a longer time period. You choose your new car, the contract length, how much you'd like your initial rental to be and how many miles you'll drive over the period. At the end of your lease agreement, you return the car & upgrade.\n\nDon't worry about excess mileage and damage charges at the end of your lease, because we have a Mileage Booster which gives you [10% free mileage](https://beta.vanarama.com/car-leasing/mileage-booster-and-damage-cover.html) and up to [£500 Damage Cover.](https://beta.vanarama.com/car-leasing/mileage-booster-and-damage-cover.html)\n\nFor more information take a look at Car Leasing Explained for everything you need to know, including:\n\n-   [How does car leasing work?](https://beta.vanarama.com/car-leasing-explained.html)\n-   [What is fair wear and tear?](https://beta.vanarama.com/car-leasing-explained/lease-car-fair-wear-and-tear.html)\n-   [What happens at the end of a lease?](https://beta.vanarama.com/car-leasing-explained/what-happens-at-end-of-car-lease.html)",
              image: null,
              layout: [''],
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
              name: 'Benefits Grid',
              titleTag: 'h2',
              tilesTitle: 'Why Lease With Vanarama',
              tiles: [
                {
                  title: 'Price Promise',
                  link: null,
                  body:
                    "You won't find this with any of our competitors. Honest pricing & nothing hidden.",
                  image: {
                    file: {
                      url:
                        '//images.ctfassets.net/3xid768u5joa/1ZIIHCFIqBIVkse5D80ymR/59d962d5cf10c6f689c847ddab436218/price-promise.jpg',
                    },
                    title: 'price-promise',
                  },
                },
                {
                  title: 'Customer Reviews',
                  link: null,
                  body:
                    'We love our customers and our customers love us, 96% of them would recommend us.',
                  image: {
                    file: {
                      url:
                        '//images.ctfassets.net/3xid768u5joa/27vSXvAmh2dn3wh58xoJkP/368c1854210afeaa24f0700fc7c509fc/Icon-Contract-RGB_Contract-Colour-400px-RGB.png',
                    },
                    title: 'Smiths-Vanarama-Deal',
                  },
                },
                {
                  title: 'Quote Online',
                  link: null,
                  body: 'Get your quote in seconds with iVan.',
                  image: {
                    file: {
                      url:
                        '//images.ctfassets.net/3xid768u5joa/3KhuHOZWIeppLEsCTcouiY/a384211adc3f246728f3c5fd9d8cf637/Insurance-Icon.png',
                    },
                    title: 'Insurance-Icon',
                  },
                },
                {
                  title: 'Confused About Leasing?',
                  link: null,
                  body: 'Everything you need to know is a click away.',
                  image: {
                    file: {
                      url:
                        '//images.ctfassets.net/3xid768u5joa/3a609lEJL2WBF9fBG9V6N6/9bbcee8eba6f7deecfbbab92582283e2/Fleet-Icon.png',
                    },
                    title: 'Fleet-Icon',
                  },
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
    result: {
      data: {
        ...mockSearchPodResponse,
      },
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
    result: {
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
      expect(screen.getByText('Check My Eligibility')).toBeInTheDocument();
    });
  });

  it('should trigger route push when clicking View All Cars', async () => {
    await screen.findByText('View All Cars');
    fireEvent.click(screen.getByText('View All Cars'));
    await waitFor(() =>
      expect(Router.push).toHaveBeenCalledWith('/car-leasing'),
    );
  });

  it('should trigger route push when clicking Here', async () => {
    await screen.findByText('View All Cars');
    fireEvent.click(screen.getByText('Here'));
    await waitFor(() => expect(Router.push).toHaveBeenCalledWith('/fan-hub'));
  });

  it('should trigger router push when clicking product View Offer', async () => {
    await screen.findAllByText('View Offer');
    fireEvent.click(screen.getAllByText('View Offer')[0]);
    await waitFor(() =>
      expect(Router.push).toHaveBeenCalledWith(
        '/car-leasing/[...details-page]',
        '/car-leasing/ford/focus/hatchback/10-ecoBoost-125-st-line-nav-5dr',
      ),
    );
  });
});
