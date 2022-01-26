import React from 'react';
import { render } from '@testing-library/react';
import SearchFiltersHead from '../SearchFiltersHead';

describe('<SearchFiltersHead />', () => {
  it('should render correctly with children', () => {
    const wrapper = render(
      <SearchFiltersHead>
        <div>
          <span>child element</span>
        </div>
      </SearchFiltersHead>,
    ).container;

    // ASSERT
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly with a custom class name', () => {
    const wrapper = render(
      <SearchFiltersHead className="some-custom-class-name">
        <div>
          <span>child element</span>
        </div>
      </SearchFiltersHead>,
    ).container;

    // ASSERT
    expect(wrapper).toMatchSnapshot();
  });
});
