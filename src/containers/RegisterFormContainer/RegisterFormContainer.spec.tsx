import { MockedProvider, MockedResponse } from '@apollo/react-testing';
import { fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';
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
    const { getByRole } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <RegisterFormContainer onCompleted={jest.fn()} />
      </MockedProvider>,
    );

    fireEvent.submit(getByRole('form'));

    // ASSERT
    await waitFor(() => expect(mockCalled).toBeTruthy());
  });

  it('should call `onCompleted` when the user was created successfully', async () => {
    // ARRANGE
    const onCompleted = jest.fn();
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
    const { getByRole } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <RegisterFormContainer onCompleted={onCompleted} />
      </MockedProvider>,
    );

    fireEvent.submit(getByRole('form'));

    // ASSERT
    await waitFor(() => expect(onCompleted).toHaveBeenCalledTimes(1));
  });
});
