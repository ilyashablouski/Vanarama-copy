import React from 'react';
import { mount } from 'enzyme';

import CookieBar from '../CookieBar';

describe('<CookieBar />', () => {
  it('should render correctly', () => {
    const wrapper = mount(<CookieBar />);
    expect(wrapper).toMatchSnapshot();
  });
});
