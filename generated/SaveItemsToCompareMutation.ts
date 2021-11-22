/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ItemToCompareInputObject } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: SaveItemsToCompareMutation
// ====================================================

export interface SaveItemsToCompareMutation_saveItemsToCompare {
  capId: string | null;
}

export interface SaveItemsToCompareMutation {
  saveItemsToCompare: (SaveItemsToCompareMutation_saveItemsToCompare | null)[] | null;
}

export interface SaveItemsToCompareMutationVariables {
  items?: (ItemToCompareInputObject | null)[] | null;
}
