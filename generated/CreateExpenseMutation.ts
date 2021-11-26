/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { IncomeAndExpenseInputObject } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateExpenseMutation
// ====================================================

export interface CreateExpenseMutation_createUpdateIncomeAndExpense {
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

export interface CreateExpenseMutation {
  /**
   * Create new monthly income and expenses or update existing
   */
  createUpdateIncomeAndExpense: CreateExpenseMutation_createUpdateIncomeAndExpense | null;
}

export interface CreateExpenseMutationVariables {
  input?: IncomeAndExpenseInputObject | null;
}
