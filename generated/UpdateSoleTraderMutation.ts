/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SoleTraderCompanyInputObject } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateSoleTraderMutation
// ====================================================

export interface UpdateSoleTraderMutation_updateCompanySoleTrader_associates_emailAddresses {
  __typename: "EmailAddressType";
  primary: boolean;
  value: string;
}

export interface UpdateSoleTraderMutation_updateCompanySoleTrader_associates_incomeAndExpense {
  __typename: "IncomeAndExpenseType";
  averageMonthlyIncome: number;
  annualIncome: number | null;
  totalMonthlyExpenses: number | null;
  mortgageOrRent: number | null;
  studentLoan: number | null;
  anticipateMonthlyIncomeChange: boolean;
  futureMonthlyIncome: number | null;
}

export interface UpdateSoleTraderMutation_updateCompanySoleTrader_associates {
  __typename: "PersonType";
  title: string | null;
  firstName: string;
  lastName: string;
  emailAddresses: UpdateSoleTraderMutation_updateCompanySoleTrader_associates_emailAddresses[];
  dateOfBirth: any | null;
  countryOfBirth: string | null;
  nationality: string | null;
  maritalStatus: string | null;
  noOfAdultsInHousehold: string | null;
  noOfDependants: string | null;
  occupation: string | null;
  incomeAndExpense: UpdateSoleTraderMutation_updateCompanySoleTrader_associates_incomeAndExpense | null;
  uuid: string;
}

export interface UpdateSoleTraderMutation_updateCompanySoleTrader {
  __typename: "CompanyType";
  uuid: string;
  associates: UpdateSoleTraderMutation_updateCompanySoleTrader_associates[] | null;
}

export interface UpdateSoleTraderMutation {
  /**
   * Update company Sole Trader
   */
  updateCompanySoleTrader: UpdateSoleTraderMutation_updateCompanySoleTrader | null;
}

export interface UpdateSoleTraderMutationVariables {
  input: SoleTraderCompanyInputObject;
}
