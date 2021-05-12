/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SoleTraderCompanyInputObject } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateSoleTraderBankDetailsMutation
// ====================================================

export interface UpdateSoleTraderBankDetailsMutation_createUpdateSoleTraderCompany_bankAccounts {
  __typename: "BankAccountType";
  uuid: string;
  accountName: string | null;
  accountNumber: string | null;
  joinedAt: any | null;
  sortCode: string | null;
}

export interface UpdateSoleTraderBankDetailsMutation_createUpdateSoleTraderCompany {
  uuid: string;
  bankAccounts: UpdateSoleTraderBankDetailsMutation_createUpdateSoleTraderCompany_bankAccounts[] | null;
}

export interface UpdateSoleTraderBankDetailsMutation {
  /**
   * Create or update Sole Trader Company
   */
  createUpdateSoleTraderCompany: UpdateSoleTraderBankDetailsMutation_createUpdateSoleTraderCompany | null;
}

export interface UpdateSoleTraderBankDetailsMutationVariables {
  input: SoleTraderCompanyInputObject;
}
