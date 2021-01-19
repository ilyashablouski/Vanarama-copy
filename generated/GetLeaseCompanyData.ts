/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetLeaseCompanyData
// ====================================================

export interface GetLeaseCompanyData_creditApplicationByOrderUuid_lineItem_vehicleProduct {
  funderId: string | null;
  funderData: any | null;
}

export interface GetLeaseCompanyData_creditApplicationByOrderUuid_lineItem {
  vehicleProduct: GetLeaseCompanyData_creditApplicationByOrderUuid_lineItem_vehicleProduct | null;
}

export interface GetLeaseCompanyData_creditApplicationByOrderUuid {
  aboutDetails: any | null;
  lineItem: GetLeaseCompanyData_creditApplicationByOrderUuid_lineItem | null;
}

export interface GetLeaseCompanyData {
  /**
   * Find credit application by order uuid
   */
  creditApplicationByOrderUuid: GetLeaseCompanyData_creditApplicationByOrderUuid | null;
}

export interface GetLeaseCompanyDataVariables {
  id: string;
}
