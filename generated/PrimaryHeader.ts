/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PrimaryHeader
// ====================================================

export interface PrimaryHeader_primaryHeader_links {
  text: string | null;
  url: string | null;
}

export interface PrimaryHeader_primaryHeader_linkGroups_links {
  text: string | null;
  url: string | null;
}

export interface PrimaryHeader_primaryHeader_linkGroups_linkGroups_links {
  text: string | null;
  url: string | null;
}

export interface PrimaryHeader_primaryHeader_linkGroups_linkGroups {
  name: string | null;
  links: (PrimaryHeader_primaryHeader_linkGroups_linkGroups_links | null)[] | null;
}

export interface PrimaryHeader_primaryHeader_linkGroups {
  name: string | null;
  body: string | null;
  links: (PrimaryHeader_primaryHeader_linkGroups_links | null)[] | null;
  linkGroups: (PrimaryHeader_primaryHeader_linkGroups_linkGroups | null)[] | null;
}

export interface PrimaryHeader_primaryHeader {
  id: string;
  links: (PrimaryHeader_primaryHeader_links | null)[] | null;
  linkGroups: (PrimaryHeader_primaryHeader_linkGroups | null)[] | null;
}

export interface PrimaryHeader {
  primaryHeader: PrimaryHeader_primaryHeader;
}
