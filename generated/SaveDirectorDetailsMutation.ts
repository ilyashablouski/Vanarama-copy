/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LimitedCompanyInputObject } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: SaveDirectorDetailsMutation
// ====================================================

export interface SaveDirectorDetailsMutation_createUpdateCompanyDirector_associates_addresses {
  city: string;
  country: string;
  county: string | null;
  kind: string | null;
  lineOne: string;
  lineThree: string | null;
  lineTwo: string | null;
  postcode: string;
  serviceId: string | null;
  startedOn: any | null;
}

export interface SaveDirectorDetailsMutation_createUpdateCompanyDirector_associates {
  uuid: string;
  lastName: string;
  firstName: string;
  addresses: SaveDirectorDetailsMutation_createUpdateCompanyDirector_associates_addresses[] | null;
}

export interface SaveDirectorDetailsMutation_createUpdateCompanyDirector {
  uuid: string;
  associates: SaveDirectorDetailsMutation_createUpdateCompanyDirector_associates[] | null;
}

export interface SaveDirectorDetailsMutation {
  /**
   * Create or update company Director
   */
  createUpdateCompanyDirector: SaveDirectorDetailsMutation_createUpdateCompanyDirector | null;
}

export interface SaveDirectorDetailsMutationVariables {
  input: LimitedCompanyInputObject;
}
