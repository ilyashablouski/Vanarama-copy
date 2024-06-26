import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { fireEvent, render, waitFor, screen } from '@testing-library/react';
import React from 'react';
import PasswordResetContainer, {
  RESET_PASSWORD_MUTATION,
} from './PasswordResetContainer';

jest.mock('../../components/ResetPasswordForm/ResetPasswordForm');
jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
    query: {
      redirect: null,
    },
  }),
}));

describe('<PasswordResetContainer />', () => {
  it('should make a server request when the reset password form is submitted', async () => {
    // ARRANGE
    let mockCalled = false;
    const mocks: MockedResponse[] = [
      {
        request: {
          query: RESET_PASSWORD_MUTATION,
          variables: {
            uuid: '69684fa9-35d6-4181-96ee-faf246d1e695',
            password: 'Alpha!23',
            verificationCode: '123123',
          },
        },
        result: () => {
          mockCalled = true;
          return {
            data: {
              passwordConfirmV2: {
                isSuccessful: true,
              },
            },
          };
        },
      },
    ];

    // eslint-disable-next-line no-underscore-dangle, global-require
    require('../../components/ResetPasswordForm/ResetPasswordForm').__setMockValues(
      {
        username: '69684fa9-35d6-4181-96ee-faf246d1e695',
        password: 'Alpha!23',
        code: '123123',
        passwordConfirm: 'Alpha!23',
      },
    );

    // ACT
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <PasswordResetContainer />
      </MockedProvider>,
    );

    fireEvent.submit(screen.getByRole('form'));

    // ASSERT
    await waitFor(() => expect(mockCalled).toBeTruthy());
  });
});
