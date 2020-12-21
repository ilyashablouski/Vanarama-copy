import React from 'react';
import { shallow } from 'enzyme';
import PanelHeader from '../PanelHeader';

import { IPanelHeaderProps } from '../interfaces';

import { searchFilters, selectedFilters } from '../__fixtures__';

const getComponent = (props: IPanelHeaderProps) => <PanelHeader {...props} />;

const setOpenPanel = jest.fn();
const setSelectedFiltersState = jest.fn();

describe('<PanelHeader />', () => {
  it('should render correctly', () => {
    // ACT
    const wrapper = shallow(
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
    expect(wrapper).toMatchSnapshot();
  });
});
