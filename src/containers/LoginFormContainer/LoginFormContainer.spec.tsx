import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { fireEvent, render, waitFor, screen } from '@testing-library/react';
import localForage from 'localforage';
import { useRouter } from 'next/router';
import React from 'react';
import LoginFormContainer, { LOGIN_USER_MUTATION } from './LoginFormContainer';

jest.mock('../../components/LoginForm/LoginForm');
jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
    query: {
      redirect: null,
    },
  }),
}));

jest.mock('localforage', () => ({
  setItem: jest.fn(),
}));

describe('<LoginFormContainer />', () => {
  it('should make a server request to register a user when the form is submitted', async () => {
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

  it('should store the users token in localstorage after logging in', async () => {
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
        <LoginFormContainer />
      </MockedProvider>,
    );

    fireEvent.submit(screen.getByRole('form'));

    // ASSERT
    await waitFor(() => expect(localForage.setItem).toHaveBeenCalledTimes(1));
    expect(localForage.setItem).toHaveBeenCalledWith(
      'token',
      'some-fake-token',
    );
  });

  it('should redirect to the users previous page after logging in', async () => {
    // ARRANGE
    const mocks: MockedResponse[] = [
      {
        request: {
          query: LOGIN_USER_MUTATION,
          variables: {
            username: 'paul@chuckle.com',
            password: 'Alpha!23',
          },
        },
        result: () => ({
          data: {
            login: 'another-fake-token',
          },
        }),
      },
    ];

    // Override the router mock for this test
    const pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
      query: {
        redirect: '/previous-page',
      },
    });

    // eslint-disable-next-line no-underscore-dangle, global-require
    require('../../components/LoginForm/LoginForm').__setMockValues({
      email: 'paul@chuckle.com',
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
    await waitFor(() => expect(pushMock).toHaveBeenCalledTimes(1));
    expect(pushMock).toHaveBeenCalledWith('/previous-page');
  });

  it('should redirect to the homepage if there is no previous page', async () => {
    // ARRANGE
    const mocks: MockedResponse[] = [
      {
        request: {
          query: LOGIN_USER_MUTATION,
          variables: {
            username: 'paul@chuckle.com',
            password: 'Alpha!23',
          },
        },
        result: () => ({
          data: {
            login: 'another-fake-token',
          },
        }),
      },
    ];

    // Override the router mock for this test
    const pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
      query: {
        redirect: null,
      },
    });

    // eslint-disable-next-line no-underscore-dangle, global-require
    require('../../components/LoginForm/LoginForm').__setMockValues({
      email: 'paul@chuckle.com',
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
    await waitFor(() => expect(pushMock).toHaveBeenCalledTimes(1));
    expect(pushMock).toHaveBeenCalledWith('/');
  });

  it('should redirect to the homepage if the previous page is an error page', async () => {
    // ARRANGE
    const mocks: MockedResponse[] = [
      {
        request: {
          query: LOGIN_USER_MUTATION,
          variables: {
            username: 'paul@chuckle.com',
            password: 'Alpha!23',
          },
        },
        result: () => ({
          data: {
            login: 'another-fake-token',
          },
        }),
      },
    ];

    // Override the router mock for this test
    const pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
      query: {
        redirect: '/_error',
      },
    });

    // eslint-disable-next-line no-underscore-dangle, global-require
    require('../../components/LoginForm/LoginForm').__setMockValues({
      email: 'paul@chuckle.com',
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
    await waitFor(() => expect(pushMock).toHaveBeenCalledTimes(1));
    expect(pushMock).toHaveBeenCalledWith('/');
  });
});
