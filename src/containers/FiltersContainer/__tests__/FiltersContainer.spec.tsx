import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { MockedResponse, MockedProvider } from '@apollo/client/testing';
import preloadAll from 'jest-next-dynamic';
import FiltersContainer from '../FiltersContainer';

import { GET_SEARCH_POD_DATA } from '../../SearchPodContainer/gql';
import SearchPageFilters from '../../../components/SearchPageFilters';
import { OnOffer } from '../../../../entities/global';

// ARRANGE
const resetMocks = () => {
  return {
    isPersonal: true,
    setType: jest.fn(),
    tagArrayBuilderHelper: () => [],
    initialState: {
      bodyStyles: [],
      transmissions: [],
      fuelTypes: [],
      manufacturer: [],
      model: [],
      from: [],
      to: [],
    },
    dataUiTestId: 'cars-search-page',
  };
};

const resetChildrenMocks = () => {
  return {
    isPersonal: true,
    isCarSearch: true,
    onSearch: jest.fn(),
    preSearchVehicleCount: 10,
    isSpecialOffers: true,
    setIsSpecialOffers: jest.fn(),
    isPreloadList: false,
    setSearchFilters: jest.fn(),
    dataUiTestId: 'cars-search-page',
  };
};

jest.mock('next/router', () => ({
  useRouter() {
    return {
      query: {},
    };
  },
}));

jest.mock('../../../hooks/useMediaQuery');

let mockCalled = false;

const mocksResponse: MockedResponse[] = [
  {
    request: {
      query: GET_SEARCH_POD_DATA,
      variables: {
        vehicleTypes: ['CAR'],
        onOffer: OnOffer.FILTER_ENABLED_AND_SET_TO_TRUE,
        bodyStyles: [],
        fuelTypes: [],
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
            fuelTypes: ['diesel', 'petrol'],
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
        onOffer: OnOffer.FILTER_ENABLED_AND_SET_TO_TRUE,
        fuelTypes: ['diesel'],
        bodyStyles: [],
        transmissions: [],
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
];

const mocks = resetMocks();
const childMocks = resetChildrenMocks();

describe('<FiltersContainer />', () => {
  beforeEach(async () => {
    await preloadAll();
  });
  afterEach(() => {
    jest.clearAllMocks();
    mockCalled = false;
  });

  it('should make a server request after render', async () => {
    // ACT

    render(
      <MockedProvider mocks={mocksResponse} addTypename={false}>
        <FiltersContainer
          {...mocks}
          renderFilters={innerProps => (
            <SearchPageFilters {...childMocks} {...innerProps} />
          )}
        />
      </MockedProvider>,
    );
    // ASSERT
    await waitFor(() => expect(mockCalled).toBeTruthy());
  });
  // refetch issue
  /*   it('should start new search after change any filter', async () => {
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
    expect(screen.getByText('diesel', { selector: 'div' })).toBeInTheDocument();
    expect(mocks.onSearch).toHaveBeenCalled();
  });
  it('tags shoud removing', async () => {
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
    expect(screen.getByText('diesel', { selector: 'div' })).toBeInTheDocument();
    fireEvent.click(screen.getByText('diesel', { selector: 'div' }));
    expect(screen.getAllByText('diesel')).toHaveLength(1);
  }); */
  // refetch issue
  /* it('should be clean btn render and work in dropdowns', async () => {
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
    expect(screen.getByText('Clear', { selector: 'div' })).toBeInTheDocument();
    fireEvent.click(screen.getByText('Clear', { selector: 'div' }));
    expect(screen.getAllByText('diesel')).toHaveLength(1);
  }); */
  // refetch issue
  /*   it('clear all should work', async () => {
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
    fireEvent.click(screen.getByText('iii'));
    fireEvent.click(screen.getByText('Clear All'));
    expect(screen.getAllByText('diesel')).toHaveLength(1);
    expect(screen.getAllByText('iii')).toHaveLength(1);
  }); */

  it('price toogle should work', async () => {
    // ACT
    render(
      <MockedProvider addTypename={false} mocks={mocksResponse}>
        <FiltersContainer
          {...mocks}
          renderFilters={innerProps => (
            <SearchPageFilters {...childMocks} {...innerProps} />
          )}
        />
      </MockedProvider>,
    );
    await waitFor(() => {
      expect(screen.getByText('diesel')).toBeInTheDocument();
      fireEvent.click(screen.getByText(/Business/i));
      expect(mocks.setType).toBeCalled();
    });
  });

  it('should render with data', async () => {
    // ACT
    const getComponent = render(
      <MockedProvider mocks={mocksResponse} addTypename={false}>
        <FiltersContainer
          {...mocks}
          renderFilters={innerProps => (
            <SearchPageFilters {...childMocks} {...innerProps} />
          )}
        />
      </MockedProvider>,
    );

    await waitFor(() => {
      expect(mockCalled).toBeTruthy();
      const tree = getComponent.baseElement;
      expect(tree).toMatchSnapshot();
    });
  });
});
