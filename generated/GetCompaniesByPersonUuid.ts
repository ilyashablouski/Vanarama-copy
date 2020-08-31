/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCompaniesByPersonUuid
// ====================================================

export interface GetCompaniesByPersonUuid_companiesByPersonUuid {
  partyUuid: string;
  uuid: string;
}

export interface GetCompaniesByPersonUuid {
  /**
   * Find Companies by Person Uuid
   */
  companiesByPersonUuid: GetCompaniesByPersonUuid_companiesByPersonUuid[] | null;
}

export interface GetCompaniesByPersonUuidVariables {
  personUuid: string;
}
