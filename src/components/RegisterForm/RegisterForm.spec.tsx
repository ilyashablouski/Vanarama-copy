import { MockedProvider, wait } from '@apollo/react-testing';
import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { act } from 'react-dom/test-utils';
import RegisterForm, { REGISTER_USER_MUTATION } from './RegisterForm';

const getEmailInput = (wrapper: ReactWrapper) => wrapper.find('#email').last();

const getPasswordInput = (wrapper: ReactWrapper) =>
  wrapper.find('#password').last();

const getConfirmPasswordInput = (wrapper: ReactWrapper) =>
  wrapper.find('#confirmPassword').last();

const submitForm = async (wrapper: ReactWrapper) => {
  // Because react-hook-form uses hooks, we need to wrap in `act` to stop warning occuring
  await act(async () => {
    // Submit the form
    wrapper.find('form').simulate('submit');
    // Wait for the form effects to finish
    await wait(0);
    // Wait for the mutation to finish
    await wait(0);
  });

  wrapper.update();
};

describe('<RegisterForm />', () => {
  it('should allow a user to register with valid credentials', async () => {
    // ARRANGE
    const email = 'barry.chuckle@gmail.com';
    const password = 'Password1';
    const onSuccess = jest.fn();
    const mocks = [
      {
        request: {
          query: REGISTER_USER_MUTATION,
          variables: { username: email, password },
        },
        result: jest.fn().mockReturnValue({
          data: {
            register: { id: '1' },
          },
        }),
      },
    ];

    // ACT
    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <RegisterForm onSuccess={onSuccess} />
      </MockedProvider>,
    );

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

    await submitForm(wrapper);

    // ASSERT
    expect(mocks[0].result).toHaveBeenCalledTimes(1);
    expect(onSuccess).toHaveBeenCalledTimes(1);
  });

  it('should show required field validation messages', async () => {
    // ARRANGE
    const email = 'barry.chuckle@gmail.com';
    const password = 'Password1';
    const onSuccess = jest.fn();
    const mocks = [
      {
        request: {
          query: REGISTER_USER_MUTATION,
          variables: { username: email, password },
        },
        result: jest.fn().mockReturnValue({
          data: {
            register: { id: '1' },
          },
        }),
      },
    ];

    // ACT
    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <RegisterForm onSuccess={onSuccess} />
      </MockedProvider>,
    );

    await submitForm(wrapper);

    // ASSERT
    expect(
      wrapper
        .find('#emailWrapper .textinput--error')
        .last()
        .text(),
    ).toEqual('Your Email is required');

    expect(
      wrapper
        .find('#passwordWrapper .textinput--error')
        .last()
        .text(),
    ).toEqual('Your Password is required');

    expect(
      wrapper
        .find('#confirmPasswordWrapper .textinput--error')
        .last()
        .text(),
    ).toEqual('Repeat Password is required');

    expect(mocks[0].result).toHaveBeenCalledTimes(0);
    expect(onSuccess).toHaveBeenCalledTimes(0);
  });

  it('should ensure the password is the correct format', async () => {
    // ARRANGE
    const email = 'barry.chuckle@gmail.com';
    const password = 'foo';
    const onSuccess = jest.fn();
    const mocks = [
      {
        request: {
          query: REGISTER_USER_MUTATION,
          variables: { username: email, password },
        },
        result: jest.fn().mockReturnValue({
          data: {
            register: { id: '1' },
          },
        }),
      },
    ];

    // ACT
    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <RegisterForm onSuccess={onSuccess} />
      </MockedProvider>,
    );

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

    await submitForm(wrapper);

    // ASSERT
    expect(
      wrapper
        .find('#password .textinput--error')
        .last()
        .text(),
    ).toEqual('Your Password does not meet the requirements');

    expect(mocks[0].result).toHaveBeenCalledTimes(0);
    expect(onSuccess).toHaveBeenCalledTimes(0);
  });
});
