/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EmploymentHistoryInputObject } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: SaveEmploymentHistoryMutation
// ====================================================

export interface SaveEmploymentHistoryMutation_createUpdateEmploymentHistory {
  id: string;
}

export interface SaveEmploymentHistoryMutation {
  /**
   * Create new Employment History or update existing
   */
  createUpdateEmploymentHistory: SaveEmploymentHistoryMutation_createUpdateEmploymentHistory[] | null;
}

export interface SaveEmploymentHistoryMutationVariables {
  input: EmploymentHistoryInputObject;
}
