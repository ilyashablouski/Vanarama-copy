/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { VehicleTypeEnum } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: fullCreditChecker
// ====================================================

export interface fullCreditChecker_fullCreditChecker_creditCheck_creditCheckLines {
  uuid: string | null;
  funder: string | null;
  likelihood: number | null;
}

export interface fullCreditChecker_fullCreditChecker_creditCheck {
  uuid: string;
  creditCheckType: string | null;
  creditCheckLines: fullCreditChecker_fullCreditChecker_creditCheck_creditCheckLines[] | null;
}

export interface fullCreditChecker_fullCreditChecker_party_person {
  uuid: string;
  partyId: string;
  partyUuid: string;
  firstName: string;
  lastName: string;
}

export interface fullCreditChecker_fullCreditChecker_party {
  uuid: string;
  person: fullCreditChecker_fullCreditChecker_party_person | null;
}

export interface fullCreditChecker_fullCreditChecker {
  creditCheck: fullCreditChecker_fullCreditChecker_creditCheck | null;
  party: fullCreditChecker_fullCreditChecker_party | null;
}

export interface fullCreditChecker {
  /**
   * FullCreditChecker for soft credit check with order data
   */
  fullCreditChecker: fullCreditChecker_fullCreditChecker | null;
}

export interface fullCreditCheckerVariables {
  partyId: string;
  creditApplicationUuid: string;
  orderUuid: string;
  vehicleType: VehicleTypeEnum;
  monthlyPayment: number;
  depositPayment: number;
}
