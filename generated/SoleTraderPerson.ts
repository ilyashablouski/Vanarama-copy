/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: SoleTraderPerson
// ====================================================

export interface SoleTraderPerson_associates_emailAddresses {
  __typename: "EmailAddressType";
  uuid: string;
  primary: boolean;
  value: string;
}

export interface SoleTraderPerson_associates_incomeAndExpense {
  __typename: "IncomeAndExpenseType";
  averageMonthlyIncome: number;
  annualIncome: number | null;
  totalMonthlyExpenses: number | null;
  mortgageOrRent: number | null;
  studentLoan: number | null;
  anticipateMonthlyIncomeChange: boolean;
  futureMonthlyIncome: number | null;
}

export interface SoleTraderPerson_associates {
  __typename: "PersonType";
  title: string | null;
  firstName: string;
  lastName: string;
  emailAddresses: SoleTraderPerson_associates_emailAddresses[];
  dateOfBirth: any | null;
  countryOfBirth: string | null;
  nationality: string | null;
  maritalStatus: string | null;
  noOfAdultsInHousehold: string | null;
  noOfDependants: string | null;
  occupation: string | null;
  incomeAndExpense: SoleTraderPerson_associates_incomeAndExpense | null;
}

export interface SoleTraderPerson {
  __typename: "CompanyType";
  uuid: string;
  associates: SoleTraderPerson_associates[] | null;
}
