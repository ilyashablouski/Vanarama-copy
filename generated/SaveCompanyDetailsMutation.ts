/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LimitedCompanyInputObject } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: SaveCompanyDetailsMutation
// ====================================================

export interface SaveCompanyDetailsMutation_createUpdateLimitedCompany_addresses {
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

export interface SaveCompanyDetailsMutation_createUpdateLimitedCompany {
  uuid: string;
  partyUuid: string;
  addresses: SaveCompanyDetailsMutation_createUpdateLimitedCompany_addresses[] | null;
}

export interface SaveCompanyDetailsMutation {
  /**
   * Create or update Ltd. Company
   */
  createUpdateLimitedCompany: SaveCompanyDetailsMutation_createUpdateLimitedCompany | null;
}

export interface SaveCompanyDetailsMutationVariables {
  input: LimitedCompanyInputObject;
}
