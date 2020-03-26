/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RegisterUserMutation
// ====================================================

export interface RegisterUserMutation_register {
  id: number | null;
}

export interface RegisterUserMutation {
  register: RegisterUserMutation_register | null;
}

export interface RegisterUserMutationVariables {
  username: string;
  password: string;
}
