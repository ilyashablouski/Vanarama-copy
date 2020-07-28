import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { render, waitFor, fireEvent, screen } from '@testing-library/react';
import React from 'react';
import { useRouter } from 'next/router';
import SearchPodContainer from '../SearchPodContainer';
import { GET_SEARCH_POD_DATA, GET_TYPE_AND_BUDGET_DATA } from '../gql';

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
    pathname: '/',
  }),
}));

// ARRANGE
let mockCalled = false;
const mocks: MockedResponse[] = [
  {
    request: {
      query: GET_SEARCH_POD_DATA,
      variables: {
        vehicleTypes: ['LCV'],
      },
    },
    result: () => {
      mockCalled = true;
      return {
        data: {
          filterList: {
            vehicleTypes: ['LCV'],
            groupedRanges: [
              {
                parent: 'Citroën',
                children: ['Berlingo', 'Dispatch', 'Relay'],
              },
              {
                parent: 'Dacia',
                children: ['Duster'],
              },
              {
                parent: 'BMW',
                children: ['3 series', '4 series'],
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
      query: GET_SEARCH_POD_DATA,
      variables: {
        vehicleTypes: ['CAR'],
      },
    },
    result: () => {
      mockCalled = true;
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
              {
                parent: 'BMW',
                children: ['3 series', '4 series'],
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
      query: GET_TYPE_AND_BUDGET_DATA,
      variables: {
        vehicleTypes: ['LCV'],
        manufacturerName: '',
        rangeName: '',
        bodyStyles: [''],
      },
    },
    result: () => {
      return {
        data: {
          filterList: {
            vehicleTypes: ['LCV'],
            bodyStyles: ['Dropside Tipper', 'Pickup'],
            financeProfilesRateMax: 597.98,
            financeProfilesRateMin: 194.95,
            groupedRanges: [
              {
                parent: 'Citroën',
                children: ['Berlingo', 'Dispatch', 'Relay'],
              },
              {
                parent: 'Dacia',
                children: ['Duster'],
              },
              {
                parent: 'BMW',
                children: ['3 series', '4 series'],
              },
            ],
          },
        },
      };
    },
  },
];

describe('<SearchPodContainer />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockCalled = false;
  });
  it('should make a server request for get data for dropdowns', async () => {
    // ACT
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <SearchPodContainer />
      </MockedProvider>,
    );

    // ASSERT
    await waitFor(() => expect(mockCalled).toBeTruthy());
  });
  it('should select make by model for vans', async () => {
    // ACT
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <SearchPodContainer />
      </MockedProvider>,
    );

    // ASSERT
    await waitFor(() => {
      expect(mockCalled).toBeTruthy();
    });
    fireEvent.click(screen.getByTestId('modelVans'));

    fireEvent.click(screen.getByText('Duster'));
    expect(screen.getByText('Dacia')).toBeInTheDocument();
  });

  it('should be render search pod for only for vans', async () => {
    // ACT
    const pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
      pathname: '/hub/vans',
      query: {
        redirect: null,
      },
    });

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <SearchPodContainer />
      </MockedProvider>,
    );

    // ASSERT
    await waitFor(() => {
      expect(mockCalled).toBeTruthy();
    });
    expect(screen.getByText('Search Van Leasing')).toBeInTheDocument();
  });
  it('should be render search pod for only for pickups', async () => {
    // ACT
    const pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
      pathname: '/hub/pickups',
      query: {
        redirect: null,
      },
    });

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <SearchPodContainer />
      </MockedProvider>,
    );

    // ASSERT
    await waitFor(() => {
      expect(mockCalled).toBeTruthy();
    });
    expect(screen.getByText('Search Pickup Leasing')).toBeInTheDocument();
  });
  it('should be render search pod for only for cars', async () => {
    // ACT
    const pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
      pathname: '/hub/cars',
      query: {
        redirect: null,
      },
    });

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <SearchPodContainer />
      </MockedProvider>,
    );

    // ASSERT
    await waitFor(() => {
      expect(mockCalled).toBeTruthy();
      expect(screen.getByText('Search Car Leasing')).toBeInTheDocument();
    });
  });

  it('should be have uniq search url for vans', async () => {
    // Override the router mock for this test
    const pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
      pathname: '/',
      query: {
        redirect: null,
      },
    });

    // ACT
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <SearchPodContainer />
      </MockedProvider>,
    );

    fireEvent.click(screen.getByTestId('VanssearchBtn'));

    // ASSERT
    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledTimes(1);
      expect(pushMock).toHaveBeenCalledWith({
        pathname: '/van-leasing',
        query: {},
      });
    });
  });
  it('should be have uniq search url for cars', async () => {
    // Override the router mock for this test
    const pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
      pathname: '/',
      query: {
        redirect: null,
      },
    });
    // ACT
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <SearchPodContainer />
      </MockedProvider>,
    );

    fireEvent.click(screen.getByTestId('CarssearchBtn'));

    // ASSERT
    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledTimes(1);
      expect(pushMock).toHaveBeenCalledWith({
        pathname: '/car-leasing',
        query: {},
      });
    });
  });
});
