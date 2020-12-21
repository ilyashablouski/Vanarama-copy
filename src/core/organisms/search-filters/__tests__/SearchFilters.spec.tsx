import React from 'react';
import { shallow } from 'enzyme';
import SearchFilters from '../SearchFilters';

describe('<SearchFilters />', () => {
  it('should render correctly with children', () => {
    const wrapper = shallow(
      <SearchFilters>
        <div>
          <span>child element</span>
        </div>
      </SearchFilters>,
    );

    // ASSERT
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly with a custom class name', () => {
    const wrapper = shallow(
      <SearchFilters className="some-custom-class-name">
        <p>child element</p>
      </SearchFilters>,
    );

    // ASSERT
    expect(wrapper).toMatchSnapshot();
  });
});
