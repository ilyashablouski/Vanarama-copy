/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: suggestionList
// ====================================================

export interface suggestionList_suggestionList {
  suggestions: string[] | null;
}

export interface suggestionList {
  /**
   * Site-wide suggestion list for search field
   */
  suggestionList: suggestionList_suggestionList | null;
}

export interface suggestionListVariables {
  query?: string | null;
}
