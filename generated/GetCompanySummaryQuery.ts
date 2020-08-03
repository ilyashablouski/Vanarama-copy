/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCompanySummaryQuery
// ====================================================

export interface GetCompanySummaryQuery_companyByUuid_turnoverPercentageOutsideUk {
  country: string;
  percentage: string;
}

export interface GetCompanySummaryQuery_companyByUuid_addresses {
  uuid: string;
  kind: string | null;
  lineOne: string;
  lineTwo: string | null;
  country: string;
  city: string;
  postcode: string;
}

export interface GetCompanySummaryQuery_companyByUuid_emailAddresses {
  uuid: string;
  kind: string | null;
  value: string;
  primary: boolean;
}

export interface GetCompanySummaryQuery_companyByUuid_telephoneNumbers {
  uuid: string;
  kind: string | null;
  value: string;
  primary: boolean;
}

export interface GetCompanySummaryQuery_companyByUuid_bankAccounts {
  __typename: "BankAccountType";
  uuid: string;
  accountName: string | null;
  accountNumber: string | null;
  joinedAt: any | null;
  sortCode: string | null;
  updatedAt: any | null;
}

export interface GetCompanySummaryQuery_companyByUuid_associates_roles {
  position: string | null;
}

export interface GetCompanySummaryQuery_companyByUuid_associates_addresses {
  serviceId: string | null;
  propertyStatus: string | null;
  startedOn: any | null;
  city: string;
  lineOne: string;
  lineTwo: string | null;
  postcode: string;
}

export interface GetCompanySummaryQuery_companyByUuid_associates {
  uuid: string;
  title: string | null;
  firstName: string;
  lastName: string;
  gender: string | null;
  dateOfBirth: any | null;
  noOfDependants: string | null;
  businessShare: number | null;
  roles: GetCompanySummaryQuery_companyByUuid_associates_roles[] | null;
  addresses: GetCompanySummaryQuery_companyByUuid_associates_addresses[] | null;
}

export interface GetCompanySummaryQuery_companyByUuid {
  __typename: "CompanyType";
  uuid: string;
  legalName: string | null;
  companyNumber: string | null;
  companyNature: string | null;
  tradesOutsideUk: boolean | null;
  tradingSince: any | null;
  turnoverPercentageOutsideUk: GetCompanySummaryQuery_companyByUuid_turnoverPercentageOutsideUk[] | null;
  addresses: GetCompanySummaryQuery_companyByUuid_addresses[] | null;
  emailAddresses: GetCompanySummaryQuery_companyByUuid_emailAddresses[];
  telephoneNumbers: GetCompanySummaryQuery_companyByUuid_telephoneNumbers[] | null;
  bankAccounts: GetCompanySummaryQuery_companyByUuid_bankAccounts[] | null;
  isVatRegistered: boolean | null;
  vatNumber: string | null;
  associates: GetCompanySummaryQuery_companyByUuid_associates[] | null;
}

export interface GetCompanySummaryQuery_personByUuid_emailAddresses {
  __typename: "EmailAddressType";
  uuid: string;
  primary: boolean;
  value: string;
}

export interface GetCompanySummaryQuery_personByUuid_telephoneNumbers {
  __typename: "TelephoneNumberType";
  uuid: string;
  kind: string | null;
  value: string;
}

export interface GetCompanySummaryQuery_personByUuid {
  __typename: "PersonType";
  uuid: string;
  title: string | null;
  firstName: string;
  lastName: string;
  emailAddresses: GetCompanySummaryQuery_personByUuid_emailAddresses[];
  telephoneNumbers: GetCompanySummaryQuery_personByUuid_telephoneNumbers[] | null;
  dateOfBirth: any | null;
  countryOfBirth: string | null;
  nationality: string | null;
  maritalStatus: string | null;
  noOfAdultsInHousehold: string | null;
  noOfDependants: string | null;
  emailConsent: boolean | null;
}

export interface GetCompanySummaryQuery {
  /**
   * Find Company by Uuid
   */
  companyByUuid: GetCompanySummaryQuery_companyByUuid | null;
  /**
   * Find Person by Uuid
   */
  personByUuid: GetCompanySummaryQuery_personByUuid | null;
}

export interface GetCompanySummaryQueryVariables {
  uuid: string;
  personUuid: string;
}
