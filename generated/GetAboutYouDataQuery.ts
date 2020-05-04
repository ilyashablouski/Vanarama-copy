/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAboutYouDataQuery
// ====================================================

export interface GetAboutYouDataQuery_allDropDowns_titles {
  __typename: "DropDownDataType";
  data: string[];
  favourites: string[];
}

export interface GetAboutYouDataQuery_allDropDowns_countries {
  __typename: "DropDownDataType";
  data: string[];
  favourites: string[];
}

export interface GetAboutYouDataQuery_allDropDowns_nationalities {
  __typename: "DropDownDataType";
  data: string[];
  favourites: string[];
}

export interface GetAboutYouDataQuery_allDropDowns_maritalStatuses {
  __typename: "DropDownDataType";
  data: string[];
}

export interface GetAboutYouDataQuery_allDropDowns_noOfDependants {
  __typename: "DropDownDataType";
  data: string[];
}

export interface GetAboutYouDataQuery_allDropDowns_noOfAdultsInHousehold {
  __typename: "DropDownDataType";
  data: string[];
}

export interface GetAboutYouDataQuery_allDropDowns {
  __typename: "DropDownType";
  titles: GetAboutYouDataQuery_allDropDowns_titles;
  countries: GetAboutYouDataQuery_allDropDowns_countries;
  nationalities: GetAboutYouDataQuery_allDropDowns_nationalities;
  maritalStatuses: GetAboutYouDataQuery_allDropDowns_maritalStatuses;
  noOfDependants: GetAboutYouDataQuery_allDropDowns_noOfDependants;
  noOfAdultsInHousehold: GetAboutYouDataQuery_allDropDowns_noOfAdultsInHousehold;
}

export interface GetAboutYouDataQuery_personByUuid_emailAddresses {
  __typename: "EmailAddressType";
  uuid: string;
  primary: boolean;
  value: string;
}

export interface GetAboutYouDataQuery_personByUuid_telephoneNumbers {
  __typename: "TelephoneNumberType";
  uuid: string;
  kind: string | null;
  value: string;
}

export interface GetAboutYouDataQuery_personByUuid {
  __typename: "PersonType";
  uuid: string;
  title: string | null;
  firstName: string;
  lastName: string;
  emailAddresses: GetAboutYouDataQuery_personByUuid_emailAddresses[];
  telephoneNumbers: GetAboutYouDataQuery_personByUuid_telephoneNumbers[] | null;
  dateOfBirth: any | null;
  countryOfBirth: string | null;
  nationality: string | null;
  maritalStatus: string | null;
  noOfAdultsInHousehold: string | null;
  noOfDependants: string | null;
  emailConsent: boolean | null;
}

export interface GetAboutYouDataQuery {
  /**
   * get all drop downs
   */
  allDropDowns: GetAboutYouDataQuery_allDropDowns | null;
  /**
   * Find Person by Uuid
   */
  personByUuid: GetAboutYouDataQuery_personByUuid | null;
}

export interface GetAboutYouDataQueryVariables {
  uuid: string;
  includePerson: boolean;
}
