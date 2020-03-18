import * as React from 'react';
import { shallow, mount } from 'enzyme';
import Router from 'next/router';
import PasswordReset from '../index';

describe('<PasswordReset />', () => {
  it('renders correctly', () => {
    const onPasswordReset = jest.fn();

    const wrapper = shallow(
      <PasswordReset onPasswordReset={onPasswordReset} />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  describe('Submit Success', () => {
    let onPasswordReset;
    let wrapper;

    beforeEach(() => {
      onPasswordReset = jest.fn();
      Router.push = jest.fn();
      wrapper = mount(<PasswordReset onPasswordReset={onPasswordReset} />);
      fillFields(wrapper);
      getForm(wrapper).simulate('submit', { preventDefault() {} });
    });

    it('calls onPasswordReset when successfully submitted with valid email field', () => {
      expect(onPasswordReset).toHaveBeenCalledTimes(1);
    });

    it('calls Router when successfully submitted with valid email field', () => {
      expect(Router.push).toHaveBeenCalledWith('/login');
    });
  });

  describe('Submit Failure', () => {
    let onPasswordReset;
    let wrapper;

    beforeEach(() => {
      onPasswordReset = jest.fn();
      Router.push = jest.fn();
      wrapper = mount(<PasswordReset onPasswordReset={onPasswordReset} />);
      getForm(wrapper).simulate('submit', { preventDefault() {} });
    });

    it('does not call onPasswordReset when submitted with invalid email field', () => {
      expect(onPasswordReset).toHaveBeenCalledTimes(0);
    });
  });
});

function getForm(wrapper) {
  return wrapper.find('form');
}

function fillFields(wrapper) {
  const form = getForm(wrapper);

  form
    .find('#verificationCode')
    .first()
    .simulate('change', { target: { value: 'test' } });

  form
    .find('#password')
    .first()
    .simulate('change', { target: { value: 'test' } });

  form
    .find('#repeatPassword')
    .first()
    .simulate('change', { target: { value: 'test' } });
}
