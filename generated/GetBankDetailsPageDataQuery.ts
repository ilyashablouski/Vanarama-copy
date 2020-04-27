/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetBankDetailsPageDataQuery
// ====================================================

export interface GetBankDetailsPageDataQuery_personByUuid {
  uuid: string;
  partyId: string;
}

export interface GetBankDetailsPageDataQuery {
  /**
   * Find Person by Uuid
   */
  personByUuid: GetBankDetailsPageDataQuery_personByUuid | null;
}

export interface GetBankDetailsPageDataQueryVariables {
  uuid: string;
}
