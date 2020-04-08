/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PersonInputObject } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateUpdatePersonMutation
// ====================================================

export interface CreateUpdatePersonMutation_createUpdatePerson {
  id: string;
  partyId: string;
}

export interface CreateUpdatePersonMutation {
  createUpdateIncomeAndExpense: any;
  /**
   * Create new Person or update existing Person
   */
  createUpdatePerson: CreateUpdatePersonMutation_createUpdatePerson | null;
}

export interface CreateUpdatePersonMutationVariables {
  input: PersonInputObject;
}
