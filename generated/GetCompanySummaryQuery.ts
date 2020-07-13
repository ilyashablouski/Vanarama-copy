/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCompanySummaryQuery
// ====================================================

export interface GetCompanySummaryQuery_companyByUuid_addresses {
  __typename: "AddressType";
  uuid: string;
  lineOne: string;
  lineTwo: string | null;
  city: string;
  postcode: string;
  propertyStatus: string | null;
  startedOn: any | null;
}

export interface GetCompanySummaryQuery_companyByUuid_bankAccounts {
  __typename: "BankAccountType";
  uuid: string;
  bankName: string | null;
  accountName: string | null;
  sortCode: string | null;
  accountNumber: string | null;
}

export interface GetCompanySummaryQuery_companyByUuid {
  addresses: GetCompanySummaryQuery_companyByUuid_addresses[] | null;
  bankAccounts: GetCompanySummaryQuery_companyByUuid_bankAccounts[] | null;
}

export interface GetCompanySummaryQuery {
  /**
   * Find Company by Uuid
   */
  companyByUuid: GetCompanySummaryQuery_companyByUuid | null;
}

export interface GetCompanySummaryQueryVariables {
  uuid: string;
}
