/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PersonInputObject } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: SaveBusinessAboutYou
// ====================================================

export interface SaveBusinessAboutYou_createUpdateBusinessPerson {
  uuid: string;
}

export interface SaveBusinessAboutYou {
  /**
   * Create new Business Person or update existing Business Person
   */
  createUpdateBusinessPerson: SaveBusinessAboutYou_createUpdateBusinessPerson | null;
}

export interface SaveBusinessAboutYouVariables {
  input: PersonInputObject;
}
