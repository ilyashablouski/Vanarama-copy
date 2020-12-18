import React from 'react';
import { shallow } from 'enzyme';
import SlideoutModal from '../SlideoutModal';

import { searchFilters, selectedFilters } from '../__fixtures__';

import { ISlideoutModalProps } from '../interfaces';

const getComponent = (props: ISlideoutModalProps) => (
  <SlideoutModal {...props} />
);

describe('<SlideoutModal />', () => {
  it('should render correctly with search filters', () => {
    // ACT
    const wrapper = shallow(getComponent({ searchFilters }));

    // ASSERT
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly with selected filters', () => {
    // ACT
    const wrapper = shallow(getComponent({ searchFilters, selectedFilters }));

    // ASSERT
    expect(wrapper).toMatchSnapshot();
  });
});
