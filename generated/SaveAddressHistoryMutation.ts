/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AddressHistoryInputObject } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: SaveAddressHistoryMutation
// ====================================================

export interface SaveAddressHistoryMutation_createUpdateAddress {
  __typename: "AddressType";
  uuid: string;
  serviceId: string | null;
  lineOne: string;
  lineTwo: string | null;
  postcode: string;
  city: string;
  propertyStatus: string | null;
  startedOn: any | null;
}

export interface SaveAddressHistoryMutation {
  /**
   * Create new Address or update existing Address
   */
  createUpdateAddress: SaveAddressHistoryMutation_createUpdateAddress[] | null;
}

export interface SaveAddressHistoryMutationVariables {
  input: AddressHistoryInputObject;
}
