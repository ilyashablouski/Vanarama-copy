import { mount } from 'enzyme';
import React from 'react';
import {
  assertTextEquals,
  getElementById,
  submitForm,
} from '../../utils/testing';
import LoginForm from './LoginForm';

const getEmailInput = getElementById('loginFormInputEmail');
const getPasswordInput = getElementById('loginFormInputPassword');

describe('<LoginForm />', () => {
  it('should call `onSubmit` once the user has successfully registered', async () => {
    // ARRANGE
    const email = 'barry.chuckle@gmail.com';
    const password = 'Password1';
    const onSubmit = jest.fn();

    // ACT
    const wrapper = mount(<LoginForm onSubmit={onSubmit} />);

    // Set the email address
    getEmailInput(wrapper).simulate('change', {
      target: { value: email },
    });

    // Set the password
    getPasswordInput(wrapper).simulate('change', {
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
    const wrapper = mount(<LoginForm onSubmit={onSubmit} />);

    await submitForm(wrapper);

    // ASSERT
    assertTextEquals(
      wrapper,
      '#loginFormInputEmailWrapper .textinput--error',
    )('Your Email is required');

    assertTextEquals(
      wrapper,
      '#loginFormInputPasswordWrapper .textinput--error',
    )('Your Password is required');

    expect(onSubmit).toHaveBeenCalledTimes(0);
  });
});
