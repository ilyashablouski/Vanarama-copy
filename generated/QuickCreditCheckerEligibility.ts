/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: QuickCreditCheckerEligibility
// ====================================================

export interface QuickCreditCheckerEligibility_person_emailAddresses {
  __typename: "EmailAddressType";
  uuid: string;
  primary: boolean;
  value: string;
}

export interface QuickCreditCheckerEligibility_person_addresses {
  __typename: "AddressType";
  serviceId: string | null;
  city: string;
  lineOne: string;
  lineTwo: string | null;
  postcode: string;
}

export interface QuickCreditCheckerEligibility_person {
  __typename: "PersonType";
  uuid: string;
  firstName: string;
  lastName: string;
  dateOfBirth: any | null;
  emailAddresses: QuickCreditCheckerEligibility_person_emailAddresses[];
  addresses: QuickCreditCheckerEligibility_person_addresses[] | null;
  termsAndConditions: boolean | null;
  privacyPolicy: boolean | null;
  emailConsent: boolean | null;
}

export interface QuickCreditCheckerEligibility {
  __typename: "QuickCreditCheckerType";
  score: number | null;
  status: number | null;
  person: QuickCreditCheckerEligibility_person | null;
}
