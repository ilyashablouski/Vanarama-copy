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
              titleTag: 'h2',
              body:
                'Brand New Vans, In Stock Delivered Fast and Free __From Just £115pm__',
              image: null,
            },
            leadText: {
              heading: 'Best Van Leasing Deals In The UK',
              titleTag: 'h1',
              description: 'Brand New Vans, Delivered Free From Just £115pm',
            },
            featured1: {
              title: 'Why Lease A Van?',
              titleTag: 'h2',
              body:
                "At Vanarama you'll find some of the best van lease deals in the UK. So if you're looking to get your business moving with a brand new van, you're in the right place!\n\nWhether you're after a [small van](https://beta.vanarama.com/small-van-leasing.html), a [medium van](https://beta.vanarama.com/medium-van-leasing.html) perfect for trades or even a [specialist vehicle](https://beta.vanarama.com/specialist-van-leasing.html), we have a huge range of brand new vehicles available from the major manufacturers whatever the model and size you're looking for.\n\nOur massive range of light commercial vehicles in varying sizes, engine types and flexible payloads are available for contract hire on a range of lease lengths too, so you can choose from 2,3, 4 or 5 years. Plus we'll deliver direct to your door anywhere in the UK.",
              image: null,
            },
            featured2: {
              title: 'Why Choose Vanarama For Your Van?',
              titleTag: 'h2',
              body:
                "Vanarama have been business van leasing specialists for over 15 years. Our enhanced buying power from working with those manufacturers and a large panel of funders, allows us to get you an unbeatable lease price! That's why we introduced our Price Promise\\* so if we can't find you the most competitive quote on the vehicle you want, we'll give you £100\\*.\n\nOur dedicated team of experts can help you find the perfect van lease deal. The major benefits of leasing a van with Vanarama are:\n\n-   **Affordable, fixed monthly costs.**\n-   **Brand-new vehicles with zero mileage.**\n-   **3-year manufacturer warranty and MOT included.**\n-   **Price Promise guarantee.**\n-   **Flexible mileage options.**",
              image: null,
            },
            rowText: {
              heading: 'How Does Van Leasing Work?',
              titleTag: 'h2',
              subHeading:
                'Everything you need to know is a click away in our easy to understand guide',
              body:
                'Leasing a van is really simple. You drive a brand new vehicle and pay fixed monthly rentals over 2-5 years after paying an initial rental at the start of your contract. At the end of your agreement, you simply hand the van back and choose which vehicle to upgrade to.\n\n[View Leasing Guides](https://beta.vanarama.com/van-leasing-explained.html)',
            },
            cards: {
              name: ' What Type Of Van Do You Need?',
              titleTag: 'h2',
              description:
                "Choose from Small, Medium and Large vans, or Tippers/Lutons, Crew/Minibus, Pickups and Refrigerated Vans - whatever you need, we've got it.",
              cards: [
                {
                  title: 'Small Vans',
                  titleTag: 'h3',
                  body:
                    'Wider & longer than a car with a surprisingly large load space',
                  image: {
                    file: {
                      url:
                        '//images.ctfassets.net/3xid768u5joa/7AJTJFhI12DvAWtWuT50U7/349cb17d71c3effb89841ed7f2161f76/CitroenBerlingo0718_4_xjonps.jpg',
                    },
                  },
                  link: {
                    url: 'https://beta.vanarama.com/small-van-leasing.html',
                    text: 'Small Vans',
                  },
                },
                {
                  title: 'Medium Vans',
                  titleTag: 'h3',
                  body:
                    'The most popular size of van on UK roads, trades people love them',
                  image: {
                    file: {
                      url:
                        '//images.ctfassets.net/3xid768u5joa/7AJTJFhI12DvAWtWuT50U7/349cb17d71c3effb89841ed7f2161f76/CitroenBerlingo0718_4_xjonps.jpg',
                    },
                  },
                  link: {
                    url: 'https://beta.vanarama.com/medium-van-leasing.html',
                    text: 'Medium Vans',
                  },
                },
                {
                  title: 'Large Vans',
                  titleTag: 'h3',
                  body:
                    'The biggest vans around, large vans can carry large & heavy loads',
                  image: {
                    file: {
                      url:
                        '//images.ctfassets.net/3xid768u5joa/7AJTJFhI12DvAWtWuT50U7/349cb17d71c3effb89841ed7f2161f76/CitroenBerlingo0718_4_xjonps.jpg',
                    },
                  },
                  link: {
                    url: 'https://beta.vanarama.com/large-van-leasing.html',
                    text: 'Large Vans',
                  },
                },
                {
                  title: 'Pickup Trucks',
                  titleTag: 'h3',
                  body:
                    'Car-like comfort, off-road capability & heavy load carrying',
                  image: {
                    file: {
                      url:
                        '//images.ctfassets.net/3xid768u5joa/7AJTJFhI12DvAWtWuT50U7/349cb17d71c3effb89841ed7f2161f76/CitroenBerlingo0718_4_xjonps.jpg',
                    },
                  },
                  link: {
                    url: 'https://beta.vanarama.com/pickup-truck-leasing.html',
                    text: 'Pickup Trucks',
                  },
                },
                {
                  title: 'Tippers/Lutons',
                  titleTag: 'h3',
                  body:
                    'Trucks with tippable backs & trucks with massive storage',
                  image: {
                    file: {
                      url:
                        '//images.ctfassets.net/3xid768u5joa/7AJTJFhI12DvAWtWuT50U7/349cb17d71c3effb89841ed7f2161f76/CitroenBerlingo0718_4_xjonps.jpg',
                    },
                  },
                  link: {
                    url:
                      'https://beta.vanarama.com/dropside-tipper-leasing.html',
                    text: 'Tippers/Lutons',
                  },
                },
                {
                  title: 'Minibus/Crew',
                  titleTag: 'h3',
                  body:
                    'Versatility for businesses who need to move both loads and people',
                  image: {
                    file: {
                      url:
                        '//images.ctfassets.net/3xid768u5joa/7AJTJFhI12DvAWtWuT50U7/349cb17d71c3effb89841ed7f2161f76/CitroenBerlingo0718_4_xjonps.jpg',
                    },
                  },
                  link: {
                    url: 'https://beta.vanarama.com/crew-vans.html',
                    text: 'Minibus/Crew Vans',
                  },
                },
                {
                  title: 'Refrigerated Vans',
                  titleTag: 'h3',
                  body:
                    'Temperature-controlled vans ideal for safely transporting foodstuff',
                  image: {
                    file: {
                      url:
                        '//images.ctfassets.net/3xid768u5joa/7AJTJFhI12DvAWtWuT50U7/349cb17d71c3effb89841ed7f2161f76/CitroenBerlingo0718_4_xjonps.jpg',
                    },
                  },
                  link: {
                    url:
                      'https://beta.vanarama.com/refrigerated-van-leasing.html',
                    text: 'Refrigerated Vans',
                  },
                },
                {
                  title: 'Automatic Vans',
                  titleTag: 'h3',
                  body:
                    'Automatic transmission makes driving your van effortless ',
                  image: {
                    file: {
                      url:
                        '//images.ctfassets.net/3xid768u5joa/7AJTJFhI12DvAWtWuT50U7/349cb17d71c3effb89841ed7f2161f76/CitroenBerlingo0718_4_xjonps.jpg',
                    },
                  },
                  link: {
                    url: 'https://beta.vanarama.com/automatic-vans.html',
                    text: 'Automatic Vans',
                  },
                },
              ],
            },
            steps: {
              heading: 'Leasing - The Simple Way To Get Your Brand New Vehicle',
              titleTag: 'h2',
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
        bodyType: 'SmallVan',
        size: 9,
        offer: true,
      },
    },
    result: {
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
    result: {
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
    result: {
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
    await screen.findAllByText('View Medium Vans');
    fireEvent.click(screen.getAllByText('View Medium Vans')[0]);
    await waitFor(() =>
      expect(Router.push).toHaveBeenCalledWith(
        '/van-leasing?bodyStyles=Medium+Van',
      ),
    );
  });

  it('should trigger route push when clicking View Large Vans', async () => {
    await screen.findAllByText('View Large Vans');
    fireEvent.click(screen.getAllByText('View Large Vans')[0]);
    await waitFor(() =>
      expect(Router.push).toHaveBeenCalledWith(
        '/van-leasing?bodyStyles=Large+Van',
      ),
    );
  });
});
