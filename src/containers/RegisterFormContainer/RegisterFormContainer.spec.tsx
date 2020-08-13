import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { fireEvent, render, waitFor, screen } from '@testing-library/react';
import React from 'react';
import RegisterFormContainer from './RegisterFormContainer';
import { REGISTER_USER_MUTATION } from './gql';

jest.mock('../../components/RegisterForm/RegisterForm');

describe('<RegisterFormContainer />', () => {
  // FIXME: This test fails due to need to mock event from deeper component
  it.skip('should make a server request to register a user when the form is submitted', async () => {
    // ARRANGE
    let mockCalled = false;
    const mocks: MockedResponse[] = [
      {
        request: {
          query: REGISTER_USER_MUTATION,
          variables: {
            firstName: 'Barry',
            lastName: 'Barrys',
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
      firstName: 'Barry',
      lastName: 'Barrys',
      email: 'barry@chuckle.com',
      password: 'Alpha!23',
    });

    // ACT
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <RegisterFormContainer onCompleted={jest.fn()} />
      </MockedProvider>,
    );

    fireEvent.submit(screen.getByRole('form'));

    // ASSERT
    await waitFor(() => expect(mockCalled).toBeTruthy());
  });
  // FIXME: This test fails due to need to mock event from deeper component
  // Also there seems to be an issue with receiving scync rendering in test
  it.skip('should call `onCompleted` when the user was created successfully', async () => {
    // ARRANGE
    const onCompleted = jest.fn();
    const mocks: MockedResponse[] = [
      {
        request: {
          query: REGISTER_USER_MUTATION,
          variables: {
            firstName: 'Paul',
            lastName: 'Pauls',
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
      firstName: 'Paul',
      lastName: 'Pauls',
      email: 'paul@chuckle.com',
      password: 'Passw0rd1',
    });

    // ACT
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <RegisterFormContainer onCompleted={onCompleted} />
      </MockedProvider>,
    );

    fireEvent.submit(screen.getByRole('form'));

    // ASSERT
    await waitFor(() => expect(onCompleted).toHaveBeenCalledTimes(1));
  });
});
