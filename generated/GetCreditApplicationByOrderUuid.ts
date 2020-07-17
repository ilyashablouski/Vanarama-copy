/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCreditApplicationByOrderUuid
// ====================================================

export interface GetCreditApplicationByOrderUuid_creditApplicationByOrderUuid_lineItem_vehicleProduct {
  derivativeCapId: string;
  description: string | null;
  vsku: string | null;
  term: number | null;
  annualMileage: number | null;
  monthlyPayment: number | null;
  depositMonths: number | null;
  funder: string | null;
}

export interface GetCreditApplicationByOrderUuid_creditApplicationByOrderUuid_lineItem {
  uuid: string;
  quantity: number;
  status: string | null;
  productId: string;
  productType: string;
  vehicleProduct: GetCreditApplicationByOrderUuid_creditApplicationByOrderUuid_lineItem_vehicleProduct | null;
}

export interface GetCreditApplicationByOrderUuid_creditApplicationByOrderUuid {
  addresses: any | null;
  bankAccounts: any | null;
  employmentHistories: any | null;
  incomeAndExpenses: any | null;
  lineItem: GetCreditApplicationByOrderUuid_creditApplicationByOrderUuid_lineItem | null;
  leadManagerProposalId: string | null;
  createdAt: any | null;
  emailAddresses: any | null;
  partyDetails: any | null;
  status: string;
  telephoneNumbers: any | null;
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
