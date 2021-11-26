/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { VehicleTypeEnum } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetCreditApplicationByOrderUuidDataForCreditCheck
// ====================================================

export interface GetCreditApplicationByOrderUuidDataForCreditCheck_creditApplicationByOrderUuid_lineItem_vehicleProduct {
  vehicleType: VehicleTypeEnum;
  depositPayment: number | null;
  monthlyPayment: number | null;
}

export interface GetCreditApplicationByOrderUuidDataForCreditCheck_creditApplicationByOrderUuid_lineItem_order {
  partyUuid: string | null;
}

export interface GetCreditApplicationByOrderUuidDataForCreditCheck_creditApplicationByOrderUuid_lineItem_creditApplications {
  uuid: string;
}

export interface GetCreditApplicationByOrderUuidDataForCreditCheck_creditApplicationByOrderUuid_lineItem {
  vehicleProduct: GetCreditApplicationByOrderUuidDataForCreditCheck_creditApplicationByOrderUuid_lineItem_vehicleProduct | null;
  order: GetCreditApplicationByOrderUuidDataForCreditCheck_creditApplicationByOrderUuid_lineItem_order | null;
  creditApplications: GetCreditApplicationByOrderUuidDataForCreditCheck_creditApplicationByOrderUuid_lineItem_creditApplications[] | null;
}

export interface GetCreditApplicationByOrderUuidDataForCreditCheck_creditApplicationByOrderUuid {
  lineItem: GetCreditApplicationByOrderUuidDataForCreditCheck_creditApplicationByOrderUuid_lineItem | null;
}

export interface GetCreditApplicationByOrderUuidDataForCreditCheck {
  /**
   * Find credit application by order uuid
   */
  creditApplicationByOrderUuid: GetCreditApplicationByOrderUuidDataForCreditCheck_creditApplicationByOrderUuid | null;
}

export interface GetCreditApplicationByOrderUuidDataForCreditCheckVariables {
  orderUuid: string;
}
