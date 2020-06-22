/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MyAccount
// ====================================================

export interface MyAccount_myAccountDetailsByPersonUuid_address {
  lineOne: string;
  lineTwo: string | null;
  city: string;
  postcode: string;
  serviceId: string | null;
}

export interface MyAccount_myAccountDetailsByPersonUuid {
  personUuid: string;
  firstName: string;
  lastName: string;
  address: MyAccount_myAccountDetailsByPersonUuid_address | null;
  telephoneNumber: string | null;
  emailAddress: string;
}

export interface MyAccount {
  /**
   * Find Person by email and return personal details for my account section
   */
  myAccountDetailsByPersonUuid: MyAccount_myAccountDetailsByPersonUuid | null;
}

export interface MyAccountVariables {
  personUuid: string;
}
