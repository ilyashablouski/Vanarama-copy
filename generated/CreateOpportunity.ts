/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OpportunityTypeEnum } from "./globalTypes";

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
  opportunityType: OpportunityTypeEnum;
  phoneNumber: string;
  postcode?: string | null;
  termsAndConditions: boolean;
  privacyPolicy: boolean;
  communicationsConsent?: boolean | null;
  vehicleType?: string | null;
  companyName?: string | null;
  fleetSize?: number | null;
}
