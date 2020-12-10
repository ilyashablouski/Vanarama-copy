import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { render, waitFor, fireEvent, screen } from '@testing-library/react';
import React from 'react';
import preloadAll from 'jest-next-dynamic';
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
        onOffer: null,
      },
    },
    result: () => {
      mockCalled = true;
      return {
        data: {
          filterList: {
            vehicleTypes: ['LCV'],
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
        onOffer: null,
      },
    },
    result: () => {
      mockCalled = true;
      return {
        data: {
          filterList: {
            vehicleTypes: ['CAR'],
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
          },
        },
      };
    },
  },
];

describe('<SearchPodContainer />', () => {
  beforeEach(async () => {
    await preloadAll();
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

  it.skip('should render search pod only for pickups', async () => {
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

  it('should render search pod only for vans', async () => {
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

  it('should render search pod only for cars', async () => {
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

  it('should have unique search url for vans', async () => {
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

    await screen.findByTestId('searchpod');

    fireEvent.click(screen.getByTestId('VanssearchBtn'));

    // ASSERT
    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledTimes(1);
      expect(pushMock).toHaveBeenCalledWith({
        pathname: '/van-leasing/search',
        query: {},
      });
    });
  });

  it('should have unique search url for cars', async () => {
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

    await screen.findByTestId('searchpod');

    fireEvent.click(screen.getByTestId('CarssearchBtn'));

    // ASSERT
    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledTimes(1);
      expect(pushMock).toHaveBeenCalledWith({
        pathname: '/car-leasing/search',
        query: {},
      });
    });
  });
});
