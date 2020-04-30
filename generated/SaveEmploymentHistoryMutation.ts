/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EmploymentHistoryInputObject } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: SaveEmploymentHistoryMutation
// ====================================================

export interface SaveEmploymentHistoryMutation_createUpdateEmploymentHistory {
  __typename: "EmploymentHistoryType";
  uuid: string;
  companyAddressServiceId: string | null;
  companyAddressCity: string | null;
  companyAddressLineOne: string | null;
  companyAddressLineTwo: string | null;
  companyAddressPostcode: string | null;
  companyName: string | null;
  contract: string | null;
  employedSinceDate: any | null;
  employmentStatus: string | null;
  grossAnnualIncome: number | null;
  jobTitle: string | null;
  workPhoneNumber: string | null;
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
