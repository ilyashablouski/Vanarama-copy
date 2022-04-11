import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import React from 'react';
import preloadAll from 'jest-next-dynamic';
import { act, render, screen, waitFor } from '@testing-library/react';
import {
  LeaseTypeEnum,
  VehicleTypeEnum,
} from '../../../../generated/globalTypes';
import { getRangesList, useVehiclesList } from '../gql';
import { GET_SEARCH_POD_DATA } from '../../SearchPodContainer/gql';
import DynamicParamSearchContainer from '../DynamicParamSearchContainer';

const metaData = {
  title: 'Car Leasing Deals | Personal & Business Contract Hire | Vanarama',
  name: 'HubCarPage',
  metaRobots: 'all',
  metaDescription:
    'Find unbeatable Car Leasing Deals at Vanarama. Get top personal & business lease offers on brand new, in-stock cars in every make and model. Save money and lease your dream car today.',
  legacyUrl: 'https://www.vanarama.com/car-leasing.html',
  pageType: null,
  canonicalUrl: 'https://www.vanarama.com/car-leasing.html',
  slug: 'car-leasing',
  schema: {
    '@graph': [
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            name: 'Why Lease A Car?',
            '@type': 'Question',
            acceptedAnswer: {
              text:
                'Leasing your brand new car with Vanarama means you can drive the car of your dreams at a price you can afford. And you can upgrade to a new one every few years',
              '@type': 'Answer',
            },
          },
          {
            name: 'How Does Car Leasing Work?',
            '@type': 'Question',
            acceptedAnswer: {
              text: `Personal car leasing works very much like renting, but for a longer time period. You choose your new car, the contract length, how much you'd like your initial rental to be and how many miles you'll drive over the period. At the end of your lease agreement, you return the car & upgrade`,
              '@type': 'Answer',
            },
          },
        ],
      },
      {
        url: 'https://www.vanarama.com/car-leasing.html',
        name: 'Vanarama',
        '@type': 'Service',
        '@context': 'http://schema.org',
        description:
          'Leasing your brand new car with Vanarama means you can drive the car of your dreams at a price you can afford.',
        serviceType: 'Car Leasing',
      },
    ],
  },
  publishedOn: null,
  breadcrumbs: [
    {
      href: '/',
      label: 'Home',
    },
    {
      label: 'Car Leasing',
    },
  ],
};

const filterListResponse = {
  vehicleTypes: [VehicleTypeEnum.CAR],
  groupedRanges: [
    {
      parent: 'Citroën',
      children: ['Berlingo', 'Dispatch', 'Relay'],
    },
    {
      parent: 'Dacia',
      children: ['Duster'],
    },
  ],
  groupedRangesWithSlug: [
    {
      parent: { label: 'Citroën', slug: 'Citroën' },
      children: [
        { label: 'Berlingo', slug: 'Berlingo' },
        { label: 'Dispatch', slug: 'Dispatch' },
        { label: 'Relay', slug: 'Relay' },
      ],
    },
    {
      parent: { label: 'Dacia', slug: 'Dacia' },
      children: [{ label: 'Duster', slug: 'Duster' }],
    },
    {
      parent: { label: 'BMW', slug: 'BMW' },
      children: [
        { label: '3 series', slug: '3 series' },
        { label: '4 series', slug: '4 series' },
      ],
    },
  ],
  bodyStyles: ['Dropside Tipper', 'Large Van'],
  transmissions: ['Automatic', 'Manual'],
  fuelTypes: ['diesel', 'iii'],
};

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
    rewrite: jest.fn(),
    pathname: '/cars-250-350-per-month.html',
    query: {},
    route: '/cars-250-350-per-month.html',
    asPath: '/cars-250-350-per-month.html',
  }),
}));

jest.mock('../gql', () => ({
  ...jest.requireActual('../gql'),
  useVehiclesList: jest.fn(),
  getRangesList: jest.fn(),
  useManufacturerList: jest.fn(),
  useSearchResultPage: jest.fn(),
}));

// ARRANGE
let filterMockCalled = false;
let vehicleMockCalled = false;

