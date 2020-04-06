/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AllDropdownsQuery
// ====================================================

export interface AllDropdownsQuery_allDropDowns_titles {
  __typename: "DropDownDataType";
  data: string[];
  favourites: string[];
}

export interface AllDropdownsQuery_allDropDowns_countries {
  __typename: "DropDownDataType";
  data: string[];
  favourites: string[];
}

export interface AllDropdownsQuery_allDropDowns_nationalities {
  __typename: "DropDownDataType";
  data: string[];
  favourites: string[];
}

export interface AllDropdownsQuery_allDropDowns_maritalStatuses {
  __typename: "DropDownDataType";
  data: string[];
}

export interface AllDropdownsQuery_allDropDowns_noOfDependants {
  __typename: "DropDownDataType";
  data: string[];
}

export interface AllDropdownsQuery_allDropDowns_noOfAdultsInHousehold {
  __typename: "DropDownDataType";
  data: string[];
}

export interface AllDropdownsQuery_allDropDowns_propertyStatuses {
  __typename: "DropDownDataType";
  data: string[];
}

export interface AllDropdownsQuery_allDropDowns_employmentStatuses {
  __typename: "DropDownDataType";
  data: string[];
}

export interface AllDropdownsQuery_allDropDowns {
  __typename: "DropDownType";
  titles: AllDropdownsQuery_allDropDowns_titles;
  countries: AllDropdownsQuery_allDropDowns_countries;
  nationalities: AllDropdownsQuery_allDropDowns_nationalities;
  maritalStatuses: AllDropdownsQuery_allDropDowns_maritalStatuses;
  noOfDependants: AllDropdownsQuery_allDropDowns_noOfDependants;
  noOfAdultsInHousehold: AllDropdownsQuery_allDropDowns_noOfAdultsInHousehold;
  propertyStatuses: AllDropdownsQuery_allDropDowns_propertyStatuses;
  employmentStatuses: AllDropdownsQuery_allDropDowns_employmentStatuses;
}

export interface AllDropdownsQuery {
  /**
   * get all drop downs
   */
  allDropDowns: AllDropdownsQuery_allDropDowns | null;
}
