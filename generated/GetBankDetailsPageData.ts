/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetBankDetailsPageData
// ====================================================

export interface GetBankDetailsPageData_personById {
  id: string;
  partyId: string;
}

export interface GetBankDetailsPageData {
  /**
   * Find Person by Id
   */
  personById: GetBankDetailsPageData_personById | null;
}

export interface GetBankDetailsPageDataVariables {
  id: string;
}
