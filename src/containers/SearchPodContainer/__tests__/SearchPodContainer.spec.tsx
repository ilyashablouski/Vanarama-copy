import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { render, waitFor, fireEvent, screen } from '@testing-library/react';
import React from 'react';
import preloadAll from 'jest-next-dynamic';
import { useRouter } from 'next/router';
import SearchPodContainer from '../SearchPodContainer';
import { GET_TYPE_AND_BUDGET_DATA } from '../gql';
import { VehicleTypeEnum } from '../../../../generated/globalTypes';

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
    pathname: '/',
  }),
}));

// ARRANGE
const mocks: MockedResponse[] = [
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
const searchPodCarsData = {
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
    fuelTypes: ['diesel', 'iii'],
  },
};
const searchPodVansData = {
  filterList: {
    vehicleTypes: [VehicleTypeEnum.LCV],
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
};

describe('<SearchPodContainer />', () => {
  beforeEach(async () => {
    await preloadAll();
    jest.clearAllMocks();
  });

  it.skip('should select make by model for vans', async () => {
    // ACT
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <SearchPodContainer
          searchPodVansData={searchPodVansData}
          searchPodCarsData={searchPodCarsData}
        />
      </MockedProvider>,
    );

    // ASSERT
    fireEvent.click(screen.getByTestId('modelVans'));
    fireEvent.click(screen.getByText('Duster'));
    expect(screen.getAllByText('Dacia')[0]).toBeInTheDocument();
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
        <SearchPodContainer
          searchPodVansData={searchPodVansData}
          searchPodCarsData={searchPodCarsData}
        />
      </MockedProvider>,
    );

    // ASSERT
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
        <SearchPodContainer
          searchPodVansData={searchPodVansData}
          searchPodCarsData={searchPodCarsData}
        />
      </MockedProvider>,
    );

    // ASSERT
    await waitFor(() => {
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
        <SearchPodContainer
          searchPodVansData={searchPodVansData}
          searchPodCarsData={searchPodCarsData}
        />
      </MockedProvider>,
    );

    // ASSERT
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
        <SearchPodContainer
          searchPodVansData={searchPodVansData}
          searchPodCarsData={searchPodCarsData}
        />
      </MockedProvider>,
    );

    // ASSERT
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
