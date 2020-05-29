import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
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
    $username: String!
    $password: String!
  ) {
    passwordConfirm(
      verificationCode: $verificationCode
      username: $username
      password: $password
    )
  }
`;

const PasswordResetContainer = ({ username }: IPasswordResetContainerProps) => {
  const router = useRouter();
  const [resetPassword, { loading, error }] = useMutation<
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
      hasError={Boolean(error)}
      onSubmit={async values => {
        await resetPassword({
          variables: {
            verificationCode: values.code,
            username: values.username,
            password: values.password,
          },
        });
      }}
    />
  );
};

export default PasswordResetContainer;
