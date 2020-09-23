/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: SoleTraderCompanyDetailsSummary
// ====================================================

export interface SoleTraderCompanyDetailsSummary_addresses {
  serviceId: string | null;
  kind: string | null;
  lineOne: string;
  lineTwo: string | null;
  country: string;
  city: string;
  postcode: string;
}

export interface SoleTraderCompanyDetailsSummary_emailAddresses {
  kind: string | null;
  value: string;
}

export interface SoleTraderCompanyDetailsSummary_telephoneNumbers {
  kind: string | null;
  value: string;
}

export interface SoleTraderCompanyDetailsSummary {
  __typename: "CompanyType";
  uuid: string;
  tradingName: string | null;
  monthlyAmountBeingReplaced: number | null;
  annualTurnover: number | null;
  companyNature: string | null;
  annualSalesCost: number | null;
  annualExpenses: number | null;
  vehicleRegistrationNumber: string | null;
  companyType: string | null;
  tradingSince: any | null;
  addresses: SoleTraderCompanyDetailsSummary_addresses[] | null;
  emailAddresses: SoleTraderCompanyDetailsSummary_emailAddresses[];
  telephoneNumbers: SoleTraderCompanyDetailsSummary_telephoneNumbers[] | null;
}
