/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RegisterForTemporaryAccess
// ====================================================

export interface RegisterForTemporaryAccess_registerForTemporaryAccess_emailAddress {
  uuid: string | null;
  value: string | null;
  kind: string | null;
}

export interface RegisterForTemporaryAccess_registerForTemporaryAccess {
  accessToken: string | null;
  isSuccessfull: boolean | null;
  emailAddress: RegisterForTemporaryAccess_registerForTemporaryAccess_emailAddress | null;
}

export interface RegisterForTemporaryAccess {
  registerForTemporaryAccess: RegisterForTemporaryAccess_registerForTemporaryAccess | null;
}

export interface RegisterForTemporaryAccessVariables {
  username: string;
  firstName: string;
  lastName: string;
}
