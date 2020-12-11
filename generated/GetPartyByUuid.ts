/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPartyByUuid
// ====================================================

export interface GetPartyByUuid_partyByUuid_person_companies {
  uuid: string;
  partyId: string;
}

export interface GetPartyByUuid_partyByUuid_person {
  firstName: string;
  lastName: string;
  partyId: string;
  uuid: string;
  companies: GetPartyByUuid_partyByUuid_person_companies[] | null;
}

export interface GetPartyByUuid_partyByUuid_company {
  partyId: string;
  legalName: string | null;
  companyType: string | null;
}

export interface GetPartyByUuid_partyByUuid {
  uuid: string;
  person: GetPartyByUuid_partyByUuid_person | null;
  company: GetPartyByUuid_partyByUuid_company | null;
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
