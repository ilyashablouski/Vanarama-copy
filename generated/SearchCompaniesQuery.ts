/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SearchCompaniesQuery
// ====================================================

export interface SearchCompaniesQuery_searchCompanies_nodes {
  title: string;
  companyNumber: string;
  addressSnippet: string | null;
  dateOfCreation: string;
  companyStatus: string;
}

export interface SearchCompaniesQuery_searchCompanies {
  /**
   * A list of nodes.
   */
  nodes: (SearchCompaniesQuery_searchCompanies_nodes | null)[] | null;
}

export interface SearchCompaniesQuery {
  /**
   * Search Companies House companies.
   */
  searchCompanies: SearchCompaniesQuery_searchCompanies;
}

export interface SearchCompaniesQueryVariables {
  searchTerm: string;
}
