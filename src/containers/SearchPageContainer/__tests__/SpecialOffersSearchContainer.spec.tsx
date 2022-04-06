import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import React from 'react';
import preloadAll from 'jest-next-dynamic';
import { act, render, screen, waitFor } from '@testing-library/react';
import { VehicleTypeEnum } from '../../../../generated/globalTypes';
import { useVehiclesList } from '../gql';
import { GET_SEARCH_POD_DATA } from '../../SearchPodContainer/gql';
import { GET_PRODUCT_CARDS_DATA } from '../../CustomerAlsoViewedContainer/gql';
import SpecialOffersSearchContainer from '../SpecialOffersSearchContainer';

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
              text:
                "Personal car leasing works very much like renting, but for a longer time period. You choose your new car, the contract length, how much you'd like your initial rental to be and how many miles you'll drive over the period. At the end of your lease agreement, you return the car & upgrade",
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
  __typename: 'Meta',
};
const mockData = {
  loading: false,
  refetch() {
    return this.data;
  },
  data: {
    productCard: [
      {
        vehicleType: VehicleTypeEnum.CAR,
        capId: '83615',
        manufacturerName: 'manufacturerName',
        rangeName: 'rangeName',
        derivativeName: 'derivativeName',
        averageRating: 4.5,
        isOnOffer: true,
        offerPosition: 5,
        leadTime: '',
        imageUrl: '',
        keyInformation: [],
        businessRate: 55,
        personalRate: 55,
      },
    ],
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
  },
  error: undefined,
};

const filterListResponse = {
  vehicleTypes: [VehicleTypeEnum.CAR],
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
    pathname: '/car-leasing',
    query: {},
    route: '/car-leasing',
    asPath: '/car-leasing',
  }),
}));

jest.mock('../gql', () => ({
  ...jest.requireActual('../gql'),
  useVehiclesList: jest.fn(),
}));

// ARRANGE
let filterMockCalled = false;

(useVehiclesList as jest.Mock).mockReturnValue([
  jest.fn(),
  {
    data: {
      vehicleList: {
        totalCount: 1,
        pageInfo: {
          startCursor: 'MQ',
          endCursor: 'OQ',
          hasNextPage: false,
          hasPreviousPage: false,
        },
        edges: [
          {
            cursor: 'MQ',
            node: {
              vehicleType: VehicleTypeEnum.CAR,
              offerRanking: 1,
              onOffer: true,
              derivativeId: '83615',
              capCode: 'FOFO10TN55HPTM  6   ',
              manufacturerName: 'Ford',
              modelName: 'Focus Hatchback',
              derivativeName: '1.0 EcoBoost 125 ST-Line Nav 5 Doors',
              bodyStyle: 'Hatchback',
              transmission: 'Manual',
              fuelType: 'Petrol',
              financeProfiles: [
                {
                  leaseType: 'PERSONAL',
                  rate: 210.96,
                  term: 24,
                  upfront: 9,
                  upfrontPayment: 1898.64,
                  mileage: 6000,
                  maintained: false,
                },
                {
                  leaseType: 'BUSINESS',
                  rate: 175.96,
                  term: 24,
                  upfront: 9,
                  upfrontPayment: 1583.64,
                  mileage: 6000,
                  maintained: false,
                },
              ],
            },
          },
        ],
      },
    },
  },
]);

