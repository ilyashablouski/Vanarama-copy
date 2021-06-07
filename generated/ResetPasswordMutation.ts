/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ResetPasswordMutation
// ====================================================

export interface ResetPasswordMutation_passwordConfirmV2 {
  isSuccessful: boolean | null;
}

export interface ResetPasswordMutation {
  passwordConfirmV2: ResetPasswordMutation_passwordConfirmV2 | null;
}

export interface ResetPasswordMutationVariables {
  verificationCode: string;
  uuid: string;
  password: string;
}
