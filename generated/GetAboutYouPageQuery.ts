/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAboutYouPageQuery
// ====================================================

export interface GetAboutYouPageQuery_allDropDowns_titles {
  __typename: "DropDownDataType";
  data: string[];
  favourites: string[];
}

export interface GetAboutYouPageQuery_allDropDowns_countries {
  __typename: "DropDownDataType";
  data: string[];
  favourites: string[];
}

export interface GetAboutYouPageQuery_allDropDowns_nationalities {
  __typename: "DropDownDataType";
  data: string[];
  favourites: string[];
}

export interface GetAboutYouPageQuery_allDropDowns_maritalStatuses {
  __typename: "DropDownDataType";
  data: string[];
}

export interface GetAboutYouPageQuery_allDropDowns_noOfDependants {
  __typename: "DropDownDataType";
  data: string[];
}

export interface GetAboutYouPageQuery_allDropDowns_noOfAdultsInHousehold {
  __typename: "DropDownDataType";
  data: string[];
}

export interface GetAboutYouPageQuery_allDropDowns {
  __typename: "DropDownType";
  titles: GetAboutYouPageQuery_allDropDowns_titles;
  countries: GetAboutYouPageQuery_allDropDowns_countries;
  nationalities: GetAboutYouPageQuery_allDropDowns_nationalities;
  maritalStatuses: GetAboutYouPageQuery_allDropDowns_maritalStatuses;
  noOfDependants: GetAboutYouPageQuery_allDropDowns_noOfDependants;
  noOfAdultsInHousehold: GetAboutYouPageQuery_allDropDowns_noOfAdultsInHousehold;
}

export interface GetAboutYouPageQuery {
  /**
   * get all drop downs
   */
  allDropDowns: GetAboutYouPageQuery_allDropDowns | null;
}
