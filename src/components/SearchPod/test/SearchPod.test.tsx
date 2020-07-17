import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

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
      hasCarMakeSelected: false,
      hasVansMakeSelected: false,
      vansCachedData: {
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
    };
  };

  let mocks = resetMocks();
  beforeEach(() => {
    mocks = resetMocks();
  });

  it('tabs should be changeable', () => {
    render(<SearchPod {...mocks} />);
    fireEvent.click(screen.getByTestId('Carstab'));

    expect(mocks.onChangeTab).toBeCalled();
  });
  it('search button should be clickable', () => {
    render(<SearchPod {...mocks} />);
    fireEvent.click(screen.getByTestId('CarssearchBtn'));
    expect(mocks.onSearch).toBeCalled();
  });
});
