import React from 'react';
// @ts-ignore
import preloadAll from 'jest-next-dynamic';
import { ImageProps } from 'next/image';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { render, screen, waitFor } from '@testing-library/react';
import { HomePageData } from '../../../generated/HomePageData';
import { ALL_HOME_CONTENT } from '../../gql/homepage';
import { PRODUCT_CARD_CONTENT } from '../../gql/productCard';
import { GET_SEARCH_POD_DATA } from '../../containers/SearchPodContainer/gql';
import { HomePage } from '../../pages';
import { mockSearchPodResponse } from '../../../__mocks__/searchpod';
import { ProductCardData } from '../../../generated/ProductCardData';
import { VehicleTypeEnum } from '../../../generated/globalTypes';
import { useCarDerivativesData } from '../../containers/OrdersInformation/gql';
import { VehicleListUrl_vehicleList as IVehicleList } from '../../../generated/VehicleListUrl';
import { OnOffer } from '../../../entities/global';

/**
 * NOTE: Mock the SearchPodContainer as it is out of scope for this test and is doing state
 * updates after the test has finished.
 */
jest.mock('../../containers/SearchPodContainer', () => () => {
  return <div />;
});
jest.mock('../../containers/OrdersInformation/gql');
jest.mock('../../gql/vehicleList');

jest.mock('next/image', () => ({ src, alt }: ImageProps) => (
  <img src={src.toString()} alt={alt} />
));
jest.mock('next/router', () => ({
  push: jest.fn(),
  useRouter: () => ({
    asPath: '/',
  }),
}));

const homePageData = {
  request: {
    query: ALL_HOME_CONTENT,
  },
  result: {
    data: {
      homePage: {
        id: '42LjdTY9hSi2YdVi4aEsuO',
        featuredImage: {
          file: {
            url:
              '//images.ctfassets.net/3xid768u5joa/3l6qcngNheEgG7dUdXqe5m/2a612809813bb4eb25738fc4690adbd4/placeholder-16-9.jpg',
            details: {
              image: {
                width: 1600,
                height: 900,
              },
            },
          },
        },
        metaData: {
          title: 'Vehicle Leasing | Personal & Business Lease',
          metaRobots: 'all',
          metaDescription: null,
          publishedOn: '2020-08-02',
          legacyUrl: 'https://www.vanarama.com/',
        },
        sections: {
          hero: {
            title: 'The Vehicle Leasing Experts',
            titleTag: 'h2',
            body:
              'Brand New Cars, In Stock Delivered Fast and Free From Just £115pm',
            image: {
              title: 'hero-placeholder-home',
              file: {
                url:
                  '//images.ctfassets.net/3xid768u5joa/019f3SEZOZmrp4IAj7bS2a/9d737a81502fac89dc0276fbda8e6a2b/hero-placeholder.png',
                details: {
                  image: {
                    width: 100,
                    height: 100,
                  },
                },
              },
            },
          },
          leadText: {
            heading: 'Best Vehicle Lease Deals In The UK',
            titleTag: 'h1',
            description:
              'Upgrade To A Brand New Vehicle Today From As Little As £115pm',
          },
          cards: {
            name: 'Product Categories',
            cards: [
              {
                title: null,
                titleTag: 'h2',
                body:
                  'Find the perfect van lease for your business with a huge range of brand new, in-stock commercial vehicles to choose from at unbeatable prices.\n',
                image: {
                  file: {
                    url:
                      '//images.ctfassets.net/3xid768u5joa/7AJTJFhI12DvAWtWuT50U7/349cb17d71c3effb89841ed7f2161f76/CitroenBerlingo0718_4_xjonps.jpg',
                  },
                },
                link: {
                  url:
                    'https://next-storefront.grid.test.autorama.co.uk/hub/vans',
                  text: 'Van Leasing',
                },
              },
              {
                title: null,
                titleTag: 'h2',
                body:
                  'Choose your next brand new pickup truck from our massive range of cutting-edge models from all the biggest manufacturers.\n',
                image: {
                  file: {
                    url:
                      '//images.ctfassets.net/3xid768u5joa/2jt1VrkpXerFKA6V5j3AMG/a1dd09eed5c3e144c7de6e4fd8c833ca/BMWX70419_4_bvxdvu.jpg',
                  },
                },
                link: {
                  url:
                    'https://next-storefront.grid.test.autorama.co.uk/hub/pickups',
                  text: 'Pickup Truck Leasing',
                },
              },
              {
                title: 'Car Leasing',
                titleTag: 'h2',
                body:
                  'Drive a brand new car with affordable monthly payments. We offer superb business & personal contract hire deals on a range of lease cars.\n',
                image: {
                  file: {
                    url:
                      '//images.ctfassets.net/3xid768u5joa/2QbzKD75ObIHIeVMzNeCF/1455166780ba4eb095c965e278a63b69/AudiQ30718_4_k5ojqt.jpg',
                  },
                },
                link: {
                  url:
                    'https://next-storefront.grid.test.autorama.co.uk/hub/cars',
                  text: 'car-leasing',
                },
              },
            ],
          },
          featured1: {
            title: 'Why Leasing?',
            titleTag: 'h2',
            body:
              "If you're looking to drive a brand new car, van or truck without any of the hassle - leasing might just be for you! It's affordable, simple and you're not left with a depreciating asset at the end of your contract.",
            layout: [''],
            iconList: [
              {
                text: 'ooo',
              },
            ],
          },
          featured2: {
            title: 'What Makes Us The Lease Experts?',
            titleTag: 'h2',
            body:
              "Vanarama is more than just a broker or leasing company, we've been leading the market and putting our customers at the heart of everything we do for more than a decade.\n\nAfter 15 years of experience in business & personal van, pickup and car leasing, we're still pushing the industry forward & our vast buying power gives us access to a range of vehicles and lease deal pricing you can't get anywhere else.",
            layout: [''],
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
    } as HomePageData,
  },
};
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
        vehicleType: VehicleTypeEnum.CAR,
        derivativeId: '44514',
        url: 'url',
        legacyUrl: 'legacyUrl',
      },
    },
  ],
};

