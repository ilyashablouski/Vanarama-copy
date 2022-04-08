import { MockedProvider } from '@apollo/client/testing';
import React from 'react';
import preloadAll from 'jest-next-dynamic';
import { act, render, screen, waitFor } from '@testing-library/react';
import { VehicleTypeEnum } from '../../../../generated/globalTypes';
import { getRangesList, useVehiclesList } from '../gql';
import RangeSearchContainer from '../RangeSeacrhContainer';

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

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
    rewrite: jest.fn(),
    pathname: '/car-leasing/bmw-car-leasing/3-series.html',
    query: {},
    route: '/car-leasing/bmw-car-leasing/3-series.html',
    asPath: '/car-leasing/bmw-car-leasing/3-series.html',
  }),
}));

jest.mock('../gql', () => ({
  ...jest.requireActual('../gql'),
  useVehiclesList: jest.fn(),
  getRangesList: jest.fn(),
}));

// ARRANGE
let vehicleMockCalled = false;

const list = {
  totalCount: 3,
  pageInfo: {
    startCursor: 'MTM',
    endCursor: 'MTU',
    hasNextPage: false,
    hasPreviousPage: false,
  },
  edges: [
    {
      cursor: 'MTM',
      node: {
        bodyStyle: 'Saloon',
        capCode: 'BM3A20SPE4SPTA4 8   ',
        derivativeId: '97368',
        derivativeName: '320i xDrive SE Pro 4 Doors Step Auto',
        financeProfiles: [],
        fuelType: 'Petrol',
        legacyUrl:
          'bmw-car-leasing/3-series/saloon/320i-xdrive-se-pro-4dr-step-auto-173293.html',
        manufacturerName: 'BMW',
        modelName: '3 Series Saloon',
        offerRanking: 999999999,
        onOffer: false,
        transmission: 'Automatic',
        url:
          'car-leasing/bmw/3-series/saloon/320i-xdrive-se-pro-4-doors-step-auto-2019',
        vehicleType: VehicleTypeEnum.CAR,
      },
    },
    {
      cursor: 'MTQ',
      node: {
        bodyStyle: 'Estate',
        capCode: 'BM3120MHP5EDTA  8   ',
        derivativeId: '97491',
        derivativeName: '318d MHT SE Pro 5 Doors Step Auto',
        financeProfiles: [],
        fuelType: 'Diesel',
        legacyUrl:
          'bmw-car-leasing/3-series/touring/318d-mht-se-pro-5dr-step-auto-173328.html',
        manufacturerName: 'BMW',
        modelName: '3 Series Touring',
        offerRanking: 999999999,
        onOffer: false,
        transmission: 'Automatic',
        url:
          'car-leasing/bmw/3-series/touring/318d-mht-se-pro-5-doors-step-auto-2019',
        vehicleType: VehicleTypeEnum.CAR,
      },
    },
    {
      cursor: 'MTU',
      node: {
        bodyStyle: 'Saloon',
        capCode: 'BM3220MHP4SDTA  8   ',
        derivativeId: '97372',
        derivativeName: '320d MHT SE Pro 4 Doors Step Auto',
        financeProfiles: [],
        fuelType: 'Diesel',
        legacyUrl:
          'bmw-car-leasing/3-series/saloon/320d-mht-se-pro-4dr-step-auto-173297.html',
        manufacturerName: 'BMW',
        modelName: '3 Series Saloon',
        offerRanking: 999999999,
        onOffer: false,
        transmission: 'Automatic',
        url:
          'car-leasing/bmw/3-series/saloon/320d-mht-se-pro-4-doors-step-auto-2019',
        vehicleType: VehicleTypeEnum.CAR,
      },
    },
  ],
};

const preLoadVehiclesList = {
  vehicleList: list,
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

describe('<RangeSearchContainer />', () => {
  beforeEach(async () => {
    await preloadAll();

    jest.clearAllMocks();
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
        <MockedProvider addTypename={false}>
          <RangeSearchContainer
            isCarSearch
            metaData={metaData}
            preLoadVehiclesList={preLoadVehiclesList}
          />
        </MockedProvider>,
      );
    });

    // ASSERT
    await waitFor(() => {
      expect(vehicleMockCalled).toBeTruthy();
    });
  });

  it('should be render correct list length', async () => {
    // ACT
    act(() => {
      render(
        <MockedProvider addTypename={false}>
          <RangeSearchContainer
            isCarSearch
            preLoadVehiclesList={preLoadVehiclesList}
            metaData={metaData}
          />
        </MockedProvider>,
      );
    });

    // ASSERT
    await waitFor(() => {
      expect(vehicleMockCalled).toBeTruthy();
      expect(screen.getByText('Showing 3 Results')).toBeTruthy();
    });
  });

  it('should be render correctly', async () => {
    // ACT
    const getComponent = render(
      <MockedProvider addTypename={false}>
        <RangeSearchContainer
          metaData={metaData}
          isCarSearch
          preLoadVehiclesList={preLoadVehiclesList}
        />
      </MockedProvider>,
    );

    await waitFor(() => {
      expect(vehicleMockCalled).toBeTruthy();
      expect(screen.getByText('Showing 3 Results')).toBeInTheDocument();
    });
    const tree = getComponent.baseElement;
    expect(tree).toMatchSnapshot();
  });
});
