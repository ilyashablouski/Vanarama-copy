/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetDirectorDetailsQuery
// ====================================================

export interface GetDirectorDetailsQuery_allDropDowns_titles {
  __typename: "DropDownDataType";
  data: string[];
  favourites: string[];
}

export interface GetDirectorDetailsQuery_allDropDowns_noOfDependants {
  __typename: "DropDownDataType";
  data: string[];
  favourites: string[];
}

export interface GetDirectorDetailsQuery_allDropDowns_propertyStatuses {
  __typename: "DropDownDataType";
  data: string[];
  favourites: string[];
}

export interface GetDirectorDetailsQuery_allDropDowns {
  __typename: "DropDownType";
  titles: GetDirectorDetailsQuery_allDropDowns_titles;
  noOfDependants: GetDirectorDetailsQuery_allDropDowns_noOfDependants;
  propertyStatuses: GetDirectorDetailsQuery_allDropDowns_propertyStatuses;
}

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
   * Get all drop downs
   */
  allDropDowns: GetDirectorDetailsQuery_allDropDowns | null;
  /**
   * Get Companies House company officers.
   */
  companyOfficers: GetDirectorDetailsQuery_companyOfficers;
}

export interface GetDirectorDetailsQueryVariables {
  companyNumber: string;
}
