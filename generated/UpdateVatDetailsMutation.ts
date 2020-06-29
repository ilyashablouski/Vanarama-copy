/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LimitedCompanyInputObject } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateVatDetailsMutation
// ====================================================

export interface UpdateVatDetailsMutation_updateLimitedCompany {
  uuid: string;
}

export interface UpdateVatDetailsMutation {
  /**
   * Update Ltd. Company
   */
  updateLimitedCompany: UpdateVatDetailsMutation_updateLimitedCompany | null;
}

export interface UpdateVatDetailsMutationVariables {
  input: LimitedCompanyInputObject;
}
