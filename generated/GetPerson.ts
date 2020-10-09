/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPerson
// ====================================================

export interface GetPerson_getPerson {
  uuid: string;
  firstName: string;
  lastName: string;
  partyUuid: string;
}

export interface GetPerson {
  /**
   * Find Person by JWT token
   */
  getPerson: GetPerson_getPerson | null;
}
