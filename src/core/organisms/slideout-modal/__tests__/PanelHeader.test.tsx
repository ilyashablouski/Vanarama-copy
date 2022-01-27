import React from 'react';
import { render } from '@testing-library/react';
import PanelHeader from '../PanelHeader';

import { IPanelHeaderProps } from '../interfaces';

import { searchFilters, selectedFilters } from '../__fixtures__';

const getComponent = (props: IPanelHeaderProps) => <PanelHeader {...props} />;

const setOpenPanel = jest.fn();
const setSelectedFiltersState = jest.fn();

describe('<PanelHeader />', () => {
  it('should render correctly', () => {
    // ACT
    const wrapper = render(
      getComponent({
        panelId: 'bodyType',
        label: 'Label',
        searchFilters,
        selectedFilters,
        setOpenPanel,
        setSelectedFiltersState,
      }),
    );

    // ASSERT
    expect(wrapper.container).toMatchSnapshot();
  });
});
