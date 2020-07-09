import React from 'react';
// @ts-ignore
import preloadAll from 'jest-next-dynamic';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { render, screen, waitFor } from '@testing-library/react';
import { HomePageData } from '../../../generated/HomePageData';
import { ALL_HOME_CONTENT } from '../../gql/homepage';
import { PRODUCT_CARD_CONTENT } from '../../gql/productCard';
import { GET_SEARCH_POD_DATA } from '../../containers/SearchPodContainer/gql';
import { HomePage } from '../../pages';
import { mockSearchPodResponse } from '../../../__mocks__/searchpod';
import { ProductCardData } from '../../../generated/ProductCardData';

/**
 * NOTE: Mock the SearchPodContainer as it is out of scope for this test and is doing state
 * updates after the test has finished.
 */
jest.mock('../../containers/SearchPodContainer', () => () => {
  return <div />;
});

describe('<HomePage />', () => {
  it('should successfully query all homepage data', async () => {
    const mocked: MockedResponse[] = [
      {
        request: {
          query: ALL_HOME_CONTENT,
        },
        result: {
          data: {
            homePage: {
              id: '42LjdTY9hSi2YdVi4aEsuO',
              sections: {
                hero: {
                  title: 'The Vehicle Leasing Experts',
                  body:
                    'Brand New Cars, In Stock Delivered Fast and Free __From Just £115pm__',
                  image: null,
                },
                leadText: {
                  heading: 'Large Sales Heading!',
                  description:
                    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio aspernatur fugiat. Lorem ipsum dolor sit amet consectetur adipisicing elit.',
                },
                cards: {
                  name: 'Product Categories',
                  cards: [
                    {
                      title: null,
                      body: null,
                      image: {
                        file: {
                          url:
                            '//images.ctfassets.net/3xid768u5joa/7AJTJFhI12DvAWtWuT50U7/349cb17d71c3effb89841ed7f2161f76/CitroenBerlingo0718_4_xjonps.jpg',
                        },
                      },
                      link: {
                        url: '#',
                        text: 'Search Vans',
                      },
                    },
                  ],
                },
                featured1: {
                  title: 'Why Leasing?',
                  body: "If you're looking to drive a brand new car..",
                },
                featured2: {
                  title: 'What Makes Us The Lease Experts?',
                  body: 'Vanarama is more than just..',
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
                  ],
                },
              },
            },
          } as HomePageData,
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
            type: 'LCV',
            subType: 'VAN',
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
            type: 'CAR',
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
            type: 'LCV',
            subType: 'PICKUP',
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
                },
              ],
            } as ProductCardData,
          };
        },
      },
    ];

    await preloadAll();

    render(
      <MockedProvider addTypename={false} mocks={mocked}>
        <HomePage />
      </MockedProvider>,
    );

    await waitFor(() => {
      expect(
        screen.getByText('The Vehicle Leasing Experts'),
      ).toBeInTheDocument();
      expect(screen.getByText('Why Leasing?')).toBeInTheDocument();
    });
  });
});
