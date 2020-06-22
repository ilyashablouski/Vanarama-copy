/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { VehicleTypeEnum, LeaseTypeEnum } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetOlafData
// ====================================================

export interface GetOlafData_orderByUuid_lineItems_creditApplications {
  aasmState: string;
  uuid: string;
}

export interface GetOlafData_orderByUuid_lineItems_vehicleProduct {
  derivativeCapId: string;
  description: string | null;
  vsku: string | null;
  financeType: string | null;
  depositPayment: number | null;
  monthlyPayment: number | null;
  term: number | null;
  annualMileage: number | null;
  depositMonths: number | null;
  funder: string | null;
  colour: string | null;
  trim: string | null;
  maintenance: boolean | null;
}

export interface GetOlafData_orderByUuid_lineItems {
  createdAt: any | null;
  leadManagerQuoteId: string | null;
  productId: string;
  productType: string;
  quantity: number;
  state: string | null;
  updatedAt: any | null;
  uuid: string;
  creditApplications: GetOlafData_orderByUuid_lineItems_creditApplications[] | null;
  vehicleProduct: GetOlafData_orderByUuid_lineItems_vehicleProduct | null;
}

export interface GetOlafData_orderByUuid {
  uuid: string;
  id: string;
  leaseType: LeaseTypeEnum;
  partyUuid: string;
  aasmState: string;
  createdAt: any | null;
  updatedAt: any | null;
  lineItems: GetOlafData_orderByUuid_lineItems[];
}

export interface GetOlafData_derivative_manufacturer {
  name: string;
}

export interface GetOlafData_derivative_model {
  name: string;
}

export interface GetOlafData_derivative_fuelType {
  name: string;
}

export interface GetOlafData_derivative_transmission {
  name: string;
}

export interface GetOlafData_derivative {
  id: string;
  capCode: string;
  name: string;
  slug: string;
  manufacturer: GetOlafData_derivative_manufacturer;
  manufacturerName: string;
  model: GetOlafData_derivative_model;
  modelName: string;
  fuelType: GetOlafData_derivative_fuelType;
  fuelTypeName: string;
  transmission: GetOlafData_derivative_transmission;
  transmissionName: string;
}

export interface GetOlafData {
  /**
   * Gets an order by uuid
   */
  orderByUuid: GetOlafData_orderByUuid | null;
  derivative: GetOlafData_derivative | null;
}

export interface GetOlafDataVariables {
  uuid: string;
  id: string;
  vehicleType?: VehicleTypeEnum | null;
}
