/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LeaseTypeEnum, VehicleTypeEnum } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetOlafData
// ====================================================

export interface GetOlafData_orderByUuid_lineItems_creditApplications {
  status: string;
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
  leadTime: string | null;
  maintenancePrice: number | null;
  annualMileage: number | null;
  depositMonths: number | null;
  funderId: string | null;
  funderData: any | null;
  colour: string | null;
  trim: string | null;
  maintenance: boolean | null;
  vehicleType: VehicleTypeEnum;
}

export interface GetOlafData_orderByUuid_lineItems {
  createdAt: any | null;
  leadManagerQuoteId: string | null;
  productId: string;
  productType: string;
  quantity: number;
  status: string | null;
  updatedAt: any | null;
  uuid: string;
  creditApplications: GetOlafData_orderByUuid_lineItems_creditApplications[] | null;
  vehicleProduct: GetOlafData_orderByUuid_lineItems_vehicleProduct | null;
}

export interface GetOlafData_orderByUuid {
  uuid: string;
  id: string;
  leaseType: LeaseTypeEnum;
  status: string;
  createdAt: any | null;
  updatedAt: any | null;
  lineItems: GetOlafData_orderByUuid_lineItems[];
}

export interface GetOlafData {
  /**
   * Gets an order by uuid
   */
  orderByUuid: GetOlafData_orderByUuid | null;
}

export interface GetOlafDataVariables {
  uuid: string;
}
