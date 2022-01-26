import React from 'react';
import { render } from '@testing-library/react';
import SearchFilters from '../SearchFilters';

describe('<SearchFilters />', () => {
  it('should render correctly with children', () => {
    const wrapper = render(
      <SearchFilters>
        <div>
          <span>child element</span>
        </div>
      </SearchFilters>,
    );

    // ASSERT
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should render correctly with a custom class name', () => {
    const wrapper = render(
      <SearchFilters className="some-custom-class-name">
        <p>child element</p>
      </SearchFilters>,
    );

    // ASSERT
    expect(wrapper.container).toMatchSnapshot();
  });
});
