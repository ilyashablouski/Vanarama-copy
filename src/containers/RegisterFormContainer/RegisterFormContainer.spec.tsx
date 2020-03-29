import { MockedProvider, MockedResponse, wait } from '@apollo/react-testing';
import { mount } from 'enzyme';
import React from 'react';
import { submitForm } from '../../utils/testing';
import RegisterFormContainer, {
  REGISTER_USER_MUTATION,
} from './RegisterFormContainer';

jest.mock('../../components/RegisterForm/RegisterForm');

describe('<RegisterFormContainer />', () => {
  it('should make a server request to register a user when the form is submitted', async () => {
    // ARRANGE
    let mockCalled = false;
    const mocks: MockedResponse[] = [
      {
        request: {
          query: REGISTER_USER_MUTATION,
          variables: {
            username: 'barry@chuckle.com',
            password: 'Alpha!23',
          },
        },
        result: () => {
          mockCalled = true;
          return {
            data: {
              register: {
                id: '1',
              },
            },
          };
        },
      },
    ];

    // eslint-disable-next-line no-underscore-dangle, global-require
    require('../../components/RegisterForm/RegisterForm').__setMockValues({
      email: 'barry@chuckle.com',
      password: 'Alpha!23',
    });

    // ACT
    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <RegisterFormContainer onSuccess={jest.fn()} />
      </MockedProvider>,
    );

    await submitForm(wrapper.find('form'));

    // Wait for the mutation to finish
    await wait(0);

    // ASSERT
    expect(mockCalled).toBeTruthy();
  });

  it('should call `onSuccess` when the user was created successfully', async () => {
    // ARRANGE
    const onSuccess = jest.fn();
    const mocks: MockedResponse[] = [
      {
        request: {
          query: REGISTER_USER_MUTATION,
          variables: {
            username: 'paul@chuckle.com',
            password: 'Passw0rd1',
          },
        },
        result: {
          data: {
            register: {
              id: '1',
            },
          },
        },
      },
    ];

    // eslint-disable-next-line no-underscore-dangle, global-require
    require('../../components/RegisterForm/RegisterForm').__setMockValues({
      email: 'paul@chuckle.com',
      password: 'Passw0rd1',
    });

    // ACT
    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <RegisterFormContainer onSuccess={onSuccess} />
      </MockedProvider>,
    );

    await submitForm(wrapper.find('form'));

    // Wait for the mutation to finish
    await wait(0);

    // ASSERT
    expect(onSuccess).toHaveBeenCalledTimes(1);
  });
});
