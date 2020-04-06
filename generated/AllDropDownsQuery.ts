/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AllDropDownsQuery
// ====================================================

export interface AllDropDownsQuery_allDropDowns_titles {
  __typename: "DropDownDataType";
  data: string[];
  favourites: string[];
}

export interface AllDropDownsQuery_allDropDowns_countries {
  __typename: "DropDownDataType";
  data: string[];
  favourites: string[];
}

export interface AllDropDownsQuery_allDropDowns_nationalities {
  __typename: "DropDownDataType";
  data: string[];
  favourites: string[];
}

export interface AllDropDownsQuery_allDropDowns_maritalStatuses {
  __typename: "DropDownDataType";
  data: string[];
}

export interface AllDropDownsQuery_allDropDowns_noOfDependants {
  __typename: "DropDownDataType";
  data: string[];
}

export interface AllDropDownsQuery_allDropDowns_noOfAdultsInHousehold {
  __typename: "DropDownDataType";
  data: string[];
}

export interface AllDropDownsQuery_allDropDowns_propertyStatuses {
  __typename: "DropDownDataType";
  data: string[];
}

export interface AllDropDownsQuery_allDropDowns_employmentStatuses {
  __typename: "DropDownDataType";
  data: string[];
}

export interface AllDropDownsQuery_allDropDowns {
  __typename: "DropDownType";
  titles: AllDropDownsQuery_allDropDowns_titles;
  countries: AllDropDownsQuery_allDropDowns_countries;
  nationalities: AllDropDownsQuery_allDropDowns_nationalities;
  maritalStatuses: AllDropDownsQuery_allDropDowns_maritalStatuses;
  noOfDependants: AllDropDownsQuery_allDropDowns_noOfDependants;
  noOfAdultsInHousehold: AllDropDownsQuery_allDropDowns_noOfAdultsInHousehold;
  propertyStatuses: AllDropDownsQuery_allDropDowns_propertyStatuses;
  employmentStatuses: AllDropDownsQuery_allDropDowns_employmentStatuses;
}

export interface AllDropDownsQuery {
  /**
   * get all drop downs
   */
  allDropDowns: AllDropDownsQuery_allDropDowns | null;
}
