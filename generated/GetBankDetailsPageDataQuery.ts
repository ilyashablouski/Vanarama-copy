/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetBankDetailsPageDataQuery
// ====================================================

export interface GetBankDetailsPageDataQuery_personByUuid_emailAddresses {
  uuid: string;
  value: string;
  primary: boolean;
  kind: string | null;
  partyId: string;
}

export interface GetBankDetailsPageDataQuery_personByUuid_bankAccounts {
  __typename: "BankAccountType";
  uuid: string;
  accountName: string | null;
  accountNumber: string | null;
  bankName: string | null;
  joinedAt: any | null;
  sortCode: string | null;
}

export interface GetBankDetailsPageDataQuery_personByUuid {
  uuid: string;
  partyId: string;
  emailAddresses: GetBankDetailsPageDataQuery_personByUuid_emailAddresses[];
  bankAccounts: GetBankDetailsPageDataQuery_personByUuid_bankAccounts[] | null;
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
