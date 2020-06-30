/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LimitedCompanyInputObject } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateVatDetailsMutation
// ====================================================

export interface UpdateVatDetailsMutation_updateLimitedCompany_turnoverPercentageOutsideUk {
  country: string;
  percentage: string;
}

export interface UpdateVatDetailsMutation_updateLimitedCompany {
  uuid: string;
  isVatRegistered: boolean | null;
  tradesOutsideUk: boolean | null;
  turnoverPercentageOutsideUk: UpdateVatDetailsMutation_updateLimitedCompany_turnoverPercentageOutsideUk[] | null;
  vatNumber: string | null;
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
