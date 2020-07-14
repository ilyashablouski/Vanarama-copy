/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreditApplicationInputObject } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateUpdateCreditApplication
// ====================================================

export interface CreateUpdateCreditApplication_createUpdateCreditApplication_lineItem_vehicleProduct {
  derivativeCapId: string;
  description: string | null;
  vsku: string | null;
  term: number | null;
  annualMileage: number | null;
  monthlyPayment: number | null;
  depositMonths: number | null;
  funder: string | null;
}

export interface CreateUpdateCreditApplication_createUpdateCreditApplication_lineItem {
  uuid: string;
  quantity: number;
  status: string | null;
  productId: string;
  productType: string;
  vehicleProduct: CreateUpdateCreditApplication_createUpdateCreditApplication_lineItem_vehicleProduct | null;
}

export interface CreateUpdateCreditApplication_createUpdateCreditApplication {
  addresses: any | null;
  bankAccounts: any | null;
  createdAt: any | null;
  emailAddresses: any | null;
  employmentHistories: any | null;
  incomeAndExpenses: any | null;
  leadManagerProposalId: string | null;
  lineItem: CreateUpdateCreditApplication_createUpdateCreditApplication_lineItem | null;
  partyDetails: any | null;
  status: string;
  telephoneNumbers: any | null;
  updatedAt: any | null;
  uuid: string;
}

export interface CreateUpdateCreditApplication {
  /**
   * Create Update CreditApplication
   */
  createUpdateCreditApplication: CreateUpdateCreditApplication_createUpdateCreditApplication | null;
}

export interface CreateUpdateCreditApplicationVariables {
  input: CreditApplicationInputObject;
}