const edges = [
  {
    cursor: 'MTM',
    node: {
      url:
        'car-leasing/ds/ds-3/crossback-hatchback/12-puretech-130-performance-line-plus-5-doors-eat8-2019',
      legacyUrl:
        'ds-car-leasing/ds-3/crossback-hatchback/1-2-puretech-130-performance-line-5dr-eat8-171190.html',
      vehicleType: VehicleTypeEnum.CAR,
      offerRanking: 38,
      onOffer: true,
      derivativeId: '96003',
      capCode: 'DS3C12PI35HPTA      ',
      manufacturerName: 'DS',
      modelName: 'DS 3 Crossback Hatchback',
      derivativeName: '1.2 PureTech 130 Performance Line + 5 Doors EAT8',
      bodyStyle: 'Crossover',
      transmission: 'Automatic',
      fuelType: 'Petrol',
      financeProfiles: [
        {
          leaseType: LeaseTypeEnum.PERSONAL,
          rate: 263.91,
          term: 48,
          upfront: 9,
          upfrontPayment: 2375.19,
          mileage: 6000,
          maintained: false,
        },
      ],
    },
  },
  {
    cursor: 'MTQ',
    node: {
      url:
        'car-leasing/volkswagen/id-4/electric-estate/109kw-life-pure-52kwh-5-doors-auto-2021',
      legacyUrl:
        'volkswagen-car-leasing/id4/id4-electric-estate/109kw-life-pure-52kwh-5dr-auto-174283.html',
      vehicleType: VehicleTypeEnum.CAR,
      offerRanking: 41,
      onOffer: true,
      derivativeId: '98046',
      capCode: 'VWI400LPU5EE A      ',
      manufacturerName: 'Volkswagen',
      modelName: 'Id.4 Electric Estate',
      derivativeName: '109kW Life Pure 52kWh 5 Doors Auto',
      bodyStyle: 'Crossover',
      transmission: 'Automatic',
      fuelType: 'Electric',
      financeProfiles: [
        {
          leaseType: LeaseTypeEnum.PERSONAL,
          rate: 340.9,
          term: 48,
          upfront: 9,
          upfrontPayment: 3068.1,
          mileage: 6000,
          maintained: false,
        },
      ],
    },
  },
];

const preLoadVehiclesList = {
  vehicleList: {
    totalCount: 2,
    pageInfo: {
      startCursor: 'MTM',
      endCursor: 'MTQ',
      hasNextPage: false,
      hasPreviousPage: false,
    },
    edges,
  },
};

const preLoadCardsData = {
  productCard: [
    {
      vehicleType: VehicleTypeEnum.CAR,
      capId: '96003',
      manufacturerName: 'DS',
      rangeName: 'DS 3',
      modelName: 'DS 3 Crossback',
      derivativeName: '1.2 PureTech 130 Performance Line + 5dr EAT8',
      averageRating: 5,
      isOnOffer: true,
      offerPosition: 38,
      leadTime: '4-6 Week Delivery',
      imageUrl:
        'https://images.autorama.co.uk/Photos/Models/10528/ds3crossback0419(3).jpg',
      freeInsurance: true,
      keyInformation: [
        {
          name: 'Transmission',
          value: 'Automatic',
        },
        {
          name: 'Fuel Type',
          value: 'Petrol',
        },
        {
          name: 'Emissions',
          value: '109g/km',
        },
        {
          name: 'Fuel Economy',
          value: '57.6 MPG',
        },
      ],
      businessRate: 219.91,
      personalRate: 263.91,
    },
    {
      vehicleType: VehicleTypeEnum.CAR,
      capId: '98046',
      manufacturerName: 'Volkswagen',
      rangeName: 'ID.4',
      modelName: 'Id.4 Electric Estate',
      derivativeName: '109kW Life Pure 52kWh 5dr Auto',
      averageRating: 0,
      isOnOffer: true,
      offerPosition: 41,
      leadTime: '8-10 Month Delivery',
      imageUrl:
        'https://images.autorama.co.uk/Photos/Models/10989/volkswagenid40721(4).jpg',
      freeInsurance: true,
      keyInformation: [
        {
          name: 'Transmission',
          value: 'Automatic',
        },
        {
          name: 'Fuel Type',
          value: 'Electric',
        },
        {
          name: 'Emissions',
          value: '0g/km',
        },
        {
          name: '0-62mph',
          value: '10.9 Seconds',
        },
      ],
      businessRate: 340.89,
      personalRate: 340.9,
    },
  ],
  derivatives: [
    {
      id: '96003',
      capCode: 'DS3C12PI35HPTA      ',
      name: '1.2 PureTech 130 Performance Line + 5 Doors EAT8',
      slug: '12-puretech-130-performance-line-plus-5-doors-eat8',
      manufacturer: {
        name: 'DS',
        slug: 'ds',
      },
      model: {
        name: 'DS 3 Crossback Hatchback',
        slug: 'ds-3-crossback-hatchback',
      },
      fuelType: {
        name: 'Petrol',
      },
      transmission: {
        name: 'Automatic',
      },
      bodyStyle: {
        name: 'Hatchback',
      },
      range: {
        name: 'DS 3',
        slug: 'ds-3',
      },
    },
    {
      id: '98046',
      capCode: 'VWI400LPU5EE A      ',
      name: '109kW Life Pure 52kWh 5 Doors Auto',
      slug: '109kw-life-pure-52kwh-5-doors-auto',
      manufacturer: {
        name: 'Volkswagen',
        slug: 'volkswagen',
      },
      model: {
        name: 'Id.4 Electric Estate',
        slug: 'id4-electric-estate',
      },
      fuelType: {
        name: 'Electric',
      },
      transmission: {
        name: 'Automatic',
      },
      bodyStyle: {
        name: 'Estate',
      },
      range: {
        name: 'Id.4',
        slug: 'id4',
      },
    },
  ],
  vehicleList: {
    edges,
  },
};

