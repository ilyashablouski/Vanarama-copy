/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MyOrdersTypeEnum, LeaseTypeEnum, CreditApplicationTypeEnum, VehicleTypeEnum } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetMyOrders
// ====================================================

export interface GetMyOrders_myOrders_lineItems_order {
  uuid: string;
}

export interface GetMyOrders_myOrders_lineItems_creditApplications_incomeAndExpensesV2 {
  uuid: string | null;
}

export interface GetMyOrders_myOrders_lineItems_creditApplications_employmentHistoriesV2 {
  uuid: string | null;
}

export interface GetMyOrders_myOrders_lineItems_creditApplications_bankAccountsV2 {
  uuid: string | null;
}

export interface GetMyOrders_myOrders_lineItems_creditApplications_addressesV2 {
  uuid: string | null;
}

export interface GetMyOrders_myOrders_lineItems_creditApplications {
  creditApplicationType: CreditApplicationTypeEnum | null;
  aboutDetails: any | null;
  companyDetails: any | null;
  directorsDetails: any | null;
  partnersDetails: any | null;
  soleTraderDetails: any | null;
  vatDetails: any | null;
  incomeAndExpensesV2: GetMyOrders_myOrders_lineItems_creditApplications_incomeAndExpensesV2 | null;
  employmentHistoriesV2: GetMyOrders_myOrders_lineItems_creditApplications_employmentHistoriesV2[] | null;
  bankAccountsV2: GetMyOrders_myOrders_lineItems_creditApplications_bankAccountsV2[] | null;
  addressesV2: GetMyOrders_myOrders_lineItems_creditApplications_addressesV2[] | null;
  status: string;
  uuid: string;
}

export interface GetMyOrders_myOrders_lineItems_vehicleProduct {
  finalPayment: number | null;
  leadTime: string | null;
  maintenancePrice: number | null;
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
  vehicleType: VehicleTypeEnum;
}

export interface GetMyOrders_myOrders_lineItems {
  order: GetMyOrders_myOrders_lineItems_order | null;
  createdAt: any | null;
  leadManagerQuoteId: string | null;
  productId: string;
  productType: string;
  quantity: number;
  status: string | null;
  updatedAt: any | null;
  uuid: string;
  creditApplications: GetMyOrders_myOrders_lineItems_creditApplications[] | null;
  vehicleProduct: GetMyOrders_myOrders_lineItems_vehicleProduct | null;
}

export interface GetMyOrders_myOrders {
  uuid: string;
  leaseType: LeaseTypeEnum;
  partyUuid: string | null;
  personUuid: string | null;
  referenceNumber: string | null;
  salesChannel: string;
  status: string;
  createdAt: any | null;
  updatedAt: any | null;
  lineItems: GetMyOrders_myOrders_lineItems[];
}

export interface GetMyOrders {
  /**
   * Get orders by party_uuids and filter
   */
  myOrders: GetMyOrders_myOrders[];
}

export interface GetMyOrdersVariables {
  partyUuid: string[];
  filter: MyOrdersTypeEnum;
}
