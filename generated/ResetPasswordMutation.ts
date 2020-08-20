/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ResetPasswordMutation
// ====================================================

export interface ResetPasswordMutation {
  passwordConfirm: string | null;
}

export interface ResetPasswordMutationVariables {
  verificationCode: string;
  username: string;
  password: string;
}
