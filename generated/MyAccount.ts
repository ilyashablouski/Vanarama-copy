/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MyAccount
// ====================================================

export interface MyAccount_myAccountMaskedDetailsByPersonUuid_address {
  lineOne: string;
  lineTwo: string | null;
  city: string;
  postcode: string;
  serviceId: string | null;
}

export interface MyAccount_myAccountMaskedDetailsByPersonUuid {
  personUuid: string;
  firstName: string;
  lastName: string;
  address: MyAccount_myAccountMaskedDetailsByPersonUuid_address | null;
  telephoneNumber: string | null;
  emailAddress: string;
  emailConsent: boolean | null;
  smsConsent: boolean | null;
}

export interface MyAccount {
  /**
   * Find Person by UUID and return personal masked details for my account section
   */
  myAccountMaskedDetailsByPersonUuid: MyAccount_myAccountMaskedDetailsByPersonUuid | null;
}

export interface MyAccountVariables {
  personUuid: string;
}
