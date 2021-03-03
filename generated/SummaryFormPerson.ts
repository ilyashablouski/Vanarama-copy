/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: SummaryFormPerson
// ====================================================

export interface SummaryFormPerson_emailAddresses {
  __typename: "EmailAddressType";
  uuid: string;
  primary: boolean;
  value: string;
}

export interface SummaryFormPerson_telephoneNumbers {
  __typename: "TelephoneNumberType";
  uuid: string;
  kind: string | null;
  value: string;
}

export interface SummaryFormPerson_addresses {
  __typename: "AddressType";
  uuid: string;
  lineOne: string;
  lineTwo: string | null;
  city: string;
  postcode: string;
  propertyStatus: string | null;
  startedOn: any | null;
}

export interface SummaryFormPerson_employmentHistories {
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

export interface SummaryFormPerson_incomeAndExpense {
  __typename: "IncomeAndExpenseType";
  uuid: string;
  averageMonthlyIncome: number;
  totalMonthlyExpenses: number | null;
  netDisposableIncome: number | null;
}

export interface SummaryFormPerson_bankAccounts {
  __typename: "BankAccountType";
  uuid: string;
  bankName: string | null;
  accountName: string | null;
  sortCode: string | null;
  accountNumber: string | null;
  joinedAt: any | null;
}

export interface SummaryFormPerson {
  __typename: "PersonType";
  uuid: string;
  emailAddresses: SummaryFormPerson_emailAddresses[];
  telephoneNumbers: SummaryFormPerson_telephoneNumbers[] | null;
  title: string | null;
  firstName: string;
  lastName: string;
  dateOfBirth: any | null;
  countryOfBirth: string | null;
  nationality: string | null;
  maritalStatus: string | null;
  noOfDependants: string | null;
  noOfAdultsInHousehold: string | null;
  addresses: SummaryFormPerson_addresses[] | null;
  employmentHistories: SummaryFormPerson_employmentHistories[] | null;
  incomeAndExpense: SummaryFormPerson_incomeAndExpense | null;
  bankAccounts: SummaryFormPerson_bankAccounts[] | null;
}
