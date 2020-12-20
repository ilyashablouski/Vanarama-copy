import React from 'react';
import { shallow, mount } from 'enzyme';

import IconList from '../IconList';
import IconListItem from '../IconListItem';

describe('<IconList />', () => {
  it('renders correctly with default <IconListItem /> child', () => {
    const wrapper = mount(
      <IconList>
        <IconListItem>hello world</IconListItem>
      </IconList>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly with optional props', () => {
    const wrapper = shallow(
      <IconList textColor="teal" dataTestId="testID">
        <li>hello world</li>
      </IconList>,
    );
    expect(wrapper).toMatchSnapshot();
  });
});

describe('<IconListItem />', () => {
  it('renders correctly with children', () => {
    const wrapper = mount(<IconListItem>hello world</IconListItem>);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly with optional props', () => {
    const wrapper = mount(
      <IconListItem iconColor="orange" dataTestId="testID2">
        hello world
      </IconListItem>,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
