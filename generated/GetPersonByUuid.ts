/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPersonByUuid
// ====================================================

export interface GetPersonByUuid_personByUuid {
  firstName: string;
  lastName: string;
  partyUuid: string;
  uuid: string;
}

export interface GetPersonByUuid {
  /**
   * Find Person by Uuid
   */
  personByUuid: GetPersonByUuid_personByUuid | null;
}

export interface GetPersonByUuidVariables {
  uuid: string;
}
