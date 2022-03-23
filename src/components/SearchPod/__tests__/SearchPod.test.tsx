import React from 'react';
import preloadAll from 'jest-next-dynamic';
import { fireEvent, render, screen } from '@testing-library/react';

import { filterList_filterList as IFilterList } from '../../../../generated/filterList';

import SearchPod from '../SearchPod';
import { tabsFields } from '../../../containers/SearchPodContainer/config';

describe('<SearchPod />', () => {
  const resetMocks = () => {
    return {
      activeTab: 1,
      headingText: 'Search',
      isHomePage: true,
      onChangeTab: jest.fn(),
      config: tabsFields,
      onSearch: jest.fn(),
      registerDropdown: jest.fn(),
      getOptions: () => ['test', 'test22'],
      hasCarManufacturerSelected: false,
      hasVansManufacturerSelected: false,
      vansCachedData: {
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
      } as IFilterList,
    };
  };

  let mocks = resetMocks();
  beforeEach(async () => {
    await preloadAll();
    mocks = resetMocks();
  });

  it.skip('tabs should be changeable', () => {
    render(<SearchPod {...mocks} />);
    fireEvent.click(screen.getByTestId('Carstab'));

    expect(mocks.onChangeTab).toBeCalled();
  });
  it.skip('search button should be clickable', () => {
    render(<SearchPod {...mocks} />);
    fireEvent.click(screen.getByTestId('CarssearchBtn'));
    expect(mocks.onSearch).toBeCalled();
  });
});
