import React from 'react';
import { render } from '@testing-library/react';
import Drawer from '../Drawer';

describe('<Drawer />', () => {
  it('should render correctly', () => {
    // ACT
    const wrapper = render(
      <Drawer
        title="Test"
        isShowDrawer
        onCloseDrawer={jest.fn()}
        dataUiTestId="global-search-page-container"
      />,
    );

    // ASSERT
    expect(wrapper.container).toMatchSnapshot();
  });
});
