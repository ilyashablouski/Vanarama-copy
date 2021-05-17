/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { VehicleTypeEnum, CreditApplicationTypeEnum } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetCreditApplicationByOrderUuid
// ====================================================

export interface GetCreditApplicationByOrderUuid_creditApplicationByOrderUuid_bankAccountsV2 {
  uuid: string | null;
  accountName: string | null;
  accountNumber: string | null;
  bankName: string | null;
  joinedAt: any | null;
  joinedAtMonth: string | null;
  joinedAtYear: string | null;
  sortCode: string | null;
}

export interface GetCreditApplicationByOrderUuid_creditApplicationByOrderUuid_lineItem_creditApplications {
  uuid: string;
}

export interface GetCreditApplicationByOrderUuid_creditApplicationByOrderUuid_lineItem_order {
  partyUuid: string | null;
  uuid: string;
}

export interface GetCreditApplicationByOrderUuid_creditApplicationByOrderUuid_lineItem_vehicleProduct {
  derivativeCapId: string;
  description: string | null;
  vsku: string | null;
  term: number | null;
  annualMileage: number | null;
  monthlyPayment: number | null;
  depositMonths: number | null;
  funderId: string | null;
  funderData: any | null;
  depositPayment: number | null;
  vehicleType: VehicleTypeEnum;
}

export interface GetCreditApplicationByOrderUuid_creditApplicationByOrderUuid_lineItem {
  uuid: string;
  quantity: number;
  status: string | null;
  productId: string;
  productType: string;
  creditApplications: GetCreditApplicationByOrderUuid_creditApplicationByOrderUuid_lineItem_creditApplications[] | null;
  order: GetCreditApplicationByOrderUuid_creditApplicationByOrderUuid_lineItem_order | null;
  vehicleProduct: GetCreditApplicationByOrderUuid_creditApplicationByOrderUuid_lineItem_vehicleProduct | null;
}

export interface GetCreditApplicationByOrderUuid_creditApplicationByOrderUuid {
  addresses: any | null;
  aboutDetails: any | null;
  bankAccountsV2: GetCreditApplicationByOrderUuid_creditApplicationByOrderUuid_bankAccountsV2[] | null;
  companyDetails: any | null;
  vatDetails: any | null;
  soleTraderDetails: any | null;
  directorsDetails: any | null;
  employmentHistories: any | null;
  incomeAndExpenses: any | null;
  lineItem: GetCreditApplicationByOrderUuid_creditApplicationByOrderUuid_lineItem | null;
  creditApplicationType: CreditApplicationTypeEnum | null;
  leadManagerProposalId: string | null;
  createdAt: any | null;
  status: string;
  updatedAt: any | null;
  uuid: string;
}

export interface GetCreditApplicationByOrderUuid {
  /**
   * Find credit application by order uuid
   */
  creditApplicationByOrderUuid: GetCreditApplicationByOrderUuid_creditApplicationByOrderUuid | null;
}

export interface GetCreditApplicationByOrderUuidVariables {
  id: string;
}
