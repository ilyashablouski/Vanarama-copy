/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LimitedCompanyInputObject } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateLimitedBankDetailsMutation
// ====================================================

export interface UpdateLimitedBankDetailsMutation_createUpdateLimitedCompany_bankAccounts {
  __typename: "BankAccountType";
  uuid: string;
  accountName: string | null;
  accountNumber: string | null;
  joinedAt: any | null;
  sortCode: string | null;
}

export interface UpdateLimitedBankDetailsMutation_createUpdateLimitedCompany {
  uuid: string;
  bankAccounts: UpdateLimitedBankDetailsMutation_createUpdateLimitedCompany_bankAccounts[] | null;
}

export interface UpdateLimitedBankDetailsMutation {
  /**
   * Create or update Ltd. Company
   */
  createUpdateLimitedCompany: UpdateLimitedBankDetailsMutation_createUpdateLimitedCompany | null;
}

export interface UpdateLimitedBankDetailsMutationVariables {
  input: LimitedCompanyInputObject;
}
