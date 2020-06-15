/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getPersonalInformation
// ====================================================

export interface getPersonalInformation_partyByUuid_person {
  uuid: string;
  firstName: string;
  lastName: string;
}

export interface getPersonalInformation_partyByUuid_emailAddresses {
  uuid: string;
  primary: boolean;
  value: string;
}

export interface getPersonalInformation_partyByUuid_telephoneNumbers {
  uuid: string;
  primary: boolean;
  value: string;
}

export interface getPersonalInformation_partyByUuid_addresses {
  uuid: string;
  serviceId: string | null;
  lineOne: string;
  lineTwo: string | null;
  lineThree: string | null;
  city: string;
  kind: string | null;
  postcode: string;
  country: string;
}

export interface getPersonalInformation_partyByUuid {
  uuid: string;
  person: getPersonalInformation_partyByUuid_person | null;
  emailAddresses: getPersonalInformation_partyByUuid_emailAddresses[];
  telephoneNumbers: getPersonalInformation_partyByUuid_telephoneNumbers[] | null;
  addresses: getPersonalInformation_partyByUuid_addresses[] | null;
}

export interface getPersonalInformation {
  /**
   * Find Party by Uuid
   */
  partyByUuid: getPersonalInformation_partyByUuid | null;
}

export interface getPersonalInformationVariables {
  uuid: string;
}
