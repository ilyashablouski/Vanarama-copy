/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: SummaryFormDetailsSectionPerson
// ====================================================

export interface SummaryFormDetailsSectionPerson_emailAddresses {
  __typename: "EmailAddressType";
  uuid: string;
  primary: boolean;
  value: string;
}

export interface SummaryFormDetailsSectionPerson_telephoneNumbers {
  __typename: "TelephoneNumberType";
  uuid: string;
  kind: string | null;
  value: string;
}

export interface SummaryFormDetailsSectionPerson {
  __typename: "PersonType";
  uuid: string;
  emailAddresses: SummaryFormDetailsSectionPerson_emailAddresses[];
  telephoneNumbers: SummaryFormDetailsSectionPerson_telephoneNumbers[] | null;
  title: string | null;
  firstName: string;
  lastName: string;
  dateOfBirth: any | null;
  countryOfBirth: string | null;
  nationality: string | null;
  maritalStatus: string | null;
  noOfDependants: string | null;
  noOfAdultsInHousehold: string | null;
}
