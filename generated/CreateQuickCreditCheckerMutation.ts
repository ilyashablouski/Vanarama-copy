/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { QuickCreditCheckerInputObject } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateQuickCreditCheckerMutation
// ====================================================

export interface CreateQuickCreditCheckerMutation_quickCreditChecker_person_emailAddresses {
  __typename: "EmailAddressType";
  uuid: string;
  primary: boolean;
  value: string;
}

export interface CreateQuickCreditCheckerMutation_quickCreditChecker_person_addresses {
  __typename: "AddressType";
  serviceId: string | null;
  city: string;
  lineOne: string;
  lineTwo: string | null;
  postcode: string;
}

export interface CreateQuickCreditCheckerMutation_quickCreditChecker_person {
  __typename: "PersonType";
  uuid: string;
  firstName: string;
  lastName: string;
  dateOfBirth: any | null;
  emailAddresses: CreateQuickCreditCheckerMutation_quickCreditChecker_person_emailAddresses[];
  addresses: CreateQuickCreditCheckerMutation_quickCreditChecker_person_addresses[] | null;
  termsAndConditions: boolean | null;
  privacyPolicy: boolean | null;
  emailConsent: boolean | null;
}

export interface CreateQuickCreditCheckerMutation_quickCreditChecker {
  __typename: "QuickCreditCheckerType";
  score: number | null;
  status: number | null;
  person: CreateQuickCreditCheckerMutation_quickCreditChecker_person | null;
}

export interface CreateQuickCreditCheckerMutation {
  /**
   * QuickCreditChecker for soft credit check with minimum data
   */
  quickCreditChecker: CreateQuickCreditCheckerMutation_quickCreditChecker | null;
}

export interface CreateQuickCreditCheckerMutationVariables {
  input: QuickCreditCheckerInputObject;
}
