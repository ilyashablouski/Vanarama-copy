/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: AboutFormPerson
// ====================================================

export interface AboutFormPerson_emailAddresses {
  uuid: string;
  primary: boolean;
  value: string;
}

export interface AboutFormPerson_telephoneNumbers {
  uuid: string;
  kind: string | null;
  value: string;
}

export interface AboutFormPerson {
  __typename: "PersonType";
  uuid: string;
  title: string | null;
  firstName: string;
  lastName: string;
  emailAddresses: AboutFormPerson_emailAddresses[];
  telephoneNumbers: AboutFormPerson_telephoneNumbers[] | null;
  dateOfBirth: any | null;
  countryOfBirth: string | null;
  nationality: string | null;
  maritalStatus: string | null;
  noOfDependants: string | null;
  emailConsent: boolean | null;
}
