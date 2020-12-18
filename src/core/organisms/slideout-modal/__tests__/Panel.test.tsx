import React from 'react';
import { shallow } from 'enzyme';
import Panel from '../Panel';

import { IPanelProps } from '../interfaces';

import { searchFilters, selectedFilters } from '../__fixtures__';

const getComponent = (props: IPanelProps) => <Panel {...props} />;

const setOpenPanel = jest.fn();
const setSelectedFiltersState = jest.fn();

describe('<Panel />', () => {
  it('should render correctly with correct panel id', () => {
    // ACT
    const wrapper = shallow(
      getComponent({
        panelId: 'bodyType',
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
