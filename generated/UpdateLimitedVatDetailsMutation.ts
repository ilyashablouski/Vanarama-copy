/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LimitedCompanyInputObject } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateLimitedVatDetailsMutation
// ====================================================

export interface UpdateLimitedVatDetailsMutation_createUpdateLimitedCompany_turnoverPercentageOutsideUk {
  country: string;
  percentage: string;
}

export interface UpdateLimitedVatDetailsMutation_createUpdateLimitedCompany {
  uuid: string;
  isVatRegistered: boolean | null;
  tradesOutsideUk: boolean | null;
  turnoverPercentageOutsideUk: UpdateLimitedVatDetailsMutation_createUpdateLimitedCompany_turnoverPercentageOutsideUk[] | null;
  vatNumber: string | null;
  companyNumber: string | null;
}

export interface UpdateLimitedVatDetailsMutation {
  /**
   * Create or update Ltd. Company
   */
  createUpdateLimitedCompany: UpdateLimitedVatDetailsMutation_createUpdateLimitedCompany | null;
}

export interface UpdateLimitedVatDetailsMutationVariables {
  input: LimitedCompanyInputObject;
}
