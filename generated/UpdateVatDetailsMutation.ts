/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LimitedCompanyInputObject } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateVatDetailsMutation
// ====================================================

export interface UpdateVatDetailsMutation_createUpdateLimitedCompany_turnoverPercentageOutsideUk {
  country: string;
  percentage: string;
}

export interface UpdateVatDetailsMutation_createUpdateLimitedCompany {
  uuid: string;
  isVatRegistered: boolean | null;
  tradesOutsideUk: boolean | null;
  turnoverPercentageOutsideUk: UpdateVatDetailsMutation_createUpdateLimitedCompany_turnoverPercentageOutsideUk[] | null;
  vatNumber: string | null;
}

export interface UpdateVatDetailsMutation {
  /**
   * Create or update Ltd. Company
   */
  createUpdateLimitedCompany: UpdateVatDetailsMutation_createUpdateLimitedCompany | null;
}

export interface UpdateVatDetailsMutationVariables {
  input: LimitedCompanyInputObject;
}
