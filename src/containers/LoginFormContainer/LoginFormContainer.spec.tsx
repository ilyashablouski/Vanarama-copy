import React from 'react';
import preloadAll from 'jest-next-dynamic';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { fireEvent, render, waitFor, screen } from '@testing-library/react';
import LoginFormContainer, { GET_PERSON_QUERY } from './LoginFormContainer';
import { makeLoginUserMutationMock } from './gql';
import { GET_COMPANIES_BY_PERSON_UUID } from '../../gql/companies';
import { GET_MY_ORDERS_DATA } from '../OrdersInformation/gql';

const EMAIL = 'barry@chuckle.com';
const PASSWORD = 'Alpha!23';

const mocks: MockedResponse[] = [
  makeLoginUserMutationMock(EMAIL, PASSWORD),
  {
    request: {
      query: GET_PERSON_QUERY,
      variables: {},
    },
    result: {},
  },
  {
    request: {
      query: GET_COMPANIES_BY_PERSON_UUID,
      variables: {
        personUuid: '',
      },
    },
    result: {},
  },
  {
    request: {
      query: GET_MY_ORDERS_DATA,
      variables: {
        partyUuid: [],
        filter: 'ALL_ORDERS',
      },
    },
    result: {},
  },
  {
    request: {
      query: GET_MY_ORDERS_DATA,
      variables: {
        partyUuid: [],
        filter: 'ALL_QUOTES',
      },
    },
    result: {},
  },
];

describe('<LoginFormContainer />', () => {
  const onCompleted = jest.fn();

  beforeEach(async () => {
    await preloadAll();
  });

  it('should make a server request to register a user when the form is submitted', async () => {
    // ACT
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <LoginFormContainer onCompleted={onCompleted} />
      </MockedProvider>,
    );

    fireEvent.change(screen.getByTestId('login-form_email'), {
      target: { value: EMAIL },
    });
    fireEvent.input(screen.getByTestId('login-form_password'), {
      target: { value: PASSWORD },
    });

    fireEvent.click(screen.getByTestId('login-form_submit'));

    // ASSERT
    await waitFor(() => {
      expect(onCompleted).toHaveBeenCalledTimes(1);
    });
  });
});
