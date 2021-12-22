import React from 'react';
import { shallow } from 'enzyme';
import Drawer from '../Drawer';

describe('<Drawer />', () => {
  it('should render correctly', () => {
    // ACT
    const wrapper = shallow(
      <Drawer
        title="Test"
        isShowDrawer
        onCloseDrawer={jest.fn()}
        dataUiTestId="global-search-page-container"
      />,
    );

    // ASSERT
    expect(wrapper).toMatchSnapshot();
  });
});
