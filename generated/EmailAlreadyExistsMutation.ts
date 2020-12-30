/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: EmailAlreadyExistsMutation
// ====================================================

export interface EmailAlreadyExistsMutation_emailAlreadyExists {
  isSuccessfull: boolean | null;
  isExists: boolean | null;
  isTemporary: boolean | null;
}

export interface EmailAlreadyExistsMutation {
  emailAlreadyExists: EmailAlreadyExistsMutation_emailAlreadyExists | null;
}

export interface EmailAlreadyExistsMutationVariables {
  email: string;
}
