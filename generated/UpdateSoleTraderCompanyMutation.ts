/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SoleTraderCompanyInputObject } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateSoleTraderCompanyMutation
// ====================================================

export interface UpdateSoleTraderCompanyMutation_createUpdateSoleTraderCompany {
  uuid: string;
  partyUuid: string;
}

export interface UpdateSoleTraderCompanyMutation {
  /**
   * Create or update Sole Trader Company
   */
  createUpdateSoleTraderCompany: UpdateSoleTraderCompanyMutation_createUpdateSoleTraderCompany | null;
}

export interface UpdateSoleTraderCompanyMutationVariables {
  input: SoleTraderCompanyInputObject;
}
