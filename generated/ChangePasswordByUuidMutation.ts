/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ChangePasswordByUuidMutation
// ====================================================

export interface ChangePasswordByUuidMutation {
  passwordChange: string | null;
}

export interface ChangePasswordByUuidMutationVariables {
  uuid: string;
  oldPassword: string;
  newPassword: string;
}
