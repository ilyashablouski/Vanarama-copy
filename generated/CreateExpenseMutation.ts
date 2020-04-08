/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { IncomeAndExpenseInputObject } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateExpenseMutation
// ====================================================

export interface CreateExpenseMutation_createUpdateIncomeAndExpense {
  id: string;
  uuid: string;
  averageMonthlyIncome: number;
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
