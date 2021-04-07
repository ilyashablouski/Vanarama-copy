/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FunderInputObject } from "./globalTypes";

// ====================================================
// GraphQL query operation: FunderDirectors
// ====================================================

export interface FunderDirectors_funderDirectors {
  id: string | null;
  funderData: any | null;
}

export interface FunderDirectors {
  /**
   * Gets funder directors details
   */
  funderDirectors: FunderDirectors_funderDirectors | null;
}

export interface FunderDirectorsVariables {
  input: FunderInputObject;
}
