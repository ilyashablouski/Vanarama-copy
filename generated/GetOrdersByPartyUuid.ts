/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LeaseTypeEnum, VehicleTypeEnum } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetOrdersByPartyUuid
// ====================================================

export interface GetOrdersByPartyUuid_ordersByPartyUuid_lineItems_creditApplications {
  status: string;
  uuid: string;
}

export interface GetOrdersByPartyUuid_ordersByPartyUuid_lineItems_vehicleProduct {
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
  vehicleType: VehicleTypeEnum;
}

export interface GetOrdersByPartyUuid_ordersByPartyUuid_lineItems {
  createdAt: any | null;
  leadManagerQuoteId: string | null;
  productId: string;
  productType: string;
  quantity: number;
  status: string | null;
  updatedAt: any | null;
  uuid: string;
  creditApplications: GetOrdersByPartyUuid_ordersByPartyUuid_lineItems_creditApplications[] | null;
  vehicleProduct: GetOrdersByPartyUuid_ordersByPartyUuid_lineItems_vehicleProduct | null;
}

export interface GetOrdersByPartyUuid_ordersByPartyUuid {
  uuid: string;
  id: string;
  leaseType: LeaseTypeEnum;
  partyUuid: string;
  status: string;
  createdAt: any | null;
  updatedAt: any | null;
  lineItems: GetOrdersByPartyUuid_ordersByPartyUuid_lineItems[];
}

export interface GetOrdersByPartyUuid {
  /**
   * Get orders by party_uuid
   */
  ordersByPartyUuid: GetOrdersByPartyUuid_ordersByPartyUuid[];
}

export interface GetOrdersByPartyUuidVariables {
  partyUuid: string;
  statuses?: string[] | null;
  excludeStatuses?: string[] | null;
  statusesCA?: string[] | null;
  exStatusesCA?: string[] | null;
}
