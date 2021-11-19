/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.


import { VehicleTypeEnum } from "./globalTypes";

// ====================================================
// GraphQL fragment: vehicleProduct
// ====================================================


export interface vehicleProduct_freeInsurance {
  optIn: boolean | null;
  eligible: boolean | null;
}

export interface vehicleProduct {
  derivativeCapId: string;
  description: string | null;
  vsku: string | null;
  financeType: string | null;
  depositPayment: number | null;
  monthlyPayment: number | null;
  term: number | null;
  finalPayment: number | null;
  leadTime: string | null;
  annualMileage: number | null;
  depositMonths: number | null;
  funderId: string | null;
  funderData: CustomJson | null;
  colour: string | null;
  trim: string | null;
  maintenance: boolean | null;
  stockBatchId: number | null;
  maintenancePrice: number | null;
  partnerSlug: string | null;
  vehicleType: VehicleTypeEnum;
  freeInsurance: vehicleProduct_freeInsurance | null;
}
