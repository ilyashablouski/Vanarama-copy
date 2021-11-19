/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.


import { OrderInputObject } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetStoredOLAFData
// ====================================================


export interface GetStoredOLAFData_storedPerson_emailAddresses {
  value: string;
  partyId: string;
}

export interface GetStoredOLAFData_storedPerson {
  uuid: string;
  firstName: string;
  lastName: string;
  partyUuid: string;
  emailAddresses: GetStoredOLAFData_storedPerson_emailAddresses[];
}

export interface GetStoredOLAFData_storedOrder {
  order: OrderInputObject | null;
  rating: number | null;
}

export interface GetStoredOLAFData {
  storedPerson: GetStoredOLAFData_storedPerson | null;
  storedOrder: GetStoredOLAFData_storedOrder | null;
  storedPersonUuid: string | null;
  storedPersonEmail: string | null;
}
