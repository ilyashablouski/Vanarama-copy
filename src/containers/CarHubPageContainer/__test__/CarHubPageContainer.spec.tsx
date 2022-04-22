import React from 'react';
import { ApolloProvider } from '@apollo/client';
import preloadAll from 'jest-next-dynamic';
import renderer from 'react-test-renderer';
import CarHubPageContainer from '../CarHubPageContainer';
import { GenericPageQuery } from '../../../../generated/GenericPageQuery';
import { VehicleTypeEnum } from '../../../../generated/globalTypes';
import { PageTypeEnum } from '../../../types/common';
import { IManufacturersSlug } from '../../../types/manufacturerSlug';
import createApolloClient from '../../../apolloClient';
import { OnOffer } from '../../../../entities/global';

const data = {
  genericPage: {
    id: '1TybyQFinAd1DizWj7QTob',
    intro: null,
    metaData: {
      breadcrumbs: [
        {
          href: '/',
          label: 'Home',
        },
        {
          label: 'Car Leasing',
        },
      ],
      metaDescription: 'metaDescription',
      name: 'Car Leasing New Hub',
      pageType: 'Car Leasing New Hub',
      slug: 'car-leasing-dummy',
      title: 'Car Leasing  - Vanarama Personal & Business Car Lease Deals',
    },
    sectionsAsArray: {
      accordion: [
        {
          accordionEntries: [
            {
              entryBody: '[Kia](kia-link)\n\n[Ford](ford-link)',
              entryTitle: 'All Manufacturers',
              name: 'All Manufacturers',
            },
          ],
          name: 'Manufacturers',
          title: 'Manufacturers',
        },
      ],
      cards: [
        {
          cards: [
            {
              body:
                'The Fiat 500 has always been one of the coolest and most fashionable small cars available.',
              image: {
                description: null,
                file: {
                  details: {
                    image: {
                      height: 240,
                      width: 395,
                    },
                  },
                  fileName: 'EHRR-Fiat-500-Top3Things3.jpg',
                  url: 'url',
                },
                title: 'EHRR-Fiat-500-Top3Things3',
              },
              link: {
                legacyUrl: null,
                text: 'View Model',
                url: 'https://www.vanarama.com/fiat-car-leasing/500.html',
              },
              name: 'Fiat 500',
              title: 'Fiat 500',
              titleTag: null,
            },
            {
              body:
                "Volkswagen's Golf is the family hatchback against which all others are judged.",
              image: {
                description: null,
                file: {
                  details: {
                    image: {
                      height: 480,
                      width: 720,
                    },
                  },
                  fileName: '05. Top-10-sellers-No-06-Volkswagen-Golf.jpg',
                  url:
                    '//images.ctfassets.net/3xid768u5joa/7CXo78WtzjDhDYUIlmSM9k/202479656e25d6cc1183584dff5e23d5/05._Top-10-sellers-No-06-Volkswagen-Golf.jpg',
                },
                title: '05. Top-10-sellers-No-06-Volkswagen-Golf',
              },
              link: {
                legacyUrl: null,
                text: 'View Model',
                url:
                  'https://www.vanarama.com/volkswagen-car-leasing/golf.html',
              },
              name: 'Volkswagen Golf',
              title: 'Volkswagen Golf',
              titleTag: null,
            },
            {
              body:
                'Practical, good to drive and capable of covering hundreds of miles on a single charge...',
              image: {
                description: 'Rear View of a Red Tesla Model 3',
                file: {
                  details: {
                    image: {
                      height: 240,
                      width: 360,
                    },
                  },
                  fileName: 'Tesla-Model3-Top3Things2.jpg',
                  url:
                    '//images.ctfassets.net/3xid768u5joa/7h3PfolJywsPuebqvPYHBz/cee7520baf0b8e90b9eacf1979f34e28/Tesla-Model3-Top3Things2.jpg',
                },
                title: 'Tesla-Model3-Top3Things2',
              },
              link: {
                legacyUrl: null,
                text: 'View Model',
                url: 'https://www.vanarama.com/tesla-car-leasing/model-3.html',
              },
              name: 'Tesla Model 3 Saloon',
              title: 'Tesla Model 3 Saloon',
              titleTag: 'h3',
            },
          ],
          name: 'Most Popular Models',
          position: 8,
          titleTag: 'h2',
        },
        {
          cards: [
            {
              body:
                'Right now, there’s a wealth of great electric cars out there to lease – of all shapes and sizes. Here, our motoring expert and chooses his favourites in 6 major categories. ',
              image: {
                description: '',
                file: {
                  details: {
                    image: {
                      height: 233,
                      width: 350,
                    },
                  },
                  fileName: 'FordMustangMach-EGT0921(1).jpg',
                  url:
                    '//images.ctfassets.net/3xid768u5joa/67XkkLQOeLVVcpfiInZkTv/4f3157689d35532fbc8711ec68dfbb2f/FordMustangMach-EGT0921_1_.jpg',
                },
                title: 'Ford-Mustang-Mach-E-GT',
              },
              link: {
                legacyUrl: null,
                text: 'Read More ',
                url:
                  'https://www.vanarama.com/electric-leasing/cars/the-best-electric-cars-in-2022',
              },
              name: 'The Best Electric Cars In 2022',
              title: 'The Best Electric Cars In 2022',
              titleTag: 'h2',
            },
            {
              body: 'Our pick of the 10 most fun cars to drive in 2021...',
              image: {
                description: 'Most fun cars to drive',
                file: {
                  details: {
                    image: {
                      height: 240,
                      width: 360,
                    },
                  },
                  fileName: 'fun-cars-to-drive-thumb.jpg',
                  url:
                    '//images.ctfassets.net/3xid768u5joa/6OengTxJzls9LELFLGIQtV/eb32559635436f9ea8d63f72b919c042/fun-cars-to-drive-thumb.jpg',
                },
                title: 'fun-cars-to-drive-thumb',
              },
              link: {
                legacyUrl: null,
                text: 'Read More',
                url: 'guides/cars/most-fun-to-drive-cars',
              },
              name: 'Which Cars Are The Most Fun To Drive? ',
              title: 'Which Cars Are The Most Fun To Drive? ',
              titleTag: 'h2',
            },
            {
              body:
                'We take a look at the most popular electric car on the market, the Tesla Model 3',
              image: {
                description: '',
                file: {
                  details: {
                    image: {
                      height: 240,
                      width: 360,
                    },
                  },
                  fileName: 'Lifestyle_TeslaModel3_card.jpg',
                  url:
                    '//images.ctfassets.net/3xid768u5joa/3TEGUY5ksqPYB2S659bJme/0e50aaeadb33ba108509384944e5403e/Lifestyle_TeslaModel3_card.jpg',
                },
                title: 'Lifestyle TeslaModel3 card',
              },
              link: {
                legacyUrl: null,
                text: 'Read More',
                url: 'guides/cars/tesla-model-3-review',
              },
              name: 'Tesla Model 3 Review',
              title: 'Tesla Model 3 Review',
              titleTag: null,
            },
          ],
          description: 'TEST TEST',
          name: 'Latest Reviews & Guides TEST',
          position: 16,
          title: null,
          titleTag: 'h2',
        },
      ],
      faqs: [
        {
          questionSets: [
            {
              questionAnswers: [
                {
                  answer: 'answer',
                  question: 'question',
                },
              ],
              title: 'Car Leasing FAQs',
            },
          ],
          title: 'Car Leasing FAQs',
        },
      ],
      featured: [
        {
          body: 'test text',
          image: {
            file: {
              details: {
                image: {
                  height: 854,
                  width: 1280,
                },
              },
              fileName: 'Toyota-Yaris-Cross0421.jpg',
              url: 'url',
            },
            title: 'Toyota-Yaris-Cross0421',
          },
          layout: ['Media Right'],
          title: 'Why Leasing? ',
          titleTag: 'h2',
        },
        {
          body: 'test text',
          image: {
            file: {
              details: {
                image: {
                  height: 854,
                  width: 1280,
                },
              },
              fileName: 'Toyota-Yaris-Cross0421.jpg',
              url: 'url',
            },
            title: 'Toyota-Yaris-Cross0421',
          },
          layout: ['Media Left'],
          title: 'Why Leasing? ',
          titleTag: 'h2',
          link: {
            text: 'Read Our Leasing Guides',
            url: 'https://www.vanarama.com/guides/car-leasing-explained',
          },
        },
      ],
      hero: [
        {
          body:
            '1.6T GDi ISG GT-Line 5 Doors\n## From £281.92 \nINC VAT PER MONTH',
          heroCta: [
            {
              text: 'View Offer',
              url:
                'https://www.vanarama.com/kia-car-leasing/sportage/estate/1-6t-gdi-isg-gt-line-5dr-178409.html',
              visible: null,
            },
          ],
          heroTerms: 'terms',
          image: {
            file: {
              contentType: 'image/png',
              details: {
                image: {
                  height: 427,
                  width: 649,
                },
              },
              fileName: 'ElectricCarCharging-optimised (1).png',
              url:
                '//images.ctfassets.net/3xid768u5joa/4IaUwMKT39qS5yeWjevrmL/8c2895da29d845c8ef0c84c1c7fbe826/ElectricCarCharging-optimised__1_.png',
            },
            title: 'ElectricCarCharging-optimised (1)',
          },
          logo: null,
          mobileImage: null,
          position: 0,
          title: 'Lease A Kia Sportage ',
          titleTag: 'h3',
        },
      ],
      leadText: [
        {
          description: 'description',
          heading: "The UK's Best Car Leasing Deals",
          link: null,
          position: 1,
          titleTag: 'h1',
        },
        {
          description: 'description',
          heading: "Vanarama Are The UK's Car Leasing Experts",
          link: null,
          position: 2,
          titleTag: 'h2',
        },
        {
          description: 'description',
          heading: 'How Does Car Leasing Work?',
          link: null,
          position: 9,
          titleTag: 'h2',
        },
      ],
      tiles: [
        {
          name: 'Why Lease With Vanarama? - Cars',
          position: 18,
          tiles: [
            {
              body: 'Our Price Promise guarantees you the very best deal*.',
              image: {
                description: 'Vanarama Price Promise',
                file: {
                  contentType: 'image/png',
                  details: {
                    image: {
                      height: 418,
                      width: 418,
                    },
                  },
                  fileName: 'Icons_100x100 - PricePromise.png',
                  url:
                    '//images.ctfassets.net/3xid768u5joa/6ZL9nhBuCxHCLfMD0cMKNp/ea7dbaac82a7a7caa98f3fc4ab23aea5/Icons_100x100_-_PricePromise.png',
                },
                title: 'Icons 100x100 - PricePromise',
              },
              link: null,
              title: 'The Best Price',
            },
          ],
          tilesTitle: 'Why Lease With Vanarama',
          titleTag: 'h2',
        },
      ],
    },
  },
};
const searchPodCarsData = {
  filterList: {
    bodyStyles: ['Coupe', 'Small Car'],
    fuelTypes: ['Diesel', 'Petrol'],
    groupedRangesWithSlug: [
      {
        children: [
          {
            label: 'A1',
            slug: 'a1',
          },
        ],
        parent: {
          label: 'Audi',
          slug: 'audi',
        },
      },
    ],
    transmissions: ['Automatic', 'Manual'],
    vehicleTypes: [VehicleTypeEnum.CAR],
  },
};
const productsCar = {
  productCarousel: [
    {
      averageRating: 4.5,
      businessRate: 228.98,
      capId: '96099',
      derivativeName: '1.6 TGDi Premium 5dr 2WD',
      freeInsurance: true,
      imageUrl:
        'https://images.autorama.co.uk/Photos/Vehicles/171951/hyundaitucson0421(4).jpg',
      isOnOffer: OnOffer.FILTER_ENABLED_AND_SET_TO_TRUE,
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
          name: '0-62mph',
          value: '10.3 Seconds',
        },
        {
          name: 'No. Of Seats',
          value: '5',
        },
      ],
      leadTime: '8-12 Week Delivery',
      manufacturerName: 'Hyundai',
      modelName: 'Tucson Estate',
      offerPosition: 1,
      personalRate: 274.98,
      rangeName: 'Tucson',
      vehicleType: VehicleTypeEnum.CAR,
    },
  ],
};
const vehicleListUrlData = {
  pageInfo: {
    endCursor: 'MTI',
    hasNextPage: false,
    hasPreviousPage: false,
    startCursor: 'MQ',
  },
  totalCount: 12,
  edges: [
    {
      cursor: 'MQ',
      node: {
        derivativeId: '99537',
        legacyUrl:
          'kia-car-leasing/sportage/estate/1-6t-gdi-isg-3-5dr-178412.html',
        url: 'car-leasing/kia/sportage/estate/16t-gdi-isg-3-5-doors-2021',
        vehicleType: VehicleTypeEnum.CAR,
      },
    },
  ],
};

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
    pathname: '/car-leasing-temp',
  }),
}));
const client = createApolloClient({});

describe('<CarHubPageContainer />', () => {
  beforeAll(async () => {
    await preloadAll();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should render correctly with data', async () => {
    const getComponent = () => {
      return renderer
        .create(
          <ApolloProvider client={client}>
            <CarHubPageContainer
              data={data as GenericPageQuery}
              searchPodCarsData={searchPodCarsData}
              productsCar={productsCar}
              vehicleListUrlData={vehicleListUrlData}
              migrationSlugs={{} as IManufacturersSlug}
              pageType={PageTypeEnum.DEFAULT}
            />
          </ApolloProvider>,
        )
        .toJSON();
    };

    const tree = await getComponent();
    expect(tree).toMatchSnapshot();
  });
});
