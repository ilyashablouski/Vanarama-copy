/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.


// ====================================================
// GraphQL fragment: PersonData
// ====================================================


export interface PersonData_emailAddresses {
  value: string;
  partyId: string;
}

export interface PersonData {
  uuid: string;
  firstName: string;
  lastName: string;
  partyUuid: string;
  emailAddresses: PersonData_emailAddresses[];
}
