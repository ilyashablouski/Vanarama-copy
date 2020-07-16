/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: SummaryFormDetailsSectionCompany
// ====================================================

export interface SummaryFormDetailsSectionCompany_turnoverPercentageOutsideUk {
  country: string;
  percentage: string;
}

export interface SummaryFormDetailsSectionCompany_addresses {
  uuid: string;
  kind: string | null;
  lineOne: string;
  lineTwo: string | null;
  country: string;
  city: string;
  postcode: string;
}

export interface SummaryFormDetailsSectionCompany_emailAddresses {
  uuid: string;
  kind: string | null;
  value: string;
  primary: boolean;
}

export interface SummaryFormDetailsSectionCompany_telephoneNumbers {
  uuid: string;
  kind: string | null;
  value: string;
  primary: boolean;
}

export interface SummaryFormDetailsSectionCompany_bankAccounts {
  __typename: "BankAccountType";
  accountName: string | null;
  accountNumber: string | null;
  joinedAt: any | null;
  sortCode: string | null;
  updatedAt: any | null;
}

export interface SummaryFormDetailsSectionCompany {
  __typename: "CompanyType";
  uuid: string;
  legalName: string | null;
  companyNumber: string | null;
  companyNature: string | null;
  tradesOutsideUk: boolean | null;
  tradingSince: any | null;
  turnoverPercentageOutsideUk: SummaryFormDetailsSectionCompany_turnoverPercentageOutsideUk[] | null;
  addresses: SummaryFormDetailsSectionCompany_addresses[] | null;
  emailAddresses: SummaryFormDetailsSectionCompany_emailAddresses[];
  telephoneNumbers: SummaryFormDetailsSectionCompany_telephoneNumbers[] | null;
  bankAccounts: SummaryFormDetailsSectionCompany_bankAccounts[] | null;
}
