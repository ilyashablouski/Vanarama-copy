/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PersonInputObject } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: SaveBusinessAboutYou
// ====================================================

export interface SaveBusinessAboutYou_createUpdateBusinessPerson_emailAddresses {
  createdAt: CustomDateTime | null;
  kind: string | null;
  partyId: string;
  primary: boolean;
  updatedAt: CustomDateTime | null;
  uuid: string;
  value: string;
}

export interface SaveBusinessAboutYou_createUpdateBusinessPerson_telephoneNumbers {
  createdAt: CustomDateTime | null;
  kind: string | null;
  partyId: string;
  primary: boolean;
  updatedAt: CustomDateTime | null;
  uuid: string;
  value: string;
}

export interface SaveBusinessAboutYou_createUpdateBusinessPerson {
  uuid: string;
  emailAddresses: SaveBusinessAboutYou_createUpdateBusinessPerson_emailAddresses[];
  telephoneNumbers: SaveBusinessAboutYou_createUpdateBusinessPerson_telephoneNumbers[] | null;
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
