import { render, waitFor, screen } from '@testing-library/react';
import React from 'react';
import renderer from 'react-test-renderer';
import { MockedProvider } from '@apollo/client/testing';
import SearchPageContainer from '../SearchPageContainer';
import { getVehiclesList, getVehiclesCount } from '../gql';
import { filterListByTypes } from '../../SearchPodContainer/gql';

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
  getVehiclesCount: jest.fn(),
}));

jest.mock('../../SearchPodContainer/gql', () => ({
  filterListByTypes: jest.fn(),
}));

// ARRANGE
let mockCalled = false;

(getVehiclesList as jest.Mock).mockReturnValue([
  () => {
    mockCalled = true;
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

(getVehiclesCount as jest.Mock).mockReturnValue([
  () => {
    mockCalled = true;
  },
  {
    data: {
      vehicleList: {
        totalCount: 91,
      },
    },
  },
]);

(filterListByTypes as jest.Mock).mockReturnValue([
  () => {
    mockCalled = true;
  },
  {
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
  },
]);
describe('<SearchPageContainer />', () => {
  afterEach(() => {
    jest.clearAllMocks();
    mockCalled = false;
  });

  it('should make a server request after render', async () => {
    // ACT
    render(
      <MockedProvider addTypename={false}>
        <SearchPageContainer isCarSearch isServer={false} />
      </MockedProvider>,
    );

    // ASSERT
    await waitFor(() => expect(mockCalled).toBeTruthy());
  });

  it('should be render Show more button if all data loaded', async () => {
    // ACT
    render(
      <MockedProvider addTypename={false}>
        <SearchPageContainer isCarSearch isServer={false} />
      </MockedProvider>,
    );

    // ASSERT
    await waitFor(() =>
      expect(screen.getByText('Load More')).toBeInTheDocument(),
    );
  });
  it('should be render correctly', async () => {
    // ACT
    const getComponent = () => {
      return renderer
        .create(<SearchPageContainer isCarSearch isServer={false} />)
        .toJSON();
    };
    // ASSERT
    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });
});
