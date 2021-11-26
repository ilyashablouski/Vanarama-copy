/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: VatDetails
// ====================================================

export interface VatDetails_turnoverPercentageOutsideUk {
  country: string;
  percentage: string;
}

export interface VatDetails {
  uuid: string;
  isVatRegistered: boolean | null;
  tradesOutsideUk: boolean | null;
  turnoverPercentageOutsideUk: VatDetails_turnoverPercentageOutsideUk[] | null;
  vatNumber: string | null;
}
