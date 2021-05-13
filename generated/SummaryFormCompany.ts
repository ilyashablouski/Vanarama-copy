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
  serviceId: string | null;
  uuid: string;
  kind: string | null;
  lineOne: string;
  lineTwo: string | null;
  country: string;
  city: string;
  postcode: string;
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

export interface SummaryFormCompany_associates_roles {
  position: string | null;
}

export interface SummaryFormCompany_associates_addresses {
  serviceId: string | null;
  propertyStatus: string | null;
  startedOn: any | null;
  city: string;
  lineOne: string;
  lineTwo: string | null;
  postcode: string;
}

export interface SummaryFormCompany_associates {
  uuid: string;
  title: string | null;
  firstName: string;
  lastName: string;
  gender: string | null;
  dateOfBirth: any | null;
  noOfDependants: string | null;
  nationality: string | null;
  businessShare: number | null;
  roles: SummaryFormCompany_associates_roles[] | null;
  addresses: SummaryFormCompany_associates_addresses[] | null;
}

export interface SummaryFormCompany {
  __typename: "CompanyType";
  uuid: string;
  legalName: string | null;
  companyNumber: string | null;
  companyNature: string | null;
  tradesOutsideUk: boolean | null;
  tradingSince: any | null;
  turnoverPercentageOutsideUk: SummaryFormCompany_turnoverPercentageOutsideUk[] | null;
  addresses: SummaryFormCompany_addresses[] | null;
  emailAddresses: SummaryFormCompany_emailAddresses[];
  telephoneNumbers: SummaryFormCompany_telephoneNumbers[] | null;
  isVatRegistered: boolean | null;
  vatNumber: string | null;
  bankAccounts: SummaryFormCompany_bankAccounts[] | null;
  associates: SummaryFormCompany_associates[] | null;
}
