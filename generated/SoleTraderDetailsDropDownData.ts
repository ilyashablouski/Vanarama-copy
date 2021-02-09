/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: SoleTraderDetailsDropDownData
// ====================================================

export interface SoleTraderDetailsDropDownData_titles {
  __typename: "DropDownDataType";
  data: string[];
  favourites: string[];
}

export interface SoleTraderDetailsDropDownData_countries {
  __typename: "DropDownDataType";
  data: string[];
  favourites: string[];
}

export interface SoleTraderDetailsDropDownData_nationalities {
  __typename: "DropDownDataType";
  data: string[];
  favourites: string[];
}

export interface SoleTraderDetailsDropDownData_maritalStatuses {
  __typename: "DropDownDataType";
  data: string[];
  favourites: string[];
}

export interface SoleTraderDetailsDropDownData_noOfDependants {
  __typename: "DropDownDataType";
  data: string[];
  favourites: string[];
}

export interface SoleTraderDetailsDropDownData_noOfAdultsInHousehold {
  __typename: "DropDownDataType";
  data: string[];
  favourites: string[];
}

export interface SoleTraderDetailsDropDownData_propertyStatuses {
  __typename: "DropDownDataType";
  data: string[];
  favourites: string[];
}

export interface SoleTraderDetailsDropDownData {
  __typename: "DropDownType";
  titles: SoleTraderDetailsDropDownData_titles;
  countries: SoleTraderDetailsDropDownData_countries;
  nationalities: SoleTraderDetailsDropDownData_nationalities;
  maritalStatuses: SoleTraderDetailsDropDownData_maritalStatuses;
  noOfDependants: SoleTraderDetailsDropDownData_noOfDependants;
  noOfAdultsInHousehold: SoleTraderDetailsDropDownData_noOfAdultsInHousehold;
  propertyStatuses: SoleTraderDetailsDropDownData_propertyStatuses;
}
