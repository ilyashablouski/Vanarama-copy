/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.


// ====================================================
// GraphQL query operation: GetStoredPerson
// ====================================================


export interface GetStoredPerson_storedPerson_emailAddresses {
  value: string;
  partyId: string;
}

export interface GetStoredPerson_storedPerson {
  uuid: string;
  firstName: string;
  lastName: string;
  partyUuid: string;
  emailAddresses: GetStoredPerson_storedPerson_emailAddresses[];
}

export interface GetStoredPerson {
  storedPerson: GetStoredPerson_storedPerson | null;
}
