/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Partner
// ====================================================

export interface Partner_partner_logo_file {
  url: string;
}

export interface Partner_partner_logo {
  title: string | null;
  file: Partner_partner_logo_file | null;
}

export interface Partner_partner {
  logo: Partner_partner_logo | null;
}

export interface Partner {
  partner: Partner_partner | null;
}

export interface PartnerVariables {
  slug: string;
}
