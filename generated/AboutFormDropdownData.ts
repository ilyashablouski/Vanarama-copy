/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: AboutFormDropdownData
// ====================================================

export interface AboutFormDropdownData_titles {
  __typename: "DropDownDataType";
  data: string[];
  favourites: string[];
}

export interface AboutFormDropdownData_countries {
  __typename: "DropDownDataType";
  data: string[];
  favourites: string[];
}

export interface AboutFormDropdownData_nationalities {
  __typename: "DropDownDataType";
  data: string[];
  favourites: string[];
}

export interface AboutFormDropdownData_maritalStatuses {
  __typename: "DropDownDataType";
  data: string[];
}

export interface AboutFormDropdownData_noOfDependants {
  __typename: "DropDownDataType";
  data: string[];
}

export interface AboutFormDropdownData_noOfAdultsInHousehold {
  __typename: "DropDownDataType";
  data: string[];
}

export interface AboutFormDropdownData_propertyStatuses {
  __typename: "DropDownDataType";
  data: string[];
}

export interface AboutFormDropdownData_employmentStatuses {
  __typename: "DropDownDataType";
  data: string[];
}

export interface AboutFormDropdownData {
  __typename: "DropDownType";
  titles: AboutFormDropdownData_titles;
  countries: AboutFormDropdownData_countries;
  nationalities: AboutFormDropdownData_nationalities;
  maritalStatuses: AboutFormDropdownData_maritalStatuses;
  noOfDependants: AboutFormDropdownData_noOfDependants;
  noOfAdultsInHousehold: AboutFormDropdownData_noOfAdultsInHousehold;
  propertyStatuses: AboutFormDropdownData_propertyStatuses;
  employmentStatuses: AboutFormDropdownData_employmentStatuses;
}
