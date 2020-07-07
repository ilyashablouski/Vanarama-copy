import { render, waitFor, screen, act } from '@testing-library/react';
import React from 'react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import SearchPageContainer from '../SearchPageContainer';
import { getVehiclesList } from '../gql';
import { GET_SEARCH_POD_DATA } from '../../SearchPodContainer/gql';
import { GET_PRODUCT_CARDS_DATA } from '../../../containers/CustomerAlsoViewedContainer/gql';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      pathname: '/[search]',
      query: { search: 'car-leasing' },
    };
  },
}));

jest.mock('../gql', () => ({
  getVehiclesList: jest.fn(),
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
              vehicleType: 'CAR',
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
        vehicleTypes: ['CAR'],
      },
    },
    result: () => {
      filterMockCalled = true;
      return {
        data: {
          filterList: {
            vehicleTypes: ['CAR'],
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
        vehicleType: 'CAR',
      },
    },
    result: () => {
      return {
        data: {
          productCard: {
            vehicleType: 'CAR',
            capId: '83615',
            manufacturerName: 'manufacturerName',
            rangeName: 'rangeName',
            derivativeName: 'derivativeName',
            averageRating: 4.5,
            isOnOffer: false,
            offerPosition: 5,
            leadTime: '',
            imageUrl: '',
            keyInformation: [{name: "Transmission", value: "Manual"}],
            businessRate: 55,
            personalRate: 55,
          },
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
        vehicleType: 'CAR',
      },
    },
    result: () => {
      return {
        data: {
          productCard: {
          },
        },
        refetch: jest.fn(),
      };
    },
  },
];
describe('<SearchPageContainer />', () => {
  afterEach(() => {
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
      expect(screen.getByText('Showing 91 Results')).toBeTruthy();
    });
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
