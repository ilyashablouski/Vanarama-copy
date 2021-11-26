/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrderInputObject, LeaseTypeEnum, VehicleTypeEnum } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateUpdateOrder
// ====================================================

export interface CreateUpdateOrder_createUpdateOrder_lineItems_vehicleProduct_freeInsurance {
  optIn: boolean | null;
  eligible: boolean | null;
}

export interface CreateUpdateOrder_createUpdateOrder_lineItems_vehicleProduct {
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
  freeInsurance: CreateUpdateOrder_createUpdateOrder_lineItems_vehicleProduct_freeInsurance | null;
}

export interface CreateUpdateOrder_createUpdateOrder_lineItems {
  uuid: string;
  quantity: number;
  status: string | null;
  productId: string;
  productType: string;
  vehicleProduct: CreateUpdateOrder_createUpdateOrder_lineItems_vehicleProduct | null;
}

export interface CreateUpdateOrder_createUpdateOrder {
  uuid: string;
  createdAt: CustomDateTime | null;
  salesChannel: string;
  referenceNumber: string | null;
  personUuid: string | null;
  partyUuid: string | null;
  leaseType: LeaseTypeEnum;
  additionalData: CustomJson | null;
  status: string;
  lineItems: CreateUpdateOrder_createUpdateOrder_lineItems[];
}

export interface CreateUpdateOrder {
  /**
   * Create order or update an existing one
   */
  createUpdateOrder: CreateUpdateOrder_createUpdateOrder | null;
}

export interface CreateUpdateOrderVariables {
  input: OrderInputObject;
}
