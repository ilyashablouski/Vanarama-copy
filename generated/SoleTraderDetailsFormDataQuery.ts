/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SoleTraderDetailsFormDataQuery
// ====================================================

export interface SoleTraderDetailsFormDataQuery_allDropDowns_titles {
  __typename: "DropDownDataType";
  data: string[];
  favourites: string[];
}

export interface SoleTraderDetailsFormDataQuery_allDropDowns_countries {
  __typename: "DropDownDataType";
  data: string[];
  favourites: string[];
}

export interface SoleTraderDetailsFormDataQuery_allDropDowns_nationalities {
  __typename: "DropDownDataType";
  data: string[];
  favourites: string[];
}

export interface SoleTraderDetailsFormDataQuery_allDropDowns_maritalStatuses {
  __typename: "DropDownDataType";
  data: string[];
}

export interface SoleTraderDetailsFormDataQuery_allDropDowns_noOfDependants {
  __typename: "DropDownDataType";
  data: string[];
}

export interface SoleTraderDetailsFormDataQuery_allDropDowns_noOfAdultsInHousehold {
  __typename: "DropDownDataType";
  data: string[];
}

export interface SoleTraderDetailsFormDataQuery_allDropDowns_propertyStatuses {
  __typename: "DropDownDataType";
  data: string[];
  favourites: string[];
}

export interface SoleTraderDetailsFormDataQuery_allDropDowns {
  __typename: "DropDownType";
  titles: SoleTraderDetailsFormDataQuery_allDropDowns_titles;
  countries: SoleTraderDetailsFormDataQuery_allDropDowns_countries;
  nationalities: SoleTraderDetailsFormDataQuery_allDropDowns_nationalities;
  maritalStatuses: SoleTraderDetailsFormDataQuery_allDropDowns_maritalStatuses;
  noOfDependants: SoleTraderDetailsFormDataQuery_allDropDowns_noOfDependants;
  noOfAdultsInHousehold: SoleTraderDetailsFormDataQuery_allDropDowns_noOfAdultsInHousehold;
  propertyStatuses: SoleTraderDetailsFormDataQuery_allDropDowns_propertyStatuses;
}

export interface SoleTraderDetailsFormDataQuery {
  /**
   * Get all drop downs
   */
  allDropDowns: SoleTraderDetailsFormDataQuery_allDropDowns | null;
}
