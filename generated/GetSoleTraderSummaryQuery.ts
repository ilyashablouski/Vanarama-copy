/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetSoleTraderSummaryQuery
// ====================================================

export interface GetSoleTraderSummaryQuery_companyByUuid_addresses {
  serviceId: string | null;
  kind: string | null;
  lineOne: string;
  lineTwo: string | null;
  country: string;
  city: string;
  postcode: string;
}

export interface GetSoleTraderSummaryQuery_companyByUuid_emailAddresses {
  kind: string | null;
  value: string;
}

export interface GetSoleTraderSummaryQuery_companyByUuid_telephoneNumbers {
  kind: string | null;
  value: string;
}

export interface GetSoleTraderSummaryQuery_companyByUuid_turnoverPercentageOutsideUk {
  country: string;
  percentage: string;
}

export interface GetSoleTraderSummaryQuery_companyByUuid_associates_emailAddresses {
  __typename: "EmailAddressType";
  primary: boolean;
  value: string;
}

export interface GetSoleTraderSummaryQuery_companyByUuid_associates_incomeAndExpense {
  __typename: "IncomeAndExpenseType";
  averageMonthlyIncome: number;
  annualIncome: number | null;
  totalMonthlyExpenses: number | null;
  mortgageOrRent: number | null;
  studentLoan: number | null;
  anticipateMonthlyIncomeChange: boolean;
  futureMonthlyIncome: number | null;
}

export interface GetSoleTraderSummaryQuery_companyByUuid_associates {
  __typename: "PersonType";
  title: string | null;
  firstName: string;
  lastName: string;
  gender: string | null;
  emailAddresses: GetSoleTraderSummaryQuery_companyByUuid_associates_emailAddresses[];
  dateOfBirth: any | null;
  countryOfBirth: string | null;
  nationality: string | null;
  maritalStatus: string | null;
  noOfAdultsInHousehold: string | null;
  noOfDependants: string | null;
  occupation: string | null;
  incomeAndExpense: GetSoleTraderSummaryQuery_companyByUuid_associates_incomeAndExpense | null;
  uuid: string;
}

export interface GetSoleTraderSummaryQuery_companyByUuid_bankAccounts {
  __typename: "BankAccountType";
  uuid: string;
  accountName: string | null;
  accountNumber: string | null;
  joinedAt: any | null;
  sortCode: string | null;
  updatedAt: any | null;
}

export interface GetSoleTraderSummaryQuery_companyByUuid {
  __typename: "CompanyType";
  uuid: string;
  tradingName: string | null;
  monthlyAmountBeingReplaced: number | null;
  annualTurnover: number | null;
  companyNature: string | null;
  annualSalesCost: number | null;
  annualExpenses: number | null;
  vehicleRegistrationNumber: string | null;
  companyType: string | null;
  tradingSince: any | null;
  addresses: GetSoleTraderSummaryQuery_companyByUuid_addresses[] | null;
  emailAddresses: GetSoleTraderSummaryQuery_companyByUuid_emailAddresses[];
  telephoneNumbers: GetSoleTraderSummaryQuery_companyByUuid_telephoneNumbers[] | null;
  isVatRegistered: boolean | null;
  tradesOutsideUk: boolean | null;
  turnoverPercentageOutsideUk: GetSoleTraderSummaryQuery_companyByUuid_turnoverPercentageOutsideUk[] | null;
  vatNumber: string | null;
  associates: GetSoleTraderSummaryQuery_companyByUuid_associates[] | null;
  bankAccounts: GetSoleTraderSummaryQuery_companyByUuid_bankAccounts[] | null;
}

export interface GetSoleTraderSummaryQuery_personByUuid_emailAddresses {
  __typename: "EmailAddressType";
  uuid: string;
  primary: boolean;
  value: string;
}

export interface GetSoleTraderSummaryQuery_personByUuid_telephoneNumbers {
  __typename: "TelephoneNumberType";
  uuid: string;
  kind: string | null;
  value: string;
}

export interface GetSoleTraderSummaryQuery_personByUuid_companies {
  companyType: string | null;
}

export interface GetSoleTraderSummaryQuery_personByUuid {
  __typename: "PersonType";
  uuid: string;
  title: string | null;
  firstName: string;
  lastName: string;
  emailAddresses: GetSoleTraderSummaryQuery_personByUuid_emailAddresses[];
  telephoneNumbers: GetSoleTraderSummaryQuery_personByUuid_telephoneNumbers[] | null;
  dateOfBirth: any | null;
  countryOfBirth: string | null;
  nationality: string | null;
  maritalStatus: string | null;
  noOfAdultsInHousehold: string | null;
  noOfDependants: string | null;
  emailConsent: boolean | null;
  profilingConsent: boolean | null;
  smsConsent: boolean | null;
  termsAndConditions: boolean | null;
  companies: GetSoleTraderSummaryQuery_personByUuid_companies[] | null;
}

export interface GetSoleTraderSummaryQuery {
  /**
   * Find Company by Uuid
   */
  companyByUuid: GetSoleTraderSummaryQuery_companyByUuid | null;
  /**
   * Find Person by Uuid
   */
  personByUuid: GetSoleTraderSummaryQuery_personByUuid | null;
}

export interface GetSoleTraderSummaryQueryVariables {
  uuid: string;
  personUuid: string;
}
