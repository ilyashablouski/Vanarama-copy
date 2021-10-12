/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrderInputObject } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetOrder
// ====================================================

export interface GetOrder_storedOrder {
  order: OrderInputObject | null;
  rating: number | null;
}

export interface GetOrder {
  storedOrder: GetOrder_storedOrder | null;
}
