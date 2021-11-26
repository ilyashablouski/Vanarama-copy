/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: DirectorFieldsDropDownData
// ====================================================

export interface DirectorFieldsDropDownData_titles {
  __typename: "DropDownDataType";
  data: string[];
  favourites: string[];
}

export interface DirectorFieldsDropDownData_noOfDependants {
  __typename: "DropDownDataType";
  data: string[];
  favourites: string[];
}

export interface DirectorFieldsDropDownData_nationalities {
  __typename: "DropDownDataType";
  data: string[];
  favourites: string[];
}

export interface DirectorFieldsDropDownData_propertyStatuses {
  __typename: "DropDownDataType";
  data: string[];
  favourites: string[];
}

export interface DirectorFieldsDropDownData {
  __typename: "DropDownType";
  titles: DirectorFieldsDropDownData_titles;
  noOfDependants: DirectorFieldsDropDownData_noOfDependants;
  nationalities: DirectorFieldsDropDownData_nationalities;
  propertyStatuses: DirectorFieldsDropDownData_propertyStatuses;
}
