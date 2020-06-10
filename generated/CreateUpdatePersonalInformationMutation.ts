/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PersonInputObject } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateUpdatePersonalInformationMutation
// ====================================================

export interface CreateUpdatePersonalInformationMutation_createUpdatePerson_emailAddresses {
  primary: boolean;
  value: string;
}

export interface CreateUpdatePersonalInformationMutation_createUpdatePerson_telephoneNumbers {
  primary: boolean;
  value: string;
}

export interface CreateUpdatePersonalInformationMutation_createUpdatePerson_addresses {
  uuid: string;
  kind: string | null;
  serviceId: string | null;
  lineOne: string;
  lineTwo: string | null;
  lineThree: string | null;
  city: string;
  postcode: string;
  country: string;
}

export interface CreateUpdatePersonalInformationMutation_createUpdatePerson {
  uuid: string;
  firstName: string;
  lastName: string;
  emailAddresses: CreateUpdatePersonalInformationMutation_createUpdatePerson_emailAddresses[];
  telephoneNumbers: CreateUpdatePersonalInformationMutation_createUpdatePerson_telephoneNumbers[] | null;
  addresses: CreateUpdatePersonalInformationMutation_createUpdatePerson_addresses[] | null;
}

export interface CreateUpdatePersonalInformationMutation {
  /**
   * Create new Person or update existing Person
   */
  createUpdatePerson: CreateUpdatePersonalInformationMutation_createUpdatePerson | null;
}

export interface CreateUpdatePersonalInformationMutationVariables {
  input: PersonInputObject;
}
