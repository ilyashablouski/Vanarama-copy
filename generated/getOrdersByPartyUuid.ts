/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LeaseTypeEnum } from "./globalTypes";

// ====================================================
// GraphQL query operation: getOrdersByPartyUuid
// ====================================================

export interface getOrdersByPartyUuid_ordersByPartyUuid_lineItems_vehicleProduct {
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

export interface getOrdersByPartyUuid_ordersByPartyUuid_lineItems {
  createdAt: any | null;
  leadManagerQuoteId: string | null;
  productId: string;
  productType: string;
  quantity: number;
  state: string | null;
  updatedAt: any | null;
  uuid: string;
  vehicleProduct: getOrdersByPartyUuid_ordersByPartyUuid_lineItems_vehicleProduct | null;
}

export interface getOrdersByPartyUuid_ordersByPartyUuid {
  uuid: string;
  id: string;
  leaseType: LeaseTypeEnum;
  partyUuid: string;
  aasmState: string;
  createdAt: any | null;
  updatedAt: any | null;
  lineItems: getOrdersByPartyUuid_ordersByPartyUuid_lineItems[];
}

export interface getOrdersByPartyUuid {
  /**
   * Get orders by party_uuid
   */
  ordersByPartyUuid: getOrdersByPartyUuid_ordersByPartyUuid[];
}

export interface getOrdersByPartyUuidVariables {
  partyUuid: string;
  statuses?: string[] | null;
}
