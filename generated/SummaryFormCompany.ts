/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: SummaryFormCompany
// ====================================================

export interface SummaryFormCompany_turnoverPercentageOutsideUk {
  country: string;
  percentage: string;
}

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

export interface SummaryFormCompany_emailAddresses {
  uuid: string;
  kind: string | null;
  value: string;
  primary: boolean;
}

export interface SummaryFormCompany_telephoneNumbers {
  uuid: string;
  kind: string | null;
  value: string;
  primary: boolean;
}

export interface SummaryFormCompany_bankAccounts {
  __typename: "BankAccountType";
  uuid: string;
  accountName: string | null;
  accountNumber: string | null;
  joinedAt: any | null;
  sortCode: string | null;
}

export interface SummaryFormCompany {
  uuid: string;
  legalName: string | null;
  companyNumber: string | null;
  tradingSince: any | null;
  tradesOutsideUk: boolean | null;
  turnoverPercentageOutsideUk: SummaryFormCompany_turnoverPercentageOutsideUk[] | null;
  addresses: SummaryFormCompany_addresses[] | null;
  emailAddresses: SummaryFormCompany_emailAddresses[];
  telephoneNumbers: SummaryFormCompany_telephoneNumbers[] | null;
  bankAccounts: SummaryFormCompany_bankAccounts[] | null;
}
