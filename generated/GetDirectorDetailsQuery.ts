/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetDirectorDetailsQuery
// ====================================================

export interface GetDirectorDetailsQuery_companyOfficers_nodes {
  name: string;
}

export interface GetDirectorDetailsQuery_companyOfficers {
  /**
   * A list of nodes.
   */
  nodes: (GetDirectorDetailsQuery_companyOfficers_nodes | null)[] | null;
}

export interface GetDirectorDetailsQuery {
  /**
   * Get Companies House company officers.
   */
  companyOfficers: GetDirectorDetailsQuery_companyOfficers;
}

export interface GetDirectorDetailsQueryVariables {
  companyNumber: string;
}
