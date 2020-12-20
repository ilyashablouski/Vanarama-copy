import React from 'react';
import { shallow } from 'enzyme';
import NavItem from '../NavItem';

import { INavItemProps } from '../interfaces';

const getComponent = (props: INavItemProps) => <NavItem {...props} />;

const onClick = jest.fn();

describe('<NavItem />', () => {
  it('should render correctly', () => {
    // ACT
    const wrapper = shallow(getComponent({ label: 'Label', onClick }));

    // ASSERT
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly with selected', () => {
    const selected = ['One', 'Two', 'Three'];
    // ACT
    const wrapper = shallow(
      getComponent({
        label: 'Label',
        onClick,
        selected,
      }),
    );

    // ASSERT
    expect(wrapper).toMatchSnapshot();
  });
});
