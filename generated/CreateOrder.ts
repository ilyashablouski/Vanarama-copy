/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrderInputObject } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateOrder
// ====================================================

export interface CreateOrder_createOrder_lineItems_vehicleProduct {
  derivativeCapId: string;
  description: string | null;
  vsku: string | null;
  term: number | null;
  annualMileage: number | null;
  monthlyPayment: number | null;
  depositMonths: number | null;
  funder: string | null;
}

export interface CreateOrder_createOrder_lineItems {
  uuid: string;
  quantity: number;
  status: string | null;
  productId: string;
  productType: string;
  vehicleProduct: CreateOrder_createOrder_lineItems_vehicleProduct | null;
}

export interface CreateOrder_createOrder {
  uuid: string;
  createdAt: any | null;
  salesChannel: string;
  status: string;
  lineItems: CreateOrder_createOrder_lineItems[];
}

export interface CreateOrder {
  /**
   * Create order or update an existing one
   */
  createOrder: CreateOrder_createOrder | null;
}

export interface CreateOrderVariables {
  input: OrderInputObject;
}
