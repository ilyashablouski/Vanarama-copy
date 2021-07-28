/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CompanyDirectorInputObject } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: SaveDirectorDetailsMutation
// ====================================================

export interface SaveDirectorDetailsMutation_createUpdateCompanyDirectorV2_associates_addresses {
  city: string;
  country: string | null;
  county: string | null;
  kind: string | null;
  lineOne: string;
  lineThree: string | null;
  lineTwo: string | null;
  postcode: string;
  serviceId: string | null;
  startedOn: any | null;
}

export interface SaveDirectorDetailsMutation_createUpdateCompanyDirectorV2_associates {
  uuid: string;
  lastName: string;
  firstName: string;
  addresses: SaveDirectorDetailsMutation_createUpdateCompanyDirectorV2_associates_addresses[] | null;
}

export interface SaveDirectorDetailsMutation_createUpdateCompanyDirectorV2 {
  uuid: string;
  associates: SaveDirectorDetailsMutation_createUpdateCompanyDirectorV2_associates[] | null;
}

export interface SaveDirectorDetailsMutation {
  /**
   * This mutation is deprecated, instead use CreateUpdateCompanyDirectorV2
   */
  createUpdateCompanyDirectorV2: SaveDirectorDetailsMutation_createUpdateCompanyDirectorV2 | null;
}

export interface SaveDirectorDetailsMutationVariables {
  input: CompanyDirectorInputObject;
}
