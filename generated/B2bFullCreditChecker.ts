/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FullCreditCheckerInputObject } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: B2bFullCreditChecker
// ====================================================

export interface B2bFullCreditChecker_b2bFullCreditChecker_creditCheck_creditCheckLines {
  uuid: string | null;
  funder: string | null;
  likelihood: number | null;
}

export interface B2bFullCreditChecker_b2bFullCreditChecker_creditCheck_party_person {
  uuid: string;
  partyId: string;
  partyUuid: string;
  firstName: string;
  lastName: string;
}

export interface B2bFullCreditChecker_b2bFullCreditChecker_creditCheck_party {
  uuid: string;
  person: B2bFullCreditChecker_b2bFullCreditChecker_creditCheck_party_person | null;
}

export interface B2bFullCreditChecker_b2bFullCreditChecker_creditCheck {
  uuid: string;
  createdAt: any | null;
  creditCheckType: string | null;
  creditCheckLines: B2bFullCreditChecker_b2bFullCreditChecker_creditCheck_creditCheckLines[] | null;
  party: B2bFullCreditChecker_b2bFullCreditChecker_creditCheck_party | null;
}

export interface B2bFullCreditChecker_b2bFullCreditChecker {
  creditCheck: B2bFullCreditChecker_b2bFullCreditChecker_creditCheck | null;
}

export interface B2bFullCreditChecker {
  /**
   * B2B full credit checker for Sole trader and Limited companies
   */
  b2bFullCreditChecker: B2bFullCreditChecker_b2bFullCreditChecker | null;
}

export interface B2bFullCreditCheckerVariables {
  input: FullCreditCheckerInputObject;
}
