import React from 'react';
import { shallow, mount } from 'enzyme';

import LeaseScanner from '../LeaseScanner';
import Button from '../../../atoms/button';

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
    const wrapper = shallow(<LeaseScanner {...mocks} />);
    expect(wrapper.find('.lease-scanner').exists()).toBeTruthy();
  });
  it('should be click to Order now button', () => {
    mocks.startLoading = true;
    const wrapper = mount(<LeaseScanner {...mocks} />);
    expect(wrapper.find('.initial-loading--wrapper').exists()).toBeTruthy();
  });
  it('should be show initialize loading slide', () => {
    mocks.startLoading = true;
    const wrapper = shallow(<LeaseScanner {...mocks} />);
    wrapper
      .find(Button)
      .first()
      .simulate('click');
    expect(mocks.orderNowClick).toHaveBeenCalled();
  });
});
