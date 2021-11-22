/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.


import { OrderInputObject } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: SaveOrder
// ====================================================


export interface SaveOrder_saveOrder {
  order: OrderInputObject | null;
  rating: number | null;
}

export interface SaveOrder {
  saveOrder: SaveOrder_saveOrder | null;
}

export interface SaveOrderVariables {
  order?: OrderInputObject | null;
  rating?: number | null;
}
