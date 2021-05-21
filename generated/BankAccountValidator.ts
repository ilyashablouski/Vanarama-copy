/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: BankAccountValidator
// ====================================================

export interface BankAccountValidator_bankAccountValidator {
  valid: boolean;
}

export interface BankAccountValidator {
  /**
   * Validation of bank accounts
   */
  bankAccountValidator: BankAccountValidator_bankAccountValidator | null;
}

export interface BankAccountValidatorVariables {
  sortCode: string;
  accountNumber: string;
}
