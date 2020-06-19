/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LimitedCompanyInputObject } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: SaveCompanyDetailsMutation
// ====================================================

export interface SaveCompanyDetailsMutation_updateLimitedCompany {
  uuid: string;
}

export interface SaveCompanyDetailsMutation {
  /**
   * Update Ltd. Company
   */
  updateLimitedCompany: SaveCompanyDetailsMutation_updateLimitedCompany | null;
}

export interface SaveCompanyDetailsMutationVariables {
  input: LimitedCompanyInputObject;
}
