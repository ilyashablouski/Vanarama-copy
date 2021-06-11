import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import {
  ResetPasswordMutation as Mutation,
  ResetPasswordMutationVariables as MutationVariables,
} from '../../../generated/ResetPasswordMutation';
import ResetPasswordForm from '../../components/ResetPasswordForm';
import { IPasswordResetContainerProps } from './interfaces';

export const RESET_PASSWORD_MUTATION = gql`
  mutation ResetPasswordMutation(
    $verificationCode: String!
    $uuid: ID!
    $password: String!
  ) {
    passwordConfirmV2(
      verificationCode: $verificationCode
      uuid: $uuid
      password: $password
    ) {
      isSuccessful
    }
  }
`;

const PasswordResetContainer = ({
  username,
  code,
  oldPassword,
}: IPasswordResetContainerProps) => {
  const router = useRouter();
  const [resetPassword, { loading, data, called }] = useMutation<
    Mutation,
    MutationVariables
  >(RESET_PASSWORD_MUTATION, {
    onCompleted: () => {
      // Redirect to the login page.
      const nextUrl = '/account/login-register';
      router.push(
        { pathname: nextUrl, query: { hasResetPassword: true } },
        nextUrl,
      );
    },
  });

  return (
    <ResetPasswordForm
      isSubmitting={loading}
      username={username}
      code={code}
      oldPassword={oldPassword}
      hasError={called && data?.passwordConfirmV2?.isSuccessful === false}
      onSubmit={async values => {
        await resetPassword({
          variables: {
            verificationCode: values.code,
            uuid: values.username,
            password: values.password,
          },
        });
      }}
    />
  );
};

export default PasswordResetContainer;
