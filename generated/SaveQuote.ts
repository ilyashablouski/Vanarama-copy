/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { QuoteObjectInput, VehicleTypeEnum, LeaseTypeEnum } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: SaveQuote
// ====================================================

export interface SaveQuote_saveQuote_nextBestPrice {
  maintained: number | null;
  nonMaintained: number | null;
}

export interface SaveQuote_saveQuote_leaseCost {
  monthlyRental: number | null;
  initialRental: number | null;
  excessMileage: number | null;
}

export interface SaveQuote_saveQuote_maintenanceCost {
  monthlyRental: number | null;
  initialRental: number | null;
  excessMileage: number | null;
}

export interface SaveQuote_saveQuote {
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
  nextBestPrice: SaveQuote_saveQuote_nextBestPrice | null;
  leaseCost: SaveQuote_saveQuote_leaseCost | null;
  maintenanceCost: SaveQuote_saveQuote_maintenanceCost | null;
  freeInsurance: boolean | null;
}

export interface SaveQuote {
  saveQuote: SaveQuote_saveQuote | null;
}

export interface SaveQuoteVariables {
  input?: QuoteObjectInput | null;
}
