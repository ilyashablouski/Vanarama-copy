/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.


import { VehicleTypeEnum, LeaseTypeEnum } from "./globalTypes";

// ====================================================
// GraphQL fragment: quoteData
// ====================================================


export interface quoteData_nextBestPrice {
  maintained: number | null;
  nonMaintained: number | null;
}

export interface quoteData_leaseCost {
  monthlyRental: number | null;
  initialRental: number | null;
  excessMileage: number | null;
}

export interface quoteData_maintenanceCost {
  monthlyRental: number | null;
  initialRental: number | null;
  excessMileage: number | null;
}

export interface quoteData {
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
  nextBestPrice: quoteData_nextBestPrice | null;
  leaseCost: quoteData_leaseCost | null;
  maintenanceCost: quoteData_maintenanceCost | null;
  freeInsurance: boolean | null;
}
