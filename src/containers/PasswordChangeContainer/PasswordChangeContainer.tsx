import React, { useEffect } from 'react';
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
    $oldPassword: String!
    $newPassword: String!
  ) {
    passwordChangeV2(oldPassword: $oldPassword, newPassword: $newPassword) {
      isSuccessful
    }
  }
`;

export const IS_PASSWORD_CORRECT = gql`
  mutation IsPasswordCorrectMutation($password: String!) {
    passwordCorrectV2(password: $password) {
      isSuccessful
    }
  }
`;

const PasswordChangeContainer = ({
  onCompleted,
  onNetworkError,
}: IPasswordChangeContainerProps) => {
  const [
    cahngePasswordByUuid,
    { loading, error: changePasswordError },
  ] = useMutation<
    ChangePasswordByUuidMutation,
    ChangePasswordByUuidMutationVariables
  >(CHANGE_PASSWORD_BY_UUID_MUTATION, { onCompleted });

  const [isPasswordCorrect, { error: checkPasswordError }] = useMutation<
    IsPasswordCorrectMutation,
    IsPasswordCorrectMutationVariables
  >(IS_PASSWORD_CORRECT);

  const graphQLErrors =
    changePasswordError?.graphQLErrors ||
    checkPasswordError?.graphQLErrors ||
    [];
  const hasError = graphQLErrors.length > 0;

  useEffect(() => {
    const error = changePasswordError || checkPasswordError;
    if (error && error?.networkError !== null) {
      onNetworkError?.(error?.networkError);
    }
  }, [changePasswordError, checkPasswordError, onNetworkError]);

  return (
    <ResetPasswordForm
      oldPassword
      isSubmitting={loading}
      hasError={hasError}
      onSubmit={async values => {
        await cahngePasswordByUuid({
          variables: {
            oldPassword: values.code,
            newPassword: values.password,
          },
        });
      }}
      onPasswordValidation={async value => {
        const results = await isPasswordCorrect({
          variables: { password: value },
        });

        return Boolean(!results?.data?.passwordCorrectV2?.isSuccessful);
      }}
    />
  );
};

export default PasswordChangeContainer;
