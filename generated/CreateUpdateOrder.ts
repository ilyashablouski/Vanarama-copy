/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrderInputObject } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateUpdateOrder
// ====================================================

export interface CreateUpdateOrder_createUpdateOrder_lineItems_vehicleProduct {
  derivativeCapId: string;
  description: string | null;
  vsku: string | null;
  term: number | null;
  annualMileage: number | null;
  monthlyPayment: number | null;
  depositMonths: number | null;
  funderId: string | null;
  funderData: any | null;
  maintenancePrice: number | null;
  oneYearFreeInsurance: boolean | null;
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
  createdAt: any | null;
  salesChannel: string;
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
