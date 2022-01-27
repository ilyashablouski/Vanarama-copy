import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import NumericInput from '../NumericInput';

const getComponent = () => {
  return <NumericInput id="accountNumber" placeholder="accountNumber" />;
};

const buildEventAndSetSpy = (key: any) => {
  const event = { key, preventDefault: () => {} };
  jest.spyOn(event, 'preventDefault');

  return event;
};

const simulateKeyPress = (event: any) =>
  fireEvent.keyPress(screen.getAllByPlaceholderText('accountNumber')[0], event);

describe('<NumericInput />', () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = render(getComponent()).container;
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('lets you type numbers', () => {
    const event = buildEventAndSetSpy(3);

    simulateKeyPress(event);

    expect(event.preventDefault).toHaveBeenCalledTimes(0);
  });

  // TODO: fix test
  it.skip('does not let you type non-numbers', () => {
    const event = buildEventAndSetSpy('a');

    simulateKeyPress(event);

    expect(event.preventDefault).toHaveBeenCalledTimes(1);
  });
});