const mocksResponse: MockedResponse[] = [
  {
    request: {
      query: GET_SEARCH_POD_DATA,
      variables: {
        vehicleTypes: [VehicleTypeEnum.CAR],
        onOffer: true,
        bodyStyles: [],
        fuelTypes: [],
      },
    },
    result: () => {
      filterMockCalled = true;
      return {
        data: {
          filterList: filterListResponse,
        },
        refetch: jest.fn(),
      };
    },
  },
  {
    request: {
      query: GET_SEARCH_POD_DATA,
      variables: {
        vehicleTypes: [VehicleTypeEnum.CAR],
        onOffer: true,
        fuelTypes: [],
        bodyStyles: [],
        transmissions: ['Automatic'],
      },
    },
    result: () => {
      filterMockCalled = true;
      return {
        data: {
          filterList: filterListResponse,
        },
        refetch: jest.fn(),
      };
    },
    newData: jest.fn(() => ({
      data: {
        filterList: {
          vehicleTypes: [VehicleTypeEnum.CAR],
          groupedRanges: [
            {
              parent: 'Citroën',
              children: ['Berlingo', 'Dispatch'],
            },
            {
              parent: 'Dacia',
              children: ['Duster'],
            },
          ],
          bodyStyles: ['Dropside Tipper', 'Large Van'],
          transmissions: ['Automatic', 'Manual'],
          fuelTypes: ['diesel', 'iii', 'electro'],
        },
      },
      refetch: jest.fn(),
    })),
  },
  {
    request: {
      query: GET_SEARCH_POD_DATA,
      variables: {
        vehicleTypes: [VehicleTypeEnum.CAR],
        onOffer: true,
        fuelTypes: [],
        bodyStyles: [],
        transmissions: ['Automatic'],
      },
    },
    result: () => {
      filterMockCalled = true;
      return {
        data: {
          filterList: filterListResponse,
        },
      };
    },
    newData: () => {
      filterMockCalled = true;
      return {
        data: {
          filterList: {
            vehicleTypes: [VehicleTypeEnum.CAR],
            groupedRanges: [
              {
                parent: 'Citroën',
                children: ['Berlingo', 'Dispatch'],
              },
              {
                parent: 'Dacia',
                children: ['Duster'],
              },
            ],
            bodyStyles: ['Dropside Tipper', 'Large Van'],
            transmissions: ['Automatic', 'Manual'],
            fuelTypes: ['diesel', 'iii', 'electro'],
          },
        },
      };
    },
  },
  {
    request: {
      query: GET_PRODUCT_CARDS_DATA,
      variables: {
        capIds: ['83615'],
        vehicleType: VehicleTypeEnum.CAR,
      },
    },
    result: () => {
      return {
        data: {
          productCard: {
            vehicleType: VehicleTypeEnum.CAR,
            capId: '83615',
            manufacturerName: 'manufacturerName',
            rangeName: 'rangeName',
            derivativeName: 'derivativeName',
            averageRating: 4.5,
            isOnOffer: false,
            offerPosition: 5,
            leadTime: '',
            imageUrl: '',
            keyInformation: [{ name: 'Transmission', value: 'Manual' }],
            businessRate: 55,
            personalRate: 55,
          },
          derivatives: mockData.data.derivatives,
          vehicleList: {},
        },
        refetch: jest.fn(),
      };
    },
  },
  {
    request: {
      query: GET_PRODUCT_CARDS_DATA,
      variables: {
        capIds: [],
        vehicleType: VehicleTypeEnum.CAR,
      },
    },
    result: () => {
      return {
        data: {
          productCard: {},
          derivatives: [],
          vehicleList: {},
        },
        refetch: jest.fn(),
      };
    },
  },
  {
    request: {
      query: GET_PRODUCT_CARDS_DATA,
      variables: {
        capIds: ['83615'],
        vehicleType: VehicleTypeEnum.CAR,
      },
    },
    result: () => {
      return {
        data: {
          productCard: [
            {
              vehicleType: VehicleTypeEnum.CAR,
              capId: '836151',
              manufacturerName: 'manufacturerName',
              rangeName: 'rangeName',
              derivativeName: 'derivativeName',
              averageRating: 4.5,
              isOnOffer: false,
              offerPosition: 5,
              leadTime: '',
              imageUrl: '',
              keyInformation: [],
              businessRate: 55,
              personalRate: 55,
            },
            {
              vehicleType: VehicleTypeEnum.CAR,
              capId: '836152',
              manufacturerName: 'manufacturerName',
              rangeName: 'rangeName',
              derivativeName: 'derivativeName',
              averageRating: 4.5,
              isOnOffer: false,
              offerPosition: 5,
              leadTime: '',
              imageUrl: '',
              keyInformation: [],
              businessRate: 55,
              personalRate: 55,
            },
            {
              vehicleType: VehicleTypeEnum.CAR,
              capId: '836153',
              manufacturerName: 'manufacturerName',
              rangeName: 'rangeName',
              derivativeName: 'derivativeName',
              averageRating: 4.5,
              isOnOffer: false,
              offerPosition: 5,
              leadTime: '',
              imageUrl: '',
              keyInformation: [],
              businessRate: 55,
              personalRate: 55,
            },
            {
              vehicleType: VehicleTypeEnum.CAR,
              capId: '836154',
              manufacturerName: 'manufacturerName',
              rangeName: 'rangeName',
              derivativeName: 'derivativeName',
              averageRating: 4.5,
              isOnOffer: false,
              offerPosition: 5,
              leadTime: '',
              imageUrl: '',
              keyInformation: [],
              businessRate: 55,
              personalRate: 55,
            },
            {
              vehicleType: VehicleTypeEnum.CAR,
              capId: '836155',
              manufacturerName: 'manufacturerName',
              rangeName: 'rangeName',
              derivativeName: 'derivativeName',
              averageRating: 4.5,
              isOnOffer: false,
              offerPosition: 5,
              leadTime: '',
              imageUrl: '',
              keyInformation: [],
              businessRate: 55,
              personalRate: 55,
            },
            {
              vehicleType: VehicleTypeEnum.CAR,
              capId: '836156',
              manufacturerName: 'manufacturerName',
              rangeName: 'rangeName',
              derivativeName: 'derivativeName',
              averageRating: 4.5,
              isOnOffer: false,
              offerPosition: 5,
              leadTime: '',
              imageUrl: '',
              keyInformation: [],
              businessRate: 55,
              personalRate: 55,
            },
          ],
          derivatives: mockData.data.derivatives,
        },
        vehicleList: {
          edges: [],
        },
        refetch: jest.fn(),
      };
    },
  },
  {
    request: {
      query: GET_PRODUCT_CARDS_DATA,
      variables: {
        capIds: ['836151', '836152', '836153', '836154', '836155', '836156'],
        vehicleType: VehicleTypeEnum.CAR,
      },
    },
    result: () => {
      return {
        data: {
          productCard: mockData.data.productCard,
          derivatives: mockData.data.derivatives,
        },
        refetch: jest.fn(),
      };
    },
  },
];

