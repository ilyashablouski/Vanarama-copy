/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPartyByUuid
// ====================================================

export interface GetPartyByUuid_partyByUuid_person {
  firstName: string;
  lastName: string;
  partyId: string;
}

export interface GetPartyByUuid_partyByUuid {
  uuid: string;
  person: GetPartyByUuid_partyByUuid_person | null;
}

export interface GetPartyByUuid {
  /**
   * Find Party by Uuid
   */
  partyByUuid: GetPartyByUuid_partyByUuid | null;
}

export interface GetPartyByUuidVariables {
  uuid: string;
}
