/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AllDropDownsQuery
// ====================================================

export interface AllDropDownsQuery_allDropDowns_titles {
  data: string[];
  favourites: string[];
}

export interface AllDropDownsQuery_allDropDowns_countries {
  data: string[];
  favourites: string[];
}

export interface AllDropDownsQuery_allDropDowns_nationalities {
  data: string[];
  favourites: string[];
}

export interface AllDropDownsQuery_allDropDowns_maritalStatuses {
  data: string[];
}

export interface AllDropDownsQuery_allDropDowns_noOfDependants {
  data: string[];
}

export interface AllDropDownsQuery_allDropDowns_noOfAdultsInHousehold {
  data: string[];
}

export interface AllDropDownsQuery_allDropDowns_propertyStatuses {
  data: string[];
}

export interface AllDropDownsQuery_allDropDowns_employmentStatuses {
  data: string[];
}

export interface AllDropDownsQuery_allDropDowns {
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
