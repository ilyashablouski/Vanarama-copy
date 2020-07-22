import {
  render,
  waitFor,
  screen,
  act,
  fireEvent,
} from '@testing-library/react';
import React from 'react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { useRouter } from 'next/router';
import SearchPageContainer from '../SearchPageContainer';
import { getVehiclesList, GET_RANGES, getRangesList } from '../gql';
import { GET_SEARCH_POD_DATA } from '../../SearchPodContainer/gql';
import { GET_PRODUCT_CARDS_DATA } from '../../CustomerAlsoViewedContainer/gql';
import { VehicleTypeEnum, LeaseTypeEnum } from '../../../../generated/globalTypes';

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
        isOnOffer: false,
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
  },
  error: undefined,
};

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
    rewrite: jest.fn(),
    pathname: '/car-leasing',
    query: {},
    route: '/car-leasing',
  }),
}));

jest.mock('../gql', () => ({
  getVehiclesList: jest.fn(),
  getRangesList: jest.fn(),
}));

// ARRANGE
let filterMockCalled = false;
let vehicleMockCalled = false;

(getVehiclesList as jest.Mock).mockReturnValue([
  () => {
    vehicleMockCalled = true;
  },
  {
    data: {
      vehicleList: {
        totalCount: 91,
        pageInfo: {
          startCursor: 'MQ',
          endCursor: 'OQ',
          hasNextPage: true,
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

(getRangesList as jest.Mock).mockReturnValue([
  () => jest.fn(),
  {
    data: {
      rangeList: [
        {
          "rangeName": "1 Series",
          "rangeId": "780",
          "count": 66,
          "minPrice": 205.87
        },
      ]
    },
  },
]);

const mocksResponse: MockedResponse[] = [
  {
    request: {
      query: GET_SEARCH_POD_DATA,
      variables: {
        vehicleTypes: [VehicleTypeEnum.CAR],
      },
    },
    result: () => {
      filterMockCalled = true;
      return {
        data: {
          filterList: {
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
            bodyStyles: ['Dropside Tipper', 'Large Van'],
            transmissions: ['Automatic', 'Manual'],
            fuelTypes: ['diesel', 'iii'],
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
        },
        refetch: jest.fn(),
      };
    },
  },
  {
    request: {
      query: GET_PRODUCT_CARDS_DATA,
      variables: {
        capIds: [83615],
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
        refetch: jest.fn(),
      };
    },
  },
  {
    request: {
      query: GET_PRODUCT_CARDS_DATA,
      variables: {
        capIds: ["836151","836152","836153","836154","836155","836156"],
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
describe('<SearchPageContainer />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    filterMockCalled = false;
    vehicleMockCalled = false;
    window.sessionStorage.setItem = jest.fn();
  });

  it('should make a server request after render', async () => {
    // ACT
    act(() => {
      render(
        <MockedProvider mocks={mocksResponse} addTypename={false}>
          <SearchPageContainer isCarSearch isServer={false} />
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
          <SearchPageContainer isCarSearch isServer={false} />
        </MockedProvider>,
      );
    });

    // ASSERT
    await waitFor(() => {
      expect(filterMockCalled).toBeTruthy();
      expect(vehicleMockCalled).toBeTruthy();
      expect(screen.getByText('Showing 1 Results')).toBeTruthy();
    });
  });
  it('should be start new search', async () => {
    // ACT
    const replaceMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      replace: replaceMock,
      push: jest.fn(),
      query: {},
      route: '/car-leasing',
    });
    act(() => {
      render(
        <MockedProvider mocks={mocksResponse} addTypename={false}>
          <SearchPageContainer isCarSearch isServer={false} />
        </MockedProvider>,
      );
    });
    fireEvent.click(screen.getByText('Transmission', { selector: 'span' }));

    // ASSERT
    await waitFor(() => {
      expect(filterMockCalled).toBeTruthy();
      expect(vehicleMockCalled).toBeTruthy();
    });

    fireEvent.click(screen.getByText('Automatic'));
    expect(replaceMock).toHaveBeenCalledTimes(1);
    expect(replaceMock).toHaveBeenCalledWith(
      {
        pathname: '/car-leasing',
        query: {
          transmissions: ['Automatic'],
        },
      },
      '/car-leasing?transmissions=Automatic',
      { shallow: true },
    );
  });

  it('should be render correctly', async () => {
    // ACT
    const getComponent = render(
      <MockedProvider mocks={mocksResponse} addTypename={false}>
        <SearchPageContainer isCarSearch isServer={false} />
      </MockedProvider>,
    );

    await waitFor(() => {
      expect(filterMockCalled).toBeTruthy();
      expect(vehicleMockCalled).toBeTruthy();
    });
    const tree = getComponent.baseElement;
    expect(tree).toMatchSnapshot();
  });

});

describe('<SearchPageContainer /> Manufacturer', () => {
  (getVehiclesList as jest.Mock).mockReturnValue([
    () => {
      vehicleMockCalled = true;
    },
    {
      data: {
        vehicleList: {
          totalCount: 6,
          pageInfo: {
            startCursor: 'MQ',
            endCursor: 'OQ',
            hasNextPage: true,
            hasPreviousPage: false,
          },
          edges: [
            {
              cursor: 'MQ',
              node: {
                vehicleType: VehicleTypeEnum.CAR,
                offerRanking: 1,
                onOffer: true,
                derivativeId: '836151',
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
            {
              cursor: 'MM',
              node: {
                vehicleType: VehicleTypeEnum.CAR,
                offerRanking: 2,
                onOffer: true,
                derivativeId: '836152',
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
            {
              cursor: 'MC',
              node: {
                vehicleType: VehicleTypeEnum.CAR,
                offerRanking: 3,
                onOffer: true,
                derivativeId: '836153',
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
            {
              cursor: 'ML',
              node: {
                vehicleType: VehicleTypeEnum.CAR,
                offerRanking: 4,
                onOffer: true,
                derivativeId: '836154',
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
            {
              cursor: 'MK',
              node: {
                vehicleType: VehicleTypeEnum.CAR,
                offerRanking: 5,
                onOffer: true,
                derivativeId: '836155',
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
            {
              cursor: 'MG',
              node: {
                vehicleType: VehicleTypeEnum.CAR,
                offerRanking: 6,
                onOffer: true,
                derivativeId: '836156',
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
  it('should be manufacturer page render correctly', async () => {
    const replaceMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      replace: replaceMock,
      push: jest.fn(),
      query: {make: "BMW"},
      route: '/car-leasing/BMW',
    });

    // ACT
    const getComponent = render(
      <MockedProvider mocks={mocksResponse} addTypename={false}>
        <SearchPageContainer isCarSearch isServer={false} isMakePage/>
      </MockedProvider>,
    );

    await waitFor(() => {
      expect(filterMockCalled).toBeTruthy();
      expect(vehicleMockCalled).toBeTruthy();
    });
    const tree = getComponent.baseElement;
    expect(tree).toMatchSnapshot();
  });
})
