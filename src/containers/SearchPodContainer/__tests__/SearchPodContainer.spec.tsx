import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { render, waitFor, fireEvent, screen } from '@testing-library/react';
import React from 'react';
import { useRouter } from 'next/router';
import SearchPodContainer from '../SearchPodContainer';
import { GET_SEARCH_POD_DATA, GET_TYPE_AND_BUDGET_DATA } from '../gql';

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
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
            ],
            bodyStyles: ['Dropside Tipper', 'Large Van'],
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
        modelName: '',
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
          },
        },
      };
    },
  },
];

describe('<SearchPodContainer />', () => {
  afterEach(() => {
    jest.clearAllMocks();
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
  it('should be have uniq search url for vans', async () => {
    // Override the router mock for this test
    const pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
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
      expect(pushMock).toHaveBeenCalledWith(
        { pathname: '/[search]', query: {} },
        '/search',
      );
    });
  });
  it('should be have uniq search url for cars', async () => {
    // Override the router mock for this test
    const pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
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
      expect(pushMock).toHaveBeenCalledWith(
        { pathname: '/[search]', query: {} },
        '/car-leasing-search',
      );
    });
  });
});
