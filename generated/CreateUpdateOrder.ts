/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrderInputObject, LeaseTypeEnum } from "./globalTypes";

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
  term: number | null;
  annualMileage: number | null;
  monthlyPayment: number | null;
  depositMonths: number | null;
  funderId: string | null;
  funderData: CustomJson | null;
  stockBatchId: number | null;
  maintenancePrice: number | null;
  partnerSlug: string | null;
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
