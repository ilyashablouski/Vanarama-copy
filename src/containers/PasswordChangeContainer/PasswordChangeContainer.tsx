import React from 'react';
import { gql, useMutation } from '@apollo/client';
import {
  ChangePasswordByUuidMutation as Mutation,
  ChangePasswordByUuidMutationVariables as MutationVariables,
} from '../../../generated/ChangePasswordByUuidMutation';
import ResetPasswordForm from '../../components/ResetPasswordForm';
import { IPasswordChangeContainerProps } from './interfaces';

export const CHANGE_PASSWORD_BY_UUID_MUTATION = gql`
  mutation ChangePasswordByUuidMutation(
    $uuid: ID!
    $oldPassword: String!
    $newPassword: String!
  ) {
    passwordChange(
      uuid: $uuid
      oldPassword: $oldPassword
      newPassword: $newPassword
    )
  }
`;

const PasswordChangeContainer = ({
  uuid,
  onCompleted,
}: IPasswordChangeContainerProps) => {
  const [cahngePasswordByUuid, { loading, error }] = useMutation<
    Mutation,
    MutationVariables
  >(CHANGE_PASSWORD_BY_UUID_MUTATION, {
    onCompleted,
  });

  return (
    <ResetPasswordForm
      oldPassword
      isSubmitting={loading}
      hasError={Boolean(error)}
      onSubmit={async values => {
        await cahngePasswordByUuid({
          variables: {
            uuid,
            oldPassword: values.code,
            newPassword: values.password,
          },
        });
      }}
    />
  );
};

export default PasswordChangeContainer;
