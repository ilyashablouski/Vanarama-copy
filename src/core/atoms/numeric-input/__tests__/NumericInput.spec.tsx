import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import NumericInput from '../NumericInput';

const getComponent = () => {
  return <NumericInput id="accountNumber" placeholder="accountNumber" />;
};

describe('<NumericInput />', () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = render(getComponent()).container;
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('lets you type numbers', () => {
    const elem = screen.getAllByPlaceholderText('accountNumber')[0];
    const event = fireEvent.keyPress(elem, {
      key: '6',
      code: 'Digit6',
      charCode: 54,
    });
    expect(event).toBe(true);
  });

  it('does not let you type non-numbers', () => {
    const elem = screen.getAllByPlaceholderText('accountNumber')[0];
    const event = fireEvent.keyPress(elem, {
      key: 'f',
      code: 'KeyF',
      charCode: 102,
    });
    expect(event).toBe(false);
  });
});
