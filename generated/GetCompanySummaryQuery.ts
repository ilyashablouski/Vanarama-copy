/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCompanySummaryQuery
// ====================================================

export interface GetCompanySummaryQuery_companyByUuid_turnoverPercentageOutsideUk {
  country: string;
  percentage: string;
}

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

export interface GetCompanySummaryQuery_companyByUuid_emailAddresses {
  uuid: string;
  kind: string | null;
  value: string;
  primary: boolean;
}

export interface GetCompanySummaryQuery_companyByUuid_telephoneNumbers {
  uuid: string;
  kind: string | null;
  value: string;
  primary: boolean;
}

export interface GetCompanySummaryQuery_companyByUuid_bankAccounts {
  __typename: "BankAccountType";
  uuid: string;
  accountName: string | null;
  accountNumber: string | null;
  joinedAt: any | null;
  sortCode: string | null;
}

export interface GetCompanySummaryQuery_companyByUuid {
  uuid: string;
  legalName: string | null;
  companyNumber: string | null;
  tradingSince: any | null;
  tradesOutsideUk: boolean | null;
  turnoverPercentageOutsideUk: GetCompanySummaryQuery_companyByUuid_turnoverPercentageOutsideUk[] | null;
  addresses: GetCompanySummaryQuery_companyByUuid_addresses[] | null;
  emailAddresses: GetCompanySummaryQuery_companyByUuid_emailAddresses[];
  telephoneNumbers: GetCompanySummaryQuery_companyByUuid_telephoneNumbers[] | null;
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
