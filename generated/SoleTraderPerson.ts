/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: SoleTraderPerson
// ====================================================

export interface SoleTraderPerson_emailAddresses {
  __typename: "EmailAddressType";
  primary: boolean;
  value: string;
}

export interface SoleTraderPerson_addresses {
  __typename: "AddressType";
  serviceId: string | null;
  lineOne: string;
  lineTwo: string | null;
  postcode: string;
  city: string;
  propertyStatus: string | null;
  startedOn: any | null;
}

export interface SoleTraderPerson {
  __typename: "PersonType";
  uuid: string;
  title: string | null;
  firstName: string;
  lastName: string;
  gender: string | null;
  emailAddresses: SoleTraderPerson_emailAddresses[];
  dateOfBirth: any | null;
  countryOfBirth: string | null;
  nationality: string | null;
  addresses: SoleTraderPerson_addresses[] | null;
  maritalStatus: string | null;
  noOfAdultsInHousehold: string | null;
  noOfDependants: string | null;
}
