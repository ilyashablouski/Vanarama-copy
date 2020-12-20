import React from 'react';
import { mount } from 'enzyme';
import TextInput from '../../textinput';
import NumericInput from '../NumericInput';

const getComponent = () => {
  return <NumericInput id="accountNumber" />;
};

const buildEventAndSetSpy = (key: any) => {
  const event = { key, preventDefault: () => {} };
  jest.spyOn(event, 'preventDefault');

  return event;
};

const simulateKeyPress = (wrapper: any, event: any) => {
  const input = wrapper
    .find(TextInput)
    .at(0)
    .find('input');

  input.simulate('keypress', event);
};

describe('<NumericInput />', () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = mount(getComponent());
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('lets you type numbers', () => {
    const event = buildEventAndSetSpy(3);

    simulateKeyPress(wrapper, event);

    expect(event.preventDefault).toHaveBeenCalledTimes(0);
  });

  it('does not let you type non-numbers', () => {
    const event = buildEventAndSetSpy('a');

    simulateKeyPress(wrapper, event);

    expect(event.preventDefault).toHaveBeenCalledTimes(1);
  });
});
