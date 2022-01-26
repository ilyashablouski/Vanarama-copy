import React from 'react';

import { render } from '@testing-library/react';
import CookieBar from '../CookieBar';

describe('<CookieBar />', () => {
  it('should render correctly', () => {
    const wrapper = render(
      <CookieBar
        onAccept={jest.fn()}
        onDecline={jest.fn()}
        onAfterHide={jest.fn()}
      />,
    );
    expect(wrapper.container).toMatchSnapshot();
  });
});
