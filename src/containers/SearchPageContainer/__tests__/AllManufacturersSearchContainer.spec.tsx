import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import React from 'react';
import preloadAll from 'jest-next-dynamic';
import { act, render, screen, waitFor } from '@testing-library/react';
import { VehicleTypeEnum } from '../../../../generated/globalTypes';
import { GET_ALL_MANUFACTURERS_PAGE, useManufacturerList } from '../gql';
import { GET_SEARCH_POD_DATA } from '../../SearchPodContainer/gql';
import AllManufacturersSearchContainer from '../AllManufacturersSearchContainer';

const metaData = {
  title: 'Car Leasing Deals | Personal & Business Contract Hire | Vanarama',
  name: 'HubCarPage',
  metaRobots: 'all',
  metaDescription:
    'Find unbeatable Car Leasing Deals at Vanarama. Get top personal & business lease offers on brand new, in-stock cars in every make and model. Save money and lease your dream car today.',
  legacyUrl: 'https://www.vanarama.com/car-leasing/all-car-manufacturers.html',
  pageType: null,
  canonicalUrl:
    'https://www.vanarama.com/car-leasing/all-car-manufacturers.html',
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
    pathname: '/car-leasing/all-manufacturers',
    query: {},
    route: '/car-leasing/all-manufacturers',
    asPath: '/car-leasing/all-manufacturers',
  }),
}));

jest.mock('../gql', () => ({
  ...jest.requireActual('../gql'),
  useManufacturerList: jest.fn(),
}));

// ARRANGE
let filterMockCalled = false;

(useManufacturerList as jest.Mock).mockReturnValue([
  jest.fn(),
  {
    data: {
      manufacturerList: [
        {
          count: 8,
          manufacturerId: '1137',
          manufacturerName: 'Abarth',
          minPrice: 201.93,
          capIds: '1151',
        },
        {
          count: 21,
          manufacturerId: '1143',
          manufacturerName: 'Alfa Romeo',
          minPrice: 140.99,
          capIds: '1151',
        },
        {
          count: 549,
          manufacturerId: '1151',
          manufacturerName: 'Audi',
          minPrice: 168.91,
          capIds: '1151',
        },
      ],
    },
  },
]);

const mocksResponse: MockedResponse[] = [
  {
    request: {
      query: GET_SEARCH_POD_DATA,
      variables: {
        vehicleTypes: [VehicleTypeEnum.CAR],
        onOffer: null,
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
        refetch() {
          return this.data;
        },
      };
    },
  },
  {
    request: {
      query: GET_SEARCH_POD_DATA,
      variables: {
        vehicleTypes: [VehicleTypeEnum.CAR],
        onOffer: null,
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
        onOffer: null,
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
            fuelTypes: ['diesel', 'iii', 'electro'],
          },
        },
      };
    },
  },
  {
    request: {
      query: GET_ALL_MANUFACTURERS_PAGE,
      variables: {},
    },
    result: () => {
      return {
        data: { manufacturerPage: {} },
        refetch: jest.fn(),
      };
    },
  },
];
describe('<AllManufacturersSearchContainer />', () => {
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
          <AllManufacturersSearchContainer isCarSearch metaData={metaData} />
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
          <AllManufacturersSearchContainer isCarSearch metaData={metaData} />
        </MockedProvider>,
      );
    });

    // ASSERT
    await waitFor(() => {
      expect(filterMockCalled).toBeTruthy();
      expect(screen.getByText('Showing 3 Results')).toBeTruthy();
    });
  });

  it('should be render correctly all manufacturers Page', async () => {
    // ACT
    const getComponent = render(
      <MockedProvider mocks={mocksResponse} addTypename={false}>
        <AllManufacturersSearchContainer metaData={metaData} isCarSearch />
      </MockedProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText('Automatic')).toBeInTheDocument();
    });
    const tree = getComponent.baseElement;
    expect(tree).toMatchSnapshot();
  });
});
