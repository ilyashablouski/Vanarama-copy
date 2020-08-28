/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PrimaryFooter
// ====================================================

export interface PrimaryFooter_primaryFooter_linkGroups_links {
  url: string | null;
  text: string | null;
}

export interface PrimaryFooter_primaryFooter_linkGroups_linkGroups_links {
  text: string | null;
  url: string | null;
}
export interface PrimaryFooter_primaryFooter_linkGroups_linkGroups {
  name: string | null;
  body: string | null;
  links: (PrimaryFooter_primaryFooter_linkGroups_linkGroups_links | null)[] | null;
}
export interface PrimaryFooter_primaryFooter_linkGroups {
  name: string | null;
  body: string | null;
  links: (PrimaryFooter_primaryFooter_linkGroups_links | null)[] | null;
  linkGroups: (PrimaryFooter_primaryFooter_linkGroups_linkGroups | null)[] | null;
}

export interface PrimaryFooter_primaryFooter_legalStatement {
  name: string | null;
  title: string | null;
  body: string | null;
}

export interface PrimaryFooter_primaryFooter {
  id: string;
  linkGroups: (PrimaryFooter_primaryFooter_linkGroups | null)[] | null;
  legalStatement: PrimaryFooter_primaryFooter_legalStatement | null;
}

export interface PrimaryFooter {
  primaryFooter: PrimaryFooter_primaryFooter;
}
