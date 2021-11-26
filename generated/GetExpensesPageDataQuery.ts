/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetExpensesPageDataQuery
// ====================================================

export interface GetExpensesPageDataQuery_personByUuid_incomeAndExpense {
  __typename: "IncomeAndExpenseType";
  uuid: string;
  anticipateMonthlyIncomeChange: boolean;
  averageMonthlyIncome: number;
  householdIncome: number | null;
  futureMonthlyIncome: number | null;
  mortgageOrRent: number | null;
  utilities: number | null;
  insurance: number | null;
  phoneAndInternet: number | null;
  creditCardPayments: number | null;
  carFinance: number | null;
  foodAndClothes: number | null;
  fuel: number | null;
  studentLoan: number | null;
  otherCredit: number | null;
  suitabilityConsent: boolean | null;
}

export interface GetExpensesPageDataQuery_personByUuid {
  uuid: string;
  partyId: string;
  incomeAndExpense: GetExpensesPageDataQuery_personByUuid_incomeAndExpense | null;
}

export interface GetExpensesPageDataQuery {
  /**
   * Find Person by Uuid
   */
  personByUuid: GetExpensesPageDataQuery_personByUuid | null;
}

export interface GetExpensesPageDataQueryVariables {
  uuid: string;
}
