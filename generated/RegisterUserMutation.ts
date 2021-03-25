/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RegisterUserMutation
// ====================================================

export interface RegisterUserMutation_register {
  uuid: string | null;
}

export interface RegisterUserMutation {
  register: RegisterUserMutation_register | null;
}

export interface RegisterUserMutationVariables {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  termsAndConditions: boolean;
  privacyPolicy: boolean;
  communicationsConsent?: boolean | null;
  redirectUrl?: string | null;
}
