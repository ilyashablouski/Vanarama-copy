import { mount } from 'enzyme';
import React from 'react';
import {
  assertTextEquals,
  getElementById,
  submitForm,
} from '../../utils/testing';
import RegisterForm from './RegisterForm';

const getEmailInput = getElementById('registerFormInputEmail');
const getPasswordInput = getElementById('registerFormInputPassword');
const getConfirmPasswordInput = getElementById(
  'registerFormInputConfirmPassword',
);

describe('<RegisterForm />', () => {
  it('should call `onSubmit` once the user has successfully registered', async () => {
    // ARRANGE
    const email = 'barry.chuckle@gmail.com';
    const password = 'Password1';
    const onSubmit = jest.fn();

    // ACT
    const wrapper = mount(<RegisterForm onSubmit={onSubmit} />);

    // Set the email address
    getEmailInput(wrapper).simulate('change', {
      target: { value: email },
    });

    // Set the password
    getPasswordInput(wrapper).simulate('change', {
      target: { value: password },
    });

    // Set the confirm password
    getConfirmPasswordInput(wrapper).simulate('change', {
      target: { value: password },
    });

    await submitForm(wrapper.find('form'));

    // ASSERT
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it('should show required field validation messages', async () => {
    // ARRANGE
    const onSubmit = jest.fn();

    // ACT
    const wrapper = mount(<RegisterForm onSubmit={onSubmit} />);

    await submitForm(wrapper);

    // ASSERT
    assertTextEquals(
      wrapper,
      '#registerFormInputEmailWrapper .textinput--error',
    )('Your Email is required');

    assertTextEquals(
      wrapper,
      '#registerFormInputPasswordWrapper .textinput--error',
    )('Your Password is required');

    assertTextEquals(
      wrapper,
      '#registerFormInputConfirmPasswordWrapper .textinput--error',
    )('Repeat Password is required');

    expect(onSubmit).toHaveBeenCalledTimes(0);
  });

  it('should ensure the password is the correct format', async () => {
    // ARRANGE
    const email = 'barry.chuckle@gmail.com';
    const password = 'foo';
    const onSubmit = jest.fn();

    // ACT
    const wrapper = mount(<RegisterForm onSubmit={onSubmit} />);

    // Set the email address
    getEmailInput(wrapper).simulate('change', { target: { value: email } });

    // Set the password
    getPasswordInput(wrapper).simulate('change', {
      target: { value: password },
    });

    // Set the confirm password
    getConfirmPasswordInput(wrapper).simulate('change', {
      target: { value: password },
    });

    await submitForm(wrapper.find('form'));

    // ASSERT
    assertTextEquals(
      wrapper,
      '#registerFormInputPasswordWrapper .textinput--error',
    )('Your Password does not meet the requirements');

    expect(onSubmit).toHaveBeenCalledTimes(0);
  });

  it('should ensure the password and confirm password match', async () => {
    // ARRANGE
    const email = 'barry.chuckle@gmail.com';
    const password = 'foo';
    const onSubmit = jest.fn();

    // ACT
    const wrapper = mount(<RegisterForm onSubmit={onSubmit} />);

    // Set the email address
    getEmailInput(wrapper).simulate('change', { target: { value: email } });

    // Set the password
    getPasswordInput(wrapper).simulate('change', {
      target: { value: password },
    });

    // Set the confirm password
    getConfirmPasswordInput(wrapper).simulate('change', {
      target: { value: 'not-matching' },
    });

    await submitForm(wrapper.find('form'));

    // ASSERT
    assertTextEquals(
      wrapper,
      '#registerFormInputConfirmPasswordWrapper .textinput--error',
    )('Repeat Password does not match');

    expect(onSubmit).toHaveBeenCalledTimes(0);
  });
});
