/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPerson
// ====================================================

export interface GetPerson_getPerson_emailAddresses {
  value: string;
  partyId: string;
}

export interface GetPerson_getPerson {
  uuid: string;
  firstName: string;
  lastName: string;
  partyUuid: string;
  emailAddresses: GetPerson_getPerson_emailAddresses[];
}

export interface GetPerson {
  /**
   * Find Person by JWT token
   */
  getPerson: GetPerson_getPerson | null;
}
