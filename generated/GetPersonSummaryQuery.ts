/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPersonSummaryQuery
// ====================================================

export interface GetPersonSummaryQuery_personByUuid_emailAddresses {
  __typename: "EmailAddressType";
  uuid: string;
  primary: boolean;
  value: string;
}

export interface GetPersonSummaryQuery_personByUuid_telephoneNumbers {
  __typename: "TelephoneNumberType";
  uuid: string;
  kind: string | null;
  value: string;
}

export interface GetPersonSummaryQuery_personByUuid_addresses {
  __typename: "AddressType";
  uuid: string;
  lineOne: string;
  lineTwo: string | null;
  city: string;
  postcode: string;
  propertyStatus: string | null;
  startedOn: any | null;
}

export interface GetPersonSummaryQuery_personByUuid_employmentHistories {
  __typename: "EmploymentHistoryType";
  uuid: string;
  employmentStatus: string | null;
  jobTitle: string | null;
  companyAddressCity: string | null;
  companyAddressLineOne: string | null;
  companyAddressLineTwo: string | null;
  companyAddressPostcode: string | null;
  companyName: string | null;
  workPhoneNumber: string | null;
  grossAnnualIncome: number | null;
  employedSinceDate: any | null;
}

export interface GetPersonSummaryQuery_personByUuid_incomeAndExpense {
  __typename: "IncomeAndExpenseType";
  uuid: string;
  averageMonthlyIncome: number;
  totalMonthlyExpenses: number | null;
  netDisposableIncome: number | null;
}

export interface GetPersonSummaryQuery_personByUuid_bankAccounts {
  __typename: "BankAccountType";
  uuid: string;
  bankName: string | null;
  accountName: string | null;
  sortCode: string | null;
  accountNumber: string | null;
  joinedAt: any | null;
}

export interface GetPersonSummaryQuery_personByUuid {
  __typename: "PersonType";
  uuid: string;
  emailAddresses: GetPersonSummaryQuery_personByUuid_emailAddresses[];
  telephoneNumbers: GetPersonSummaryQuery_personByUuid_telephoneNumbers[] | null;
  title: string | null;
  firstName: string;
  lastName: string;
  dateOfBirth: any | null;
  countryOfBirth: string | null;
  nationality: string | null;
  maritalStatus: string | null;
  noOfDependants: string | null;
  noOfAdultsInHousehold: string | null;
  addresses: GetPersonSummaryQuery_personByUuid_addresses[] | null;
  employmentHistories: GetPersonSummaryQuery_personByUuid_employmentHistories[] | null;
  incomeAndExpense: GetPersonSummaryQuery_personByUuid_incomeAndExpense | null;
  bankAccounts: GetPersonSummaryQuery_personByUuid_bankAccounts[] | null;
}

export interface GetPersonSummaryQuery {
  /**
   * Find Person by Uuid
   */
  personByUuid: GetPersonSummaryQuery_personByUuid | null;
}

export interface GetPersonSummaryQueryVariables {
  uuid: string;
}
