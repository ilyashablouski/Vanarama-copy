/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreditApplicationInputObject, VehicleTypeEnum, CreditApplicationTypeEnum } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateUpdateCreditApplication
// ====================================================

export interface CreateUpdateCreditApplication_createUpdateCreditApplication_bankAccountsV2 {
  uuid: string | null;
  accountName: string | null;
  accountNumber: string | null;
  bankName: string | null;
  joinedAt: any | null;
  joinedAtMonth: string | null;
  joinedAtYear: string | null;
  sortCode: string | null;
}

export interface CreateUpdateCreditApplication_createUpdateCreditApplication_lineItem_creditApplications {
  uuid: string;
}

export interface CreateUpdateCreditApplication_createUpdateCreditApplication_lineItem_order {
  partyUuid: string | null;
  uuid: string;
}

export interface CreateUpdateCreditApplication_createUpdateCreditApplication_lineItem_vehicleProduct {
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

export interface CreateUpdateCreditApplication_createUpdateCreditApplication_lineItem {
  uuid: string;
  quantity: number;
  status: string | null;
  productId: string;
  productType: string;
  creditApplications: CreateUpdateCreditApplication_createUpdateCreditApplication_lineItem_creditApplications[] | null;
  order: CreateUpdateCreditApplication_createUpdateCreditApplication_lineItem_order | null;
  vehicleProduct: CreateUpdateCreditApplication_createUpdateCreditApplication_lineItem_vehicleProduct | null;
}

export interface CreateUpdateCreditApplication_createUpdateCreditApplication {
  addresses: any | null;
  aboutDetails: any | null;
  bankAccountsV2: CreateUpdateCreditApplication_createUpdateCreditApplication_bankAccountsV2[] | null;
  companyDetails: any | null;
  vatDetails: any | null;
  soleTraderDetails: any | null;
  directorsDetails: any | null;
  employmentHistories: any | null;
  incomeAndExpenses: any | null;
  lineItem: CreateUpdateCreditApplication_createUpdateCreditApplication_lineItem | null;
  creditApplicationType: CreditApplicationTypeEnum | null;
  leadManagerProposalId: string | null;
  createdAt: any | null;
  status: string;
  updatedAt: any | null;
  uuid: string;
}

export interface CreateUpdateCreditApplication {
  /**
   * Create Update CreditApplication
   */
  createUpdateCreditApplication: CreateUpdateCreditApplication_createUpdateCreditApplication | null;
}

export interface CreateUpdateCreditApplicationVariables {
  input: CreditApplicationInputObject;
}
