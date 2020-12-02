/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PersonInputObject } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateUpdatePersonMutation
// ====================================================

export interface CreateUpdatePersonMutation_createUpdatePerson_emailAddresses {
  __typename: "EmailAddressType";
  uuid: string;
  primary: boolean;
  value: string;
  kind: string | null;
}

export interface CreateUpdatePersonMutation_createUpdatePerson_telephoneNumbers {
  __typename: "TelephoneNumberType";
  uuid: string;
  kind: string | null;
  value: string;
}

export interface CreateUpdatePersonMutation_createUpdatePerson_companies {
  companyType: string | null;
}

export interface CreateUpdatePersonMutation_createUpdatePerson {
  __typename: "PersonType";
  uuid: string;
  title: string | null;
  firstName: string;
  lastName: string;
  emailAddresses: CreateUpdatePersonMutation_createUpdatePerson_emailAddresses[];
  telephoneNumbers: CreateUpdatePersonMutation_createUpdatePerson_telephoneNumbers[] | null;
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
  companies: CreateUpdatePersonMutation_createUpdatePerson_companies[] | null;
}

export interface CreateUpdatePersonMutation {
  /**
   * Create new Person or update existing Person
   */
  createUpdatePerson: CreateUpdatePersonMutation_createUpdatePerson | null;
}

export interface CreateUpdatePersonMutationVariables {
  input: PersonInputObject;
}
