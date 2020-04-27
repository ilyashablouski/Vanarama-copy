/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetExpensesPageDataQuery
// ====================================================

export interface GetExpensesPageDataQuery_personByUuid {
  uuid: string;
  partyId: string;
}

export interface GetExpensesPageDataQuery {
  /**
   * Find Person by Uuid
   */
  personByUuid: GetExpensesPageDataQuery_personByUuid | null;
}

export interface GetExpensesPageDataQueryVariables {
  uuid: string;
}
