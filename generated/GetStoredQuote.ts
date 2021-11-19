/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.


import { VehicleTypeEnum, LeaseTypeEnum } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetStoredQuote
// ====================================================


export interface GetStoredQuote_storedQuote_nextBestPrice {
  maintained: number | null;
  nonMaintained: number | null;
}

export interface GetStoredQuote_storedQuote_leaseCost {
  monthlyRental: number | null;
  initialRental: number | null;
  excessMileage: number | null;
}

export interface GetStoredQuote_storedQuote_maintenanceCost {
  monthlyRental: number | null;
  initialRental: number | null;
  excessMileage: number | null;
}

export interface GetStoredQuote_storedQuote {
  term: number | null;
  funderId: number | null;
  mileage: number | null;
  upfront: number | null;
  trim: string | null;
  colour: string | null;
  leadTime: string | null;
  stock: string | null;
  vehicleType: VehicleTypeEnum | null;
  leaseType: LeaseTypeEnum | null;
  stockBatchId: number | null;
  processingFee: number | null;
  nextBestPrice: GetStoredQuote_storedQuote_nextBestPrice | null;
  leaseCost: GetStoredQuote_storedQuote_leaseCost | null;
  maintenanceCost: GetStoredQuote_storedQuote_maintenanceCost | null;
  freeInsurance: boolean | null;
}

export interface GetStoredQuote {
  storedQuote: GetStoredQuote_storedQuote | null;
}
