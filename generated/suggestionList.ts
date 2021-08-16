/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: suggestionList
// ====================================================

export interface suggestionList_suggestionListV2_derivatives {
  alloys: boolean | null;
  availability: number | null;
  capBodyStyle: string | null;
  capCode: string | null;
  capId: string | null;
  derivativeId: number | null;
  derivativeName: string | null;
  doors: number | null;
  enginePowerBhp: number | null;
  enginePowerKw: number | null;
  engineSize: number | null;
  engineTorque: number | null;
  financeType: string | null;
  fuelType: string | null;
  fullDescription: string | null;
  fullPrice: number | null;
  funder: string | null;
  height: number | null;
  inStock: boolean | null;
  indexedAt: any | null;
  initialPayment: number | null;
  initialPaymentMaintained: number | null;
  initialPeriod: number | null;
  insuranceGroup: string | null;
  introducedAt: any | null;
  inventoryCount: number | null;
  length: number | null;
  loadLength: number | null;
  loadWidth: number | null;
  lqBodyStyle: string | null;
  lqFunderId: number | null;
  lqFunderRateId: number | null;
  lqUrl: string | null;
  lqVehicleId: number | null;
  maintenancePrice: number | null;
  manufacturerId: number | null;
  manufacturerName: string | null;
  mileage: number | null;
  modelId: number | null;
  modelName: string | null;
  modelYear: number | null;
  noOfGears: number | null;
  noOfSeats: number | null;
  offerRanking: number | null;
  onOffer: boolean | null;
  rangeId: number | null;
  rangeName: string | null;
  receivedAt: any | null;
  rental: number | null;
  rentalMaintained: number | null;
  sku: string | null;
  stockBatchId: number | null;
  term: number | null;
  topSpeed: number | null;
  totalLeaseCost: number | null;
  totalLeaseCostMaintained: number | null;
  towingCapacity: number | null;
  transmission: string | null;
  updatedAt: any | null;
  url: string | null;
  vehicleCategory: string | null;
  vehicleType: string | null;
  weight: number | null;
  wheelbase: number | null;
  width: number | null;
}

export interface suggestionList_suggestionListV2 {
  suggestions: (string | null)[] | null;
  derivatives: (suggestionList_suggestionListV2_derivatives | null)[] | null;
}

export interface suggestionList {
  suggestionListV2: suggestionList_suggestionListV2 | null;
}

export interface suggestionListVariables {
  query?: string | null;
}
