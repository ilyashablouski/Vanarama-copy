/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LimitedCompanyInputObject } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: SaveDirectorDetailsMutation
// ====================================================

export interface SaveDirectorDetailsMutation_createUpdateCompanyDirector_associates {
  uuid: string;
  lastName: string;
  firstName: string;
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
