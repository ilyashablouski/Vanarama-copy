import { shallow } from 'enzyme';
import React from 'react';
import Checkbox from '../Checkbox';

describe('<Checkbox />', () => {
  it('should render correctly in the default state', () => {
    // ACT
    const wrapper = shallow(<Checkbox id="example" label="Label" />);

    // ASSERT
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly with optional props', () => {
    // ACT
    const wrapper = shallow(
      <Checkbox
        className="custom-class-name"
        dataTestId="data-testid"
        id="chechbox-id"
        name="chechbox-name"
        disabled
        invalid
        outline
        label="Label"
      />,
    );

    // ASSERT
    expect(wrapper).toMatchSnapshot();
  });

  it('should be able to be used in controlled mode', () => {
    // ARRANGE
    const onChange = jest.fn();

    // ACT
    const wrapper = shallow(
      <Checkbox id="example" label="Label" onChange={onChange} />,
    );

    wrapper.find('input').simulate('change', { target: { value: 'A' } });

    // ASSERT
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
