/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LimitedCompanyInputObject } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: SaveCompanyDetailsMutation
// ====================================================

export interface SaveCompanyDetailsMutation_createUpdateLimitedCompany {
  uuid: string;
  partyUuid: string;
}

export interface SaveCompanyDetailsMutation {
  /**
   * Create or update Ltd. Company
   */
  createUpdateLimitedCompany: SaveCompanyDetailsMutation_createUpdateLimitedCompany | null;
}

export interface SaveCompanyDetailsMutationVariables {
  input: LimitedCompanyInputObject;
}
