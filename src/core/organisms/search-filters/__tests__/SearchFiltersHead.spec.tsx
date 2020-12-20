import React from 'react';
import { shallow } from 'enzyme';
import SearchFiltersHead from '../SearchFiltersHead';

describe('<SearchFiltersHead />', () => {
  it('should render correctly with children', () => {
    const wrapper = shallow(
      <SearchFiltersHead>
        <div>
          <span>child element</span>
        </div>
      </SearchFiltersHead>,
    );

    // ASSERT
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly with a custom class name', () => {
    const wrapper = shallow(
      <SearchFiltersHead className="some-custom-class-name">
        <div>
          <span>child element</span>
        </div>
      </SearchFiltersHead>,
    );

    // ASSERT
    expect(wrapper).toMatchSnapshot();
  });
});
