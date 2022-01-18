/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: suggestionList
// ====================================================

export interface suggestionList_suggestionListV3 {
  vehicles: (string | null)[] | null;
  vehicleCategories: (string | null)[] | null;
}

export interface suggestionList {
  suggestionListV3: suggestionList_suggestionListV3 | null;
}

export interface suggestionListVariables {
  query?: string | null;
}
