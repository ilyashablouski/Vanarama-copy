/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { VehicleTypeEnum, LeaseTypeEnum } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetQuoteDetails
// ====================================================

export interface GetQuoteDetails_quoteByCapId_nextBestPrice {
  maintained: number | null;
  nonMaintained: number | null;
}

export interface GetQuoteDetails_quoteByCapId_leaseCost {
  monthlyRental: number | null;
  initialRental: number | null;
  excessMileage: number | null;
}

export interface GetQuoteDetails_quoteByCapId_maintenanceCost {
  monthlyRental: number | null;
  initialRental: number | null;
  excessMileage: number | null;
}

export interface GetQuoteDetails_quoteByCapId {
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
  processingFee: number | null;
  nextBestPrice: GetQuoteDetails_quoteByCapId_nextBestPrice | null;
  leaseCost: GetQuoteDetails_quoteByCapId_leaseCost | null;
  maintenanceCost: GetQuoteDetails_quoteByCapId_maintenanceCost | null;
}

export interface GetQuoteDetails {
  quoteByCapId: GetQuoteDetails_quoteByCapId | null;
}

export interface GetQuoteDetailsVariables {
  capId: string;
  vehicleType?: VehicleTypeEnum | null;
  leaseType?: LeaseTypeEnum | null;
  mileage?: number | null;
  trim?: number | null;
  colour?: number | null;
  term?: number | null;
  upfront?: number | null;
}
