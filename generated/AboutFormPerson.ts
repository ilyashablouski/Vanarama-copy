/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: AboutFormPerson
// ====================================================

export interface AboutFormPerson_emailAddresses {
  __typename: "EmailAddressType";
  uuid: string;
  primary: boolean;
  value: string;
  kind: string | null;
}

export interface AboutFormPerson_telephoneNumbers {
  __typename: "TelephoneNumberType";
  uuid: string;
  kind: string | null;
  value: string;
}

export interface AboutFormPerson_companies {
  companyType: string | null;
}

export interface AboutFormPerson {
  __typename: "PersonType";
  uuid: string;
  partyUuid: string;
  title: string | null;
  firstName: string;
  lastName: string;
  emailAddresses: AboutFormPerson_emailAddresses[];
  telephoneNumbers: AboutFormPerson_telephoneNumbers[] | null;
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
  companies: AboutFormPerson_companies[] | null;
  privacyPolicy: boolean | null;
}
