/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SoleTraderCompanyInputObject } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateSoleTraderCompanyMutation
// ====================================================

export interface UpdateSoleTraderCompanyMutation_createUpdateSoleTraderCompany_addresses {
  lineOne: string;
  lineTwo: string | null;
  lineThree: string | null;
  city: string;
  county: string | null;
  postcode: string;
  country: string;
  startedOn: any | null;
  endedOn: any | null;
  propertyStatus: string | null;
  serviceId: string | null;
  kind: string | null;
}

export interface UpdateSoleTraderCompanyMutation_createUpdateSoleTraderCompany {
  uuid: string;
  partyUuid: string;
  addresses: UpdateSoleTraderCompanyMutation_createUpdateSoleTraderCompany_addresses[] | null;
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
