/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: IncomeCalculatorExpenditure
// ====================================================

export interface IncomeCalculatorExpenditure {
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
