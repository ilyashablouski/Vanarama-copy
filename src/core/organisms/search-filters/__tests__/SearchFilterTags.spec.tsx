import React from 'react';
import { shallow, mount } from 'enzyme';
import SearchFilterTags from '../SearchFilterTags';

describe('<SearchFilterTags />', () => {
  it('should render correctly with children & default props', () => {
    const wrapper = shallow(
      <SearchFilterTags
        selectedFilters={[
          { order: 1, value: 'Audi' },
          { order: 5, value: 'Coupe' },
        ]}
      >
        <div>
          <span>child element</span>
        </div>
      </SearchFilterTags>,
    );

    // ASSERT
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly with a custom class name', () => {
    const wrapper = shallow(
      <SearchFilterTags
        selectedFilters={[
          { order: 1, value: 'Audi' },
          { order: 5, value: 'Coupe' },
        ]}
        className="some-custom-class-name"
      >
        <p>child element</p>
      </SearchFilterTags>,
    );

    // ASSERT
    expect(wrapper).toMatchSnapshot();
  });

  it('should call onClearAll when user clicks clearAll button', () => {
    const onClearAll = jest.fn();
    const wrap = mount(
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
    wrap
      .find('#clearAllButton')
      .first()
      .simulate('click');
    expect(onClearAll).toHaveBeenCalledTimes(1);
  });
});
