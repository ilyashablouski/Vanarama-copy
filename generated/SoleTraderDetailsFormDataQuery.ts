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
  favourites: string[];
}

export interface SoleTraderDetailsFormDataQuery_allDropDowns_noOfDependants {
  __typename: "DropDownDataType";
  data: string[];
  favourites: string[];
}

export interface SoleTraderDetailsFormDataQuery_allDropDowns_noOfAdultsInHousehold {
  __typename: "DropDownDataType";
  data: string[];
  favourites: string[];
}

export interface SoleTraderDetailsFormDataQuery_allDropDowns_occupations {
  __typename: "DropDownDataType";
  data: string[];
  favourites: string[];
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
  occupations: SoleTraderDetailsFormDataQuery_allDropDowns_occupations;
  propertyStatuses: SoleTraderDetailsFormDataQuery_allDropDowns_propertyStatuses;
}

export interface SoleTraderDetailsFormDataQuery_personByUuid_addresses {
  __typename: "AddressType";
  uuid: string;
  serviceId: string | null;
  lineOne: string;
  lineTwo: string | null;
  postcode: string;
  city: string;
  propertyStatus: string | null;
  startedOn: any | null;
}

export interface SoleTraderDetailsFormDataQuery_personByUuid {
  uuid: string;
  partyId: string;
  addresses: SoleTraderDetailsFormDataQuery_personByUuid_addresses[] | null;
}

export interface SoleTraderDetailsFormDataQuery {
  /**
   * Get all drop downs
   */
  allDropDowns: SoleTraderDetailsFormDataQuery_allDropDowns | null;
  /**
   * Find Person by Uuid
   */
  personByUuid: SoleTraderDetailsFormDataQuery_personByUuid | null;
}

export interface SoleTraderDetailsFormDataQueryVariables {
  uuid: string;
}
