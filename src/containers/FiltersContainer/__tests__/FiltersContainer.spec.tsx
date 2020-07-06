import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import React from 'react';
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
    preSearchVehicleCount: 10,
    isSpecialOffers: true,
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

    render(
      <MockedProvider mocks={mocksResponse} addTypename={false}>
        <FiltersContainer {...mocks} />
      </MockedProvider>,
    );
    // ASSERT
    await waitFor(() => expect(mockCalled).toBeTruthy());
  });
  it('should start new search after change any filter', async () => {
    // ACT
    render(
      <MockedProvider addTypename={false} mocks={mocksResponse}>
        <FiltersContainer {...mocks} />
      </MockedProvider>,
    );
    fireEvent.click(screen.getByTestId('Fuel Type'));
    await waitFor(() => {
      expect(screen.getByText('diesel')).toBeInTheDocument();
    });
    fireEvent.click(screen.getByText('diesel'));
    expect(mocks.onSearch).toHaveBeenCalled();
  });

  it('should render with data', async () => {
    // ACT
    const getComponent = render(
      <MockedProvider mocks={mocksResponse} addTypename={false}>
        <FiltersContainer {...mocks} />
      </MockedProvider>,
    );

    await waitFor(() => {
      expect(mockCalled).toBeTruthy();
      const tree = getComponent.baseElement;
      expect(tree).toMatchSnapshot();
    });
  });
});
