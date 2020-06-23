/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { VehicleTypeEnum, LeaseTypeEnum } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetQuoteDetails
// ====================================================

export interface GetQuoteDetails_quoteByCapId_nonMaintained {
  monthlyRental: number | null;
  initialRental: number | null;
  excessMileage: number | null;
}

export interface GetQuoteDetails_quoteByCapId_maintained {
  monthlyRental: number | null;
  initialRental: number | null;
  excessMileage: number | null;
}

export interface GetQuoteDetails_quoteByCapId {
  term: number | null;
  mileage: number | null;
  upfront: number | null;
  trim: string | null;
  colour: string | null;
  leadTime: string | null;
  stock: string | null;
  vehicleType: VehicleTypeEnum | null;
  leaseType: LeaseTypeEnum | null;
  processingFee: number | null;
  nonMaintained: GetQuoteDetails_quoteByCapId_nonMaintained | null;
  maintained: GetQuoteDetails_quoteByCapId_maintained | null;
}

export interface GetQuoteDetails {
  quoteByCapId: GetQuoteDetails_quoteByCapId | null;
}

export interface GetQuoteDetailsVariables {
  capId: string;
  vehicleType?: VehicleTypeEnum | null;
  leaseType?: LeaseTypeEnum | null;
  mileage?: number | null;
  colour?: number | null;
  trim?: number | null;
  term?: number | null;
  upfront?: number | null;
}
