import React from 'react';

import { render, fireEvent } from '@testing-library/react';
import LeaseScanner from '../LeaseScanner';

describe('<LeaseScanner />', () => {
  const resetMocks = () => {
    return {
      price: 229.0,
      orderNowClick: jest.fn(),
      endAnimation: jest.fn(),
      headingText: 'PM inc. VAT',
      leasingProviders: ['test', 'tes3sst', 'tessst'],
      startLoading: false,
    };
  };

  let mocks = resetMocks();

  beforeEach(() => {
    mocks = resetMocks();
  });
  it('should be render', () => {
    const wrapper = render(<LeaseScanner {...mocks} />).container;
    expect(wrapper.getElementsByClassName('lease-scanner')[0]).toBeTruthy();
  });
  it('should be click to Order now button', () => {
    mocks.startLoading = true;
    const wrapper = render(<LeaseScanner {...mocks} />).container;
    expect(
      wrapper.getElementsByClassName('initial-loading--wrapper')[0],
    ).toBeTruthy();
  });
  it('should be show initialize loading slide', () => {
    mocks.startLoading = true;
    const wrapper = render(<LeaseScanner {...mocks} />).container;
    fireEvent.click(wrapper.getElementsByTagName('button')[0]);
    expect(mocks.orderNowClick).toHaveBeenCalled();
  });
});
