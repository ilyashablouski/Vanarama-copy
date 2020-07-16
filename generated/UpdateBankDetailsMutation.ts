/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LimitedCompanyInputObject } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateBankDetailsMutation
// ====================================================

export interface UpdateBankDetailsMutation_createUpdateLimitedCompany_bankAccounts {
  __typename: "BankAccountType";
  accountName: string | null;
  accountNumber: string | null;
  joinedAt: any | null;
  sortCode: string | null;
  updatedAt: any | null;
}

export interface UpdateBankDetailsMutation_createUpdateLimitedCompany {
  uuid: string;
  bankAccounts: UpdateBankDetailsMutation_createUpdateLimitedCompany_bankAccounts[] | null;
}

export interface UpdateBankDetailsMutation {
  /**
   * Create or update Ltd. Company
   */
  createUpdateLimitedCompany: UpdateBankDetailsMutation_createUpdateLimitedCompany | null;
}

export interface UpdateBankDetailsMutationVariables {
  input: LimitedCompanyInputObject;
}
