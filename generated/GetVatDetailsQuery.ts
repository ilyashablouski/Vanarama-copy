/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetVatDetailsQuery
// ====================================================

export interface GetVatDetailsQuery_companyByUuid_turnoverPercentageOutsideUk {
  country: string;
  percentage: string;
}

export interface GetVatDetailsQuery_companyByUuid {
  uuid: string;
  isVatRegistered: boolean | null;
  tradesOutsideUk: boolean | null;
  turnoverPercentageOutsideUk: GetVatDetailsQuery_companyByUuid_turnoverPercentageOutsideUk[] | null;
  vatNumber: string | null;
}

export interface GetVatDetailsQuery {
  /**
   * Find Company by Uuid
   */
  companyByUuid: GetVatDetailsQuery_companyByUuid | null;
}

export interface GetVatDetailsQueryVariables {
  companyUuid: string;
}
