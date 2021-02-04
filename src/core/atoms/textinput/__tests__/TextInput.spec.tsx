import { shallow } from 'enzyme';
import React from 'react';
import TextInput from '../TextInput';

describe('<TextInput />', () => {
  it('should render correctly in the default state', () => {
    // ACT
    const wrapper = shallow(<TextInput />);

    // ASSERT
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly with optional props', () => {
    // ACT
    const wrapper = shallow(
      <TextInput
        calculated
        className="custom-class-name"
        dataTestId="data-testid"
        id="input-id"
        name="input-name"
        placeholder="Placeholder"
        prefix="£"
        width="50ch"
      />,
    );

    // ASSERT
    expect(wrapper).toMatchSnapshot();
  });

  it('should be able to be used in controlled mode', () => {
    // ARRANGE
    const onChange = jest.fn();

    // ACT
    const wrapper = shallow(<TextInput onChange={onChange} />);
    wrapper.find('input').simulate('change', { target: { value: 'A' } });

    // ASSERT
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('should render correctly with a suffix', () => {
    // ACT
    const wrapper = shallow(<TextInput suffix="%" />);

    // ASSERT
    expect(wrapper).toMatchInlineSnapshot(`
      <div
        className="textinput regular"
      >
        <input
          className="textinput--native regular -suffix"
          maxLength={NaN}
          type="text"
        />
        <Memo(Text)
          className="textinput--suffix"
          color="dark"
          size="regular"
        >
          %
        </Memo(Text)>
      </div>
    `);
  });
});
