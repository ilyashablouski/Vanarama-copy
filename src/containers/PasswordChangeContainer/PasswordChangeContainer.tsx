import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import {
  ResetPasswordMutation as Mutation,
  ResetPasswordMutationVariables as MutationVariables,
} from '../../../generated/ResetPasswordMutation';
import ResetPasswordForm from '../../components/ResetPasswordForm';
import { IPasswordChangeContainerProps } from './interfaces';

export const CHANGE_PASSWORD_MUTATION = gql`
  mutation ChangePasswordMutation(
    $username: String!
    $oldPassword: String!
    $newPassword: String!
  ) {
    passwordChange(
      username: $username
      oldPassword: $oldPassword
      newPassword: $newPassword
    )
  }
`;

export interface ChangePasswordMutation {
  passwordChange: string | null;
}

export interface ChangePasswordMutationVariables {
  username: string;
  oldPassword: string;
  newPassword: string;
}

const PasswordChangeContainer = ({
  username,
}: IPasswordChangeContainerProps) => {
  const [cahngePassword, { loading, error }] = useMutation<
    ChangePasswordMutation,
    ChangePasswordMutationVariables
  >(CHANGE_PASSWORD_MUTATION, {
    onCompleted: () => {
    },
  });

  return (
    <ResetPasswordForm
      oldPassword
      isSubmitting={loading}
      username={username}
      hasError={Boolean(error)}
      onSubmit={async values => {
        console.log({values})
        // await cahngePassword({
        //   variables: {
        //     username: values.username,
        //     opassword: values.password,
        //   },
        // });
      }}
    />
  );
};

export default PasswordChangeContainer;
