/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCompanyBankDetailsPageDataQuery
// ====================================================

export interface GetCompanyBankDetailsPageDataQuery_companyByUuid_bankAccounts {
  uuid: string;
  accountName: string | null;
  accountNumber: string | null;
  sortCode: string | null;
  joinedAt: any | null;
}

export interface GetCompanyBankDetailsPageDataQuery_companyByUuid {
  uuid: string;
  bankAccounts: GetCompanyBankDetailsPageDataQuery_companyByUuid_bankAccounts[] | null;
}

export interface GetCompanyBankDetailsPageDataQuery {
  /**
   * Find Company by Uuid
   */
  companyByUuid: GetCompanyBankDetailsPageDataQuery_companyByUuid | null;
}

export interface GetCompanyBankDetailsPageDataQueryVariables {
  uuid: string;
}
