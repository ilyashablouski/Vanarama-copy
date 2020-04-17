/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BankAccountInputObject } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateUpdateBankAccountMutation
// ====================================================

export interface CreateUpdateBankAccountMutation_createUpdateBankAccount {
  id: string;
}

export interface CreateUpdateBankAccountMutation {
  /**
   * Create new Bank Account or update existing
   */
  createUpdateBankAccount: CreateUpdateBankAccountMutation_createUpdateBankAccount | null;
}

export interface CreateUpdateBankAccountMutationVariables {
  input?: BankAccountInputObject | null;
}
