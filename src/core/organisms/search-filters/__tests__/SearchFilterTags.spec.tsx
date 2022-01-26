import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import SearchFilterTags from '../SearchFilterTags';

describe('<SearchFilterTags />', () => {
  it('should render correctly with children & default props', () => {
    const wrapper = render(
      <SearchFilterTags
        selectedFilters={[
          { order: 1, value: 'Audi' },
          { order: 5, value: 'Coupe' },
        ]}
        dataUiTestId="cars-search-page"
      >
        <div>
          <span>child element</span>
        </div>
      </SearchFilterTags>,
    ).container;

    // ASSERT
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly with a custom class name', () => {
    const wrapper = render(
      <SearchFilterTags
        selectedFilters={[
          { order: 1, value: 'Audi' },
          { order: 5, value: 'Coupe' },
        ]}
        className="some-custom-class-name"
        dataUiTestId="cars-search-page"
      >
        <p>child element</p>
      </SearchFilterTags>,
    ).container;

    // ASSERT
    expect(wrapper).toMatchSnapshot();
  });

  it('should call onClearAll when user clicks clearAll button', () => {
    const onClearAll = jest.fn();
    render(
      <SearchFilterTags
        selectedFilters={[
          { order: 1, value: 'Audi' },
          { order: 5, value: 'Coupe' },
        ]}
        className="some-custom-class-name"
        onClearAll={onClearAll}
      >
        <p>child element</p>
      </SearchFilterTags>,
    );
    fireEvent.click(screen.getByText('Clear All'));
    expect(onClearAll).toHaveBeenCalledTimes(1);
  });
});
