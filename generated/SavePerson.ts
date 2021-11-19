/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.


import { PersonInputObject } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: SavePerson
// ====================================================


export interface SavePerson_savePerson_emailAddresses {
  value: string;
  partyId: string;
}

export interface SavePerson_savePerson {
  uuid: string;
  firstName: string;
  lastName: string;
  partyUuid: string;
  emailAddresses: SavePerson_savePerson_emailAddresses[];
}

export interface SavePerson {
  savePerson: SavePerson_savePerson | null;
}

export interface SavePersonVariables {
  person?: PersonInputObject | null;
}
