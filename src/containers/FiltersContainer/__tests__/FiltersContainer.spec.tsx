import { render, waitFor, fireEvent, screen } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { MockedResponse, MockedProvider } from '@apollo/client/testing';
import FiltersContainer from '../FiltersContainer';
import { GET_SEARCH_POD_DATA } from '../../SearchPodContainer/gql';

// ARRANGE
const resetMocks = () => {
  return {
    isPersonal: true,
    setType: jest.fn(),
    isCarSearch: true,
    onSearch: jest.fn(),
    updateCount: jest.fn(),
    preSearchVehicleCount: 10,
  };
};

let mockCalled = false;

const mocksResponse: MockedResponse[] = [
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
            ],
            bodyStyles: ['Dropside Tipper', 'Large Van'],
            transmissions: ['Automatic', 'Manual'],
            fuelTypes: ['diesel', 'iii'],
          },
        },
      };
    },
  },
];

const mocks = resetMocks();

describe('<FiltersContainer />', () => {
  afterEach(() => {
    jest.clearAllMocks();
    mockCalled = false;
  });

  it('should make a server request after render', async () => {
    // ACT

    act(() => {
      render(
        <MockedProvider mocks={mocksResponse} addTypename={false}>
          <FiltersContainer {...mocks} />
        </MockedProvider>,
      );
    });
    // ASSERT
    await waitFor(() => expect(mockCalled).toBeTruthy());
  });
  it('should start new search after change any filter', async () => {
    // ACT
    act(() => {
      render(
        <MockedProvider addTypename={false} mocks={mocksResponse}>
          <FiltersContainer {...mocks} />
        </MockedProvider>,
      );
    });
    await waitFor(() => fireEvent.click(screen.getByTestId('Body Type')));
    fireEvent.click(screen.getByTestId('Body Typebtn'));
    expect(mocks.onSearch).toBeCalled();
  });
  it('should start new search after clear all filters', async () => {
    // ACT
    act(() => {
      render(
        <MockedProvider mocks={mocksResponse} addTypename={false}>
          <FiltersContainer {...mocks} />
        </MockedProvider>,
      );
    });
    await waitFor(() => fireEvent.click(screen.getByText('Clear All')));
    expect(mocks.onSearch).toBeCalled();
  });
});