describe('<SpecialOffersSearchContainer />', () => {
  beforeEach(async () => {
    await preloadAll();

    jest.clearAllMocks();
    filterMockCalled = false;
    window.sessionStorage.setItem = jest.fn();
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
          <SpecialOffersSearchContainer
            isCarSearch
            isServer={false}
            metaData={metaData}
          />
        </MockedProvider>,
      );
    });

    // ASSERT
    await waitFor(() => {
      expect(filterMockCalled).toBeTruthy();
    });
  });

  it('should be render correct list length', async () => {
    // ACT
    act(() => {
      render(
        <MockedProvider mocks={mocksResponse} addTypename={false}>
          <SpecialOffersSearchContainer isCarSearch metaData={metaData} />
        </MockedProvider>,
      );
    });

    // ASSERT
    await waitFor(() => {
      expect(filterMockCalled).toBeTruthy();
      expect(screen.getByText('Showing 0 Results')).toBeTruthy();
    });
  });

  it('should be render correctly', async () => {
    // ACT
    const getComponent = render(
      <MockedProvider mocks={mocksResponse} addTypename={false}>
        <SpecialOffersSearchContainer metaData={metaData} isCarSearch />
      </MockedProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText('Automatic')).toBeInTheDocument();
    });
    const tree = getComponent.baseElement;
    expect(tree).toMatchSnapshot();
  });
});
