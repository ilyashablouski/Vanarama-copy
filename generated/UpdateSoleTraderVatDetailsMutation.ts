/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SoleTraderCompanyInputObject } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateSoleTraderVatDetailsMutation
// ====================================================

export interface UpdateSoleTraderVatDetailsMutation_createUpdateSoleTraderCompany_turnoverPercentageOutsideUk {
  country: string;
  percentage: string;
}

export interface UpdateSoleTraderVatDetailsMutation_createUpdateSoleTraderCompany {
  uuid: string;
  isVatRegistered: boolean | null;
  tradesOutsideUk: boolean | null;
  turnoverPercentageOutsideUk: UpdateSoleTraderVatDetailsMutation_createUpdateSoleTraderCompany_turnoverPercentageOutsideUk[] | null;
  vatNumber: string | null;
}

export interface UpdateSoleTraderVatDetailsMutation {
  /**
   * Create or update Sole Trader Company
   */
  createUpdateSoleTraderCompany: UpdateSoleTraderVatDetailsMutation_createUpdateSoleTraderCompany | null;
}

export interface UpdateSoleTraderVatDetailsMutationVariables {
  input: SoleTraderCompanyInputObject;
}
