/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FinanceTypeEnum, VehicleTypeEnum } from "./globalTypes";

// ====================================================
// GraphQL query operation: suggestionList
// ====================================================

export interface suggestionList_suggestionList_vehicleSuggestions {
  financeType: FinanceTypeEnum | null;
  vehicleType: VehicleTypeEnum | null;
  manufacturerName: string | null;
  modelName: string | null;
  rental: number | null;
  initialPayment: number | null;
  rangeName: string | null;
  transmission: string | null;
  fuelType: string | null;
  capBodyStyle: string | null;
  term: number | null;
  mileage: number | null;
  availability: number | null;
  derivativeId: string | null;
  derivativeName: string | null;
  lqUrl: string | null;
  url: string | null;
  fullDescription: string | null;
  configId: string | null;
}

export interface suggestionList_suggestionList {
  vehicleSuggestions: suggestionList_suggestionList_vehicleSuggestions[] | null;
}

export interface suggestionList {
  /**
   * Site-wide suggestion list for search field
   */
  suggestionList: suggestionList_suggestionList | null;
}

export interface suggestionListVariables {
  query?: string | null;
}
