import * as React from 'react';
import { shallow, mount } from 'enzyme';
import Router from 'next/router';
import PasswordRequest from '../index';

describe('<PasswordRequest />', () => {
  it('renders correctly', () => {
    const onPasswordRequest = jest.fn();

    const wrapper = shallow(
      <PasswordRequest onPasswordRequest={onPasswordRequest} />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  describe('Submit Success', () => {
    let onPasswordRequest;
    let wrapper;

    beforeEach(() => {
      onPasswordRequest = jest.fn();
      Router.push = jest.fn();
      wrapper = mount(
        <PasswordRequest onPasswordRequest={onPasswordRequest} />,
      );
      fillEmailField(wrapper);
      getForm(wrapper).simulate('submit', { preventDefault() {} });
    });

    it('calls onPasswordRequest when successfully submitted with valid email field', () => {
      expect(onPasswordRequest).toHaveBeenCalledTimes(1);
    });

    it('calls Router when successfully submitted with valid email field', () => {
      expect(Router.push).toHaveBeenCalledWith('/account/password-reset');
    });
  });

  describe('Submit Failure', () => {
    let onPasswordRequest;
    let wrapper;

    beforeEach(() => {
      onPasswordRequest = jest.fn();
      Router.push = jest.fn();
      wrapper = mount(
        <PasswordRequest onPasswordRequest={onPasswordRequest} />,
      );
      getForm(wrapper).simulate('submit', { preventDefault() {} });
    });

    it('does not call onPasswordRequest when submitted with invalid email field', () => {
      expect(onPasswordRequest).toHaveBeenCalledTimes(0);
    });
  });
});

function getForm(wrapper) {
  return wrapper.find('form');
}

function fillEmailField(wrapper) {
  const form = getForm(wrapper);

  form
    .find('input')
    .first()
    .simulate('change', { target: { value: 'test@test.com' } });
}