(useVehiclesList as jest.Mock).mockImplementation(() => {
  vehicleMockCalled = true;

  return [
    jest.fn(),
    {
      data: preLoadVehiclesList,
    },
  ];
});

(getRangesList as jest.Mock).mockReturnValue([
  () => jest.fn(),
  {
    data: {},
  },
]);

const mocksResponse: MockedResponse[] = [
  {
    request: {
      query: GET_SEARCH_POD_DATA,
      variables: {
        vehicleTypes: [VehicleTypeEnum.CAR],
        onOffer: null,
        fuelTypes: [],
        bodyStyles: [],
      },
    },
    result: () => {
      filterMockCalled = true;
      return {
        data: {
          filterList: filterListResponse,
        },
        refetch() {
          return this.data;
        },
      };
    },
  },
];

describe('<DynamicParamSearchContainer />', () => {
  beforeEach(async () => {
    await preloadAll();

    jest.clearAllMocks();
    filterMockCalled = false;
    vehicleMockCalled = false;
    window.sessionStorage.setItem = jest.fn();
    window.scrollTo = jest.fn();
  });

  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });

  it('should make a server request after render', async () => {
    // ACT
    act(() => {
      render(
        <MockedProvider mocks={mocksResponse} addTypename={false}>
          <DynamicParamSearchContainer
            isCarSearch
            metaData={metaData}
            preLoadVehiclesList={preLoadVehiclesList}
            preLoadProductCardsData={preLoadCardsData}
          />
        </MockedProvider>,
      );
    });

    // ASSERT
    await waitFor(() => {
      expect(filterMockCalled).toBeTruthy();
      expect(vehicleMockCalled).toBeTruthy();
    });
  });

  it('should be render correct list length', async () => {
    // ACT
    act(() => {
      render(
        <MockedProvider mocks={mocksResponse} addTypename={false}>
          <DynamicParamSearchContainer
            isCarSearch
            metaData={metaData}
            preLoadVehiclesList={preLoadVehiclesList}
            preLoadProductCardsData={preLoadCardsData}
          />
        </MockedProvider>,
      );
    });

    // ASSERT
    await waitFor(() => {
      expect(filterMockCalled).toBeTruthy();
      expect(vehicleMockCalled).toBeTruthy();
      expect(screen.getByText('Showing 2 Results')).toBeTruthy();
    });
  });

  it('should be render correctly', async () => {
    // ACT
    const getComponent = render(
      <MockedProvider mocks={mocksResponse} addTypename={false}>
        <DynamicParamSearchContainer
          metaData={metaData}
          isCarSearch
          preLoadVehiclesList={preLoadVehiclesList}
          preLoadProductCardsData={preLoadCardsData}
        />
      </MockedProvider>,
    );

    await waitFor(() => {
      expect(vehicleMockCalled).toBeTruthy();
      expect(screen.getByText('Volkswagen Id.4 Electric Estate')).toBeInTheDocument();
      expect(screen.getByText('DS DS 3 Crossback Hatchback')).toBeInTheDocument();
    });
    const tree = getComponent.baseElement;
    expect(tree).toMatchSnapshot();
  });
});
