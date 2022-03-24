import React from 'react';
import preloadAll from 'jest-next-dynamic';
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
  beforeEach(async () => {
    await preloadAll();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it.skip('renders correctly with data', async () => {
    (filterTypeAndBudget as jest.Mock).mockReturnValue([
      jest.fn(),
      {
        data: {
          filterList: {
            vehicleTypes: ['LCV'],
            bodyStyles: ['Dropside Tipper', 'Pickup'],
            financeProfilesRateMax: 597.98,
            financeProfilesRateMin: 124.95,
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
      },
    ]);
    (useFilterList as jest.Mock).mockReturnValue({
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
