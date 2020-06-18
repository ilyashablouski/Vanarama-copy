import React from 'react';
import { gql, useMutation } from '@apollo/client';
import {
  ChangePasswordByUuidMutation,
  ChangePasswordByUuidMutationVariables,
} from '../../../generated/ChangePasswordByUuidMutation';
import {
  IsPasswordCorrectMutation,
  IsPasswordCorrectMutationVariables,
} from '../../../generated/IsPasswordCorrectMutation';
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

export const IS_PASSWORD_CORRECT = gql`
  mutation IsPasswordCorrectMutation($uuid: ID!, $password: String!) {
    passwordCorrect(uuid: $uuid, password: $password)
  }
`;

const PasswordChangeContainer = ({
  uuid,
  onCompleted,
}: IPasswordChangeContainerProps) => {
  const [cahngePasswordByUuid, { loading, error }] = useMutation<
    ChangePasswordByUuidMutation,
    ChangePasswordByUuidMutationVariables
  >(CHANGE_PASSWORD_BY_UUID_MUTATION, { onCompleted });

  const [isPasswordCorrect] = useMutation<
    IsPasswordCorrectMutation,
    IsPasswordCorrectMutationVariables
  >(IS_PASSWORD_CORRECT);

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
      onPasswordValidation={async value => {
        const results = await isPasswordCorrect({
          variables: { uuid, password: value },
        });

        return Boolean(results?.data?.passwordCorrect);
      }}
    />
  );
};

export default PasswordChangeContainer;
