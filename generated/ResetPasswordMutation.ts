/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ResetPasswordMutation
// ====================================================

export interface ResetPasswordMutation_passwordConfirm {
  isSuccessful: boolean | null;
}

export interface ResetPasswordMutation {
  passwordConfirm: ResetPasswordMutation_passwordConfirm | null;
}

export interface ResetPasswordMutationVariables {
  verificationCode: string;
  username: string;
  password: string;
}
