/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LeaseTypeEnum } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetOrderByUuid
// ====================================================

export interface GetOrderByUuid_orderByUuid_lineItems_creditApplications {
  status: string;
  uuid: string;
}

export interface GetOrderByUuid_orderByUuid_lineItems_vehicleProduct {
  derivativeCapId: string;
  description: string | null;
  vsku: string | null;
  financeType: string | null;
  depositPayment: number | null;
  monthlyPayment: number | null;
  term: number | null;
  annualMileage: number | null;
  depositMonths: number | null;
  funderId: string | null;
  funderData: any | null;
  colour: string | null;
  trim: string | null;
  maintenance: boolean | null;
}

export interface GetOrderByUuid_orderByUuid_lineItems {
  createdAt: any | null;
  leadManagerQuoteId: string | null;
  productId: string;
  productType: string;
  quantity: number;
  status: string | null;
  updatedAt: any | null;
  uuid: string;
  creditApplications: GetOrderByUuid_orderByUuid_lineItems_creditApplications[] | null;
  vehicleProduct: GetOrderByUuid_orderByUuid_lineItems_vehicleProduct | null;
}

export interface GetOrderByUuid_orderByUuid {
  uuid: string;
  leaseType: LeaseTypeEnum;
  status: string;
  createdAt: any | null;
  updatedAt: any | null;
  lineItems: GetOrderByUuid_orderByUuid_lineItems[];
}

export interface GetOrderByUuid {
  /**
   * Gets an order by uuid
   */
  orderByUuid: GetOrderByUuid_orderByUuid | null;
}

export interface GetOrderByUuidVariables {
  uuid: string;
}
