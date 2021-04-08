import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { fireEvent, render, waitFor, screen } from '@testing-library/react';
import React from 'react';
import LoginFormContainer from './LoginFormContainer';
import { LOGIN_USER_MUTATION } from './gql';

jest.mock('../../components/LoginForm/LoginForm');

describe('<LoginFormContainer />', () => {
  const onCompletedMock = jest.fn();

  beforeEach(() => {
    onCompletedMock.mockReset();
  });

  // outdated
  it.skip('should make a server request to register a user when the form is submitted', async () => {
    // ARRANGE
    let mockCalled = false;
    const mocks: MockedResponse[] = [
      {
        request: {
          query: LOGIN_USER_MUTATION,
          variables: {
            username: 'barry@chuckle.com',
            password: 'Alpha!23',
          },
        },
        result: () => {
          mockCalled = true;
          return {
            data: {
              login: 'fake-token',
            },
          };
        },
      },
    ];

    // eslint-disable-next-line no-underscore-dangle, global-require
    require('../../components/LoginForm/LoginForm').__setMockValues({
      email: 'barry@chuckle.com',
      password: 'Alpha!23',
    });

    // ACT
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <LoginFormContainer />
      </MockedProvider>,
    );

    fireEvent.submit(screen.getByRole('form'));

    // ASSERT
    await waitFor(() => expect(mockCalled).toBeTruthy());
  });

  // outdated
  it.skip('should store the users token in localstorage after logging in', async () => {
    // ARRANGE
    const mocks: MockedResponse[] = [
      {
        request: {
          query: LOGIN_USER_MUTATION,
          variables: {
            username: 'barry@chuckle.com',
            password: 'Alpha!23',
          },
        },
        result: () => ({
          data: {
            login: 'some-fake-token',
          },
        }),
      },
    ];

    // eslint-disable-next-line no-underscore-dangle, global-require
    require('../../components/LoginForm/LoginForm').__setMockValues({
      email: 'barry@chuckle.com',
      password: 'Alpha!23',
    });

    // ACT
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <LoginFormContainer onCompleted={onCompletedMock} />
      </MockedProvider>,
    );

    fireEvent.submit(screen.getByRole('form'));

    // ASSERT
    await waitFor(() => expect(onCompletedMock).toHaveBeenCalledTimes(1));
    expect(onCompletedMock).toHaveBeenCalledWith({
      login: 'some-fake-token',
    });
  });
});
