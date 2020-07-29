import React from 'react';
import renderer from 'react-test-renderer';
import SearchPodContainer from '../SearchPodContainer';
import { filterTypeAndBudget, useFilterList } from '../gql';

jest.mock('../gql', () => ({
  filterTypeAndBudget: jest.fn(),
  useFilterList: jest.fn(),
}));

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
    pathname: '/',
  }),
}));

describe('<SearchPodContainer />', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('renders correctly with data', async () => {
    (filterTypeAndBudget as jest.Mock).mockReturnValue([
      jest.fn(),
      {
        data: {
          filterList: {
            vehicleTypes: ['LCV'],
            bodyStyles: ['Dropside Tipper', 'Pickup'],
            financeProfilesRateMax: 597.98,
            financeProfilesRateMin: 124.95,
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
      },
    ]);
    (useFilterList as jest.Mock).mockReturnValue({
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
      refetch: jest.fn(),
    });

    const getComponent = () => {
      return renderer.create(<SearchPodContainer />).toJSON();
    };

    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });
});
