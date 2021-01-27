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

export interface GetCompanyDirectorDetailsQuery_allDropDowns_titles {
  __typename: "DropDownDataType";
  data: string[];
  favourites: string[];
}

export interface GetCompanyDirectorDetailsQuery_allDropDowns_noOfDependants {
  __typename: "DropDownDataType";
  data: string[];
  favourites: string[];
}

export interface GetCompanyDirectorDetailsQuery_allDropDowns_nationalities {
  __typename: "DropDownDataType";
  data: string[];
  favourites: string[];
}

export interface GetCompanyDirectorDetailsQuery_allDropDowns_propertyStatuses {
  __typename: "DropDownDataType";
  data: string[];
  favourites: string[];
}

export interface GetCompanyDirectorDetailsQuery_allDropDowns {
  __typename: "DropDownType";
  titles: GetCompanyDirectorDetailsQuery_allDropDowns_titles;
  noOfDependants: GetCompanyDirectorDetailsQuery_allDropDowns_noOfDependants;
  nationalities: GetCompanyDirectorDetailsQuery_allDropDowns_nationalities;
  propertyStatuses: GetCompanyDirectorDetailsQuery_allDropDowns_propertyStatuses;
}

export interface GetCompanyDirectorDetailsQuery {
  /**
   * Find Company by Uuid
   */
  companyByUuid: GetCompanyDirectorDetailsQuery_companyByUuid | null;
  /**
   * Get all drop downs
   */
  allDropDowns: GetCompanyDirectorDetailsQuery_allDropDowns | null;
}

export interface GetCompanyDirectorDetailsQueryVariables {
  uuid: string;
}
