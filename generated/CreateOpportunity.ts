/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateOpportunity
// ====================================================

export interface CreateOpportunity_createOpportunity {
  uuid: string;
}

export interface CreateOpportunity {
  /**
   * Create new Opportunity
   */
  createOpportunity: CreateOpportunity_createOpportunity | null;
}

export interface CreateOpportunityVariables {
  capId?: number | null;
  email: string;
  fullName: string;
  marketingPreference?: boolean | null;
  kind: string;
  phoneNumber: string;
  postcode: string;
  termsAndConditions?: boolean | null;
  vehicleType?: string | null;
}
