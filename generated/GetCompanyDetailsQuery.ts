/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCompanyDetailsQuery
// ====================================================

export interface GetCompanyDetailsQuery_companyByUuid_turnoverPercentageOutsideUk {
  country: string;
  percentage: string;
}

export interface GetCompanyDetailsQuery_companyByUuid_addresses {
  uuid: string;
  kind: string | null;
  lineOne: string;
  lineTwo: string | null;
  country: string;
  city: string;
  postcode: string;
}

export interface GetCompanyDetailsQuery_companyByUuid_emailAddresses {
  uuid: string;
  kind: string | null;
  value: string;
  primary: boolean;
}

export interface GetCompanyDetailsQuery_companyByUuid_telephoneNumbers {
  uuid: string;
  kind: string | null;
  value: string;
  primary: boolean;
}

export interface GetCompanyDetailsQuery_companyByUuid {
  __typename: "CompanyType";
  uuid: string;
  legalName: string | null;
  companyNumber: string | null;
  companyNature: string | null;
  tradesOutsideUk: boolean | null;
  tradingSince: any | null;
  turnoverPercentageOutsideUk: GetCompanyDetailsQuery_companyByUuid_turnoverPercentageOutsideUk[] | null;
  addresses: GetCompanyDetailsQuery_companyByUuid_addresses[] | null;
  emailAddresses: GetCompanyDetailsQuery_companyByUuid_emailAddresses[];
  telephoneNumbers: GetCompanyDetailsQuery_companyByUuid_telephoneNumbers[] | null;
}

export interface GetCompanyDetailsQuery {
  /**
   * Find Company by Uuid
   */
  companyByUuid: GetCompanyDetailsQuery_companyByUuid | null;
}

export interface GetCompanyDetailsQueryVariables {
  companyUuid: string;
}
