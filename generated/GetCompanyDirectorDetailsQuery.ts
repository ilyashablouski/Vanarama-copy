/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCompanyDirectorDetailsQuery
// ====================================================

export interface GetCompanyDirectorDetailsQuery_companyByUuid {
  uuid: string;
  companyNumber: string | null;
}

export interface GetCompanyDirectorDetailsQuery {
  /**
   * Find Company by Uuid
   */
  companyByUuid: GetCompanyDirectorDetailsQuery_companyByUuid | null;
}

export interface GetCompanyDirectorDetailsQueryVariables {
  uuid: string;
}
