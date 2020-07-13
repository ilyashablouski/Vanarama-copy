/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: SummaryFormCompany
// ====================================================

export interface SummaryFormCompany_addresses {
  __typename: "AddressType";
  uuid: string;
  lineOne: string;
  lineTwo: string | null;
  city: string;
  postcode: string;
  propertyStatus: string | null;
  startedOn: any | null;
}

export interface SummaryFormCompany_bankAccounts {
  __typename: "BankAccountType";
  uuid: string;
  bankName: string | null;
  accountName: string | null;
  sortCode: string | null;
  accountNumber: string | null;
}

export interface SummaryFormCompany {
  addresses: SummaryFormCompany_addresses[] | null;
  bankAccounts: SummaryFormCompany_bankAccounts[] | null;
}
