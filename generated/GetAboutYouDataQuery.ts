/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAboutYouDataQuery
// ====================================================

export interface GetAboutYouDataQuery_personByUuid_emailAddresses {
  __typename: "EmailAddressType";
  uuid: string;
  primary: boolean;
  value: string;
  kind: string | null;
}

export interface GetAboutYouDataQuery_personByUuid_telephoneNumbers {
  __typename: "TelephoneNumberType";
  uuid: string;
  kind: string | null;
  value: string;
}

export interface GetAboutYouDataQuery_personByUuid_companies {
  companyType: string | null;
}

export interface GetAboutYouDataQuery_personByUuid {
  __typename: "PersonType";
  uuid: string;
  partyUuid: string;
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
  profilingConsent: boolean | null;
  smsConsent: boolean | null;
  termsAndConditions: boolean | null;
  companies: GetAboutYouDataQuery_personByUuid_companies[] | null;
  privacyPolicy: boolean | null;
}

export interface GetAboutYouDataQuery {
  /**
   * Find Person by Uuid
   */
  personByUuid: GetAboutYouDataQuery_personByUuid | null;
}

export interface GetAboutYouDataQueryVariables {
  uuid: string;
}
