/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.


import { OrderInputObject } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetStoredOrder
// ====================================================


export interface GetStoredOrder_storedOrder {
  order: OrderInputObject | null;
  rating: number | null;
}

export interface GetStoredOrder {
  storedOrder: GetStoredOrder_storedOrder | null;
}
