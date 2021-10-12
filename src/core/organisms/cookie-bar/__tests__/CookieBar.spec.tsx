import React from 'react';
import { mount } from 'enzyme';

import CookieBar from '../CookieBar';

describe('<CookieBar />', () => {
  it('should render correctly', () => {
    const wrapper = mount(
      <CookieBar
        isVisible
        hideComponent={jest.fn()}
        onAfterHide={jest.fn()}
        onAccept={jest.fn()}
        onDecline={jest.fn()}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
