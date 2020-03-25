/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateUpdatePersonMutation
// ====================================================

export interface CreateUpdatePersonMutation_createUpdatePerson_emailAddresses {
  value: string;
}

export interface CreateUpdatePersonMutation_createUpdatePerson_telephoneNumbers {
  value: string;
}

export interface CreateUpdatePersonMutation_createUpdatePerson {
  id: string;
  uuid: string;
  firstName: string;
  lastName: string;
  middleName: string | null;
  dateOfBirth: any | null;
  maritalStatus: string | null;
  title: string | null;
  emailAddresses: CreateUpdatePersonMutation_createUpdatePerson_emailAddresses[];
  telephoneNumbers: CreateUpdatePersonMutation_createUpdatePerson_telephoneNumbers[] | null;
}

export interface CreateUpdatePersonMutation {
  /**
   * Create new Person or update existing Person
   */
  createUpdatePerson: CreateUpdatePersonMutation_createUpdatePerson | null;
}

export interface CreateUpdatePersonMutationVariables {
  title: string;
  mstatus: string;
  fname: string;
  lname: string;
  mname?: string | null;
  consent: boolean;
  dob: any;
  email: string;
  phone: string;
}
