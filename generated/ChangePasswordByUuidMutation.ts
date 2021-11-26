/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ChangePasswordByUuidMutation
// ====================================================

export interface ChangePasswordByUuidMutation_passwordChangeV2 {
  isSuccessful: boolean | null;
}

export interface ChangePasswordByUuidMutation {
  passwordChangeV2: ChangePasswordByUuidMutation_passwordChangeV2 | null;
}

export interface ChangePasswordByUuidMutationVariables {
  oldPassword: string;
  newPassword: string;
}
