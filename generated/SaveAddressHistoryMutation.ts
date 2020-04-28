/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AddressHistoryInputObject } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: SaveAddressHistoryMutation
// ====================================================

export interface SaveAddressHistoryMutation_createUpdateAddress {
  uuid: string;
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
