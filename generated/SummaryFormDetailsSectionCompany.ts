/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: SummaryFormDetailsSectionCompany
// ====================================================

export interface SummaryFormDetailsSectionCompany_bankAccounts {
  __typename: "BankAccountType";
  uuid: string;
  accountName: string | null;
  accountNumber: string | null;
  joinedAt: any | null;
  sortCode: string | null;
}

export interface SummaryFormDetailsSectionCompany {
  __typename: "CompanyType";
  uuid: string;
  bankAccounts: SummaryFormDetailsSectionCompany_bankAccounts[] | null;
}
