import React from 'react';
import preloadAll from 'jest-next-dynamic';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { fireEvent, render, waitFor, screen } from '@testing-library/react';
import RegisterFormContainer from './RegisterFormContainer';
import {
  makeRegisterUserMutationMock,
  makeEmailAlreadyExistsMutationMock,
} from './gql';

const EMAIL = `barry125@chuckle.com`;
const PASSWORD = 'KyRE4AMZn6kCeZZ';

const mocks: MockedResponse[] = [
  makeEmailAlreadyExistsMutationMock(EMAIL),
  makeRegisterUserMutationMock(EMAIL, PASSWORD),
];

describe('<RegisterFormContainer />', () => {
  const onCompleted = jest.fn();

  beforeEach(async () => {
    onCompleted.mockReset();
    await preloadAll();
  });

  it.skip('should make a server request to register a user when the form is submitted', async () => {
    // ACT
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <RegisterFormContainer onCompleted={onCompleted} />
      </MockedProvider>,
    );

    fireEvent.change(screen.getByTestId('register-form_firstName'), {
      target: { value: 'Barry' },
    });
    fireEvent.change(screen.getByTestId('register-form_lastName'), {
      target: { value: 'Barrys' },
    });
    fireEvent.change(screen.getByTestId('register-form_email'), {
      target: { value: EMAIL },
    });
    fireEvent.change(screen.getByTestId('register-form_password'), {
      target: { value: PASSWORD },
    });
    fireEvent.change(screen.getByTestId('register-form_confirm-password'), {
      target: { value: PASSWORD },
    });

    fireEvent.click(screen.getByTestId('aboutTermsAndCons'));
    fireEvent.click(screen.getByTestId('aboutPrivacyPolicy'));

    fireEvent.click(screen.getByTestId('register-form_submit'));

    await waitFor(() => {
      expect(onCompleted).toHaveBeenCalledTimes(1);
    });
  });
});