const mocked: MockedResponse[] = [
  homePageData,
  {
    request: {
      query: ALL_HOME_CONTENT,
    },
    result: {
      data: {
        homePage: {
          id: '42LjdTY9hSi2YdVi4aEsuO',
          featuredImage: {
            file: {
              url:
                '//images.ctfassets.net/3xid768u5joa/3l6qcngNheEgG7dUdXqe5m/2a612809813bb4eb25738fc4690adbd4/placeholder-16-9.jpg',
              details: {
                image: {
                  width: 1600,
                  height: 900,
                },
              },
            },
          },
          metaData: {
            title: 'Vehicle Leasing | Personal & Business Lease',
            metaRobots: 'all',
            metaDescription: null,
            publishedOn: '2020-08-02',
            legacyUrl: 'https://www.vanarama.com/',
          },
          sections: {
            hero: {
              title: 'The Vehicle Leasing Experts',
              titleTag: 'h2',
              body:
                'Brand New Cars, In Stock Delivered Fast and Free From Just £115pm',
              image: {
                title: 'hero-placeholder-home',
                file: {
                  url:
                    '//images.ctfassets.net/3xid768u5joa/019f3SEZOZmrp4IAj7bS2a/9d737a81502fac89dc0276fbda8e6a2b/hero-placeholder.png',
                },
              },
            },
            leadText: {
              heading: 'Best Vehicle Lease Deals In The UK',
              titleTag: 'h1',
              description:
                'Upgrade To A Brand New Vehicle Today From As Little As £115pm',
            },
            cards: {
              name: 'Product Categories',
              cards: [
                {
                  title: null,
                  titleTag: 'h2',
                  body:
                    'Find the perfect van lease for your business with a huge range of brand new, in-stock commercial vehicles to choose from at unbeatable prices.\n',
                  image: {
                    file: {
                      url:
                        '//images.ctfassets.net/3xid768u5joa/7AJTJFhI12DvAWtWuT50U7/349cb17d71c3effb89841ed7f2161f76/CitroenBerlingo0718_4_xjonps.jpg',
                    },
                  },
                  link: {
                    url:
                      'https://next-storefront.grid.test.autorama.co.uk/hub/vans',
                    text: 'Van Leasing',
                  },
                },
                {
                  title: null,
                  titleTag: 'h2',
                  body:
                    'Choose your next brand new pickup truck from our massive range of cutting-edge models from all the biggest manufacturers.\n',
                  image: {
                    file: {
                      url:
                        '//images.ctfassets.net/3xid768u5joa/2jt1VrkpXerFKA6V5j3AMG/a1dd09eed5c3e144c7de6e4fd8c833ca/BMWX70419_4_bvxdvu.jpg',
                    },
                  },
                  link: {
                    url:
                      'https://next-storefront.grid.test.autorama.co.uk/hub/pickups',
                    text: 'Pickup Truck Leasing',
                  },
                },
                {
                  title: 'Car Leasing',
                  titleTag: 'h2',
                  body:
                    'Drive a brand new car with affordable monthly payments. We offer superb business & personal contract hire deals on a range of lease cars.\n',
                  image: {
                    file: {
                      url:
                        '//images.ctfassets.net/3xid768u5joa/2QbzKD75ObIHIeVMzNeCF/1455166780ba4eb095c965e278a63b69/AudiQ30718_4_k5ojqt.jpg',
                    },
                  },
                  link: {
                    url:
                      'https://next-storefront.grid.test.autorama.co.uk/hub/cars',
                    text: 'car-leasing',
                  },
                },
              ],
            },
            featured1: {
              title: 'Why Leasing?',
              titleTag: 'h2',
              body:
                "If you're looking to drive a brand new car, van or truck without any of the hassle - leasing might just be for you! It's affordable, simple and you're not left with a depreciating asset at the end of your contract.",
              layout: [''],
              iconList: [
                {
                  text: 'ooo',
                },
              ],
            },
            featured2: {
              title: 'What Makes Us The Lease Experts?',
              titleTag: 'h2',
              body:
                "Vanarama is more than just a broker or leasing company, we've been leading the market and putting our customers at the heart of everything we do for more than a decade.\n\nAfter 15 years of experience in business & personal van, pickup and car leasing, we're still pushing the industry forward & our vast buying power gives us access to a range of vehicles and lease deal pricing you can't get anywhere else.",
              layout: [''],
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
      } as HomePageData,
    },
  },
  {
    request: {
      query: GET_SEARCH_POD_DATA,
      variables: {
        vehicleTypes: [VehicleTypeEnum.LCV],
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
        type: VehicleTypeEnum.LCV,
        excludeBodyType: 'Pickup',
        size: 9,
        offer: true,
      },
    },
    result: {
      data: {
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
      } as ProductCardData,
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
      } as ProductCardData,
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
    result: {
      data: {
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
      } as ProductCardData,
    },
  },
];

describe('<HomePage />', () => {
  beforeEach(async () => {
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

    (useCarDerivativesData as jest.Mock).mockReturnValue({
      loading: false,
      data: {
        ...derivatives,
      },
      error: undefined,
    });

    await preloadAll();
    render(
      <MockedProvider addTypename={false} mocks={mocked}>
        <HomePage
          data={homePageData.result.data}
          productsVanDerivatives={derivatives}
          productsCarDerivatives={derivatives}
          productsPickupDerivatives={derivatives}
          productsCar={productsCar}
          productsPickup={productsPickup}
          productsVan={productsVan}
          vehicleListUrlData={vehicleListUrl}
        />
      </MockedProvider>,
    );
  });

  it('should successfully query homepage data', async () => {
    await waitFor(() => {
      expect(
        screen.getByText('What Makes Us The Lease Experts?'),
      ).toBeInTheDocument();
      expect(screen.getByText('Why Leasing?')).toBeInTheDocument();
    });
  });

  it('should have correct link in van details path  ', async () => {
    await screen.findByTestId('view-all-vans');
    expect(screen.getByTestId('view-all-vans')).toHaveAttribute(
      'href',
      '/special-offers.html',
    );
  });

  it('should have correct link in pickup details path  ', async () => {
    await screen.findByTestId('view-all-pickups');
    expect(screen.getByTestId('view-all-pickups')).toHaveAttribute(
      'href',
      '/pickup-special-offers.html',
    );
  });

  it('should have correct link in Here path', async () => {
    expect(screen.getByText('Here')).toHaveAttribute('href', '/fan-hub.html');
  });

  it('should have correct link in car details path  ', async () => {
    await screen.findByTestId('view-all-cars');
    expect(screen.getByTestId('view-all-cars')).toHaveAttribute(
      'href',
      '/car-leasing-special-offers.html',
    );
  });
});
