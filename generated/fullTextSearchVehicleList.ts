/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LeaseTypeEnum, FinanceTypeEnum, VehicleTypeEnum } from "./globalTypes";

// ====================================================
// GraphQL query operation: fullTextSearchVehicleList
// ====================================================

export interface fullTextSearchVehicleList_fullTextSearchVehicleList_vehicles_financeProfiles {
  leaseType: LeaseTypeEnum;
  maintained: boolean | null;
  mileage: number;
  rate: number | null;
  term: number;
  upfront: number;
  upfrontPayment: number;
}

export interface fullTextSearchVehicleList_fullTextSearchVehicleList_vehicles {
  availability: number | null;
  availabilityMessage: string | null;
  availabilitySort: number | null;
  bodyStyle: string | null;
  capBodyStyle: string | null;
  capCode: string | null;
  capId: string | null;
  configId: string | null;
  derivativeId: string | null;
  derivativeName: string | null;
  financeProfiles: fullTextSearchVehicleList_fullTextSearchVehicleList_vehicles_financeProfiles[] | null;
  financeType: FinanceTypeEnum | null;
  fuelType: string | null;
  fullDescription: string | null;
  initialPayment: number | null;
  legacyUrl: string | null;
  lqUrl: string | null;
  manufacturerId: string | null;
  manufacturerName: string | null;
  mileage: number | null;
  modelId: string | null;
  modelName: string | null;
  offerRanking: number | null;
  onOffer: boolean | null;
  rangeId: string | null;
  rangeName: string | null;
  rental: number | null;
  term: number | null;
  transmission: string | null;
  url: string | null;
  vehicleType: VehicleTypeEnum | null;
}

export interface fullTextSearchVehicleList_fullTextSearchVehicleList_aggregation {
  totalVehicles: number | null;
}

export interface fullTextSearchVehicleList_fullTextSearchVehicleList {
  vehicles: fullTextSearchVehicleList_fullTextSearchVehicleList_vehicles[] | null;
  aggregation: fullTextSearchVehicleList_fullTextSearchVehicleList_aggregation | null;
}

export interface fullTextSearchVehicleList {
  /**
   * Search result page vehicles
   */
  fullTextSearchVehicleList: fullTextSearchVehicleList_fullTextSearchVehicleList | null;
}

export interface fullTextSearchVehicleListVariables {
  query?: string | null;
  from?: number | null;
  size?: number | null;
}
