/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: LoginUserMutation
// ====================================================

export interface LoginUserMutation_loginV2 {
  idToken: string | null;
  accessToken: string | null;
}

export interface LoginUserMutation {
  loginV2: LoginUserMutation_loginV2 | null;
}

export interface LoginUserMutationVariables {
  username: string;
  password: string;
}
