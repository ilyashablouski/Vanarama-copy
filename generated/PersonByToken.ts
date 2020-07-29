/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PersonByToken
// ====================================================

export interface PersonByToken_personByToken {
  uuid: string;
  firstName: string | null;
  lastName: string | null;
  partyUuid: string;
}

export interface PersonByToken {
  /**
   * Find Person by JWT token
   */
  personByToken: PersonByToken_personByToken | null;
}

export interface PersonByTokenVariables {
  token: string;
}
