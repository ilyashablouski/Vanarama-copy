/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: PasswordRequestMutation
// ====================================================

export interface PasswordRequestMutation_passwordReset {
  isSuccessful: boolean | null;
}

export interface PasswordRequestMutation {
  passwordReset: PasswordRequestMutation_passwordReset | null;
}

export interface PasswordRequestMutationVariables {
  username: string;
}
