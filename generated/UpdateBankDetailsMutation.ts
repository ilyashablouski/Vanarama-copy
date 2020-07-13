/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LimitedCompanyInputObject } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateBankDetailsMutation
// ====================================================

export interface UpdateBankDetailsMutation_updateLimitedCompany_bankAccounts {
  accountName: string | null;
  accountNumber: string | null;
  sortCode: string | null;
  joinedAt: any | null;
}

export interface UpdateBankDetailsMutation_updateLimitedCompany {
  uuid: string;
  bankAccounts: UpdateBankDetailsMutation_updateLimitedCompany_bankAccounts[] | null;
}

export interface UpdateBankDetailsMutation {
  /**
   * Update Ltd. Company
   */
  updateLimitedCompany: UpdateBankDetailsMutation_updateLimitedCompany | null;
}

export interface UpdateBankDetailsMutationVariables {
  input: LimitedCompanyInputObject;
}
