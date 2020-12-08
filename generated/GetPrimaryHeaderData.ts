/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPrimaryHeaderData
// ====================================================

export interface GetPrimaryHeaderData_primaryHeader_links {
  text: string | null;
  url: string | null;
}

export interface GetPrimaryHeaderData_primaryHeader_linkGroups_promotionalImage_image_file {
  url: string;
  fileName: string;
}

export interface GetPrimaryHeaderData_primaryHeader_linkGroups_promotionalImage_image {
  file: GetPrimaryHeaderData_primaryHeader_linkGroups_promotionalImage_image_file | null;
}

export interface GetPrimaryHeaderData_primaryHeader_linkGroups_promotionalImage {
  url: string | null;
  legacyUrl: string | null;
  image: (GetPrimaryHeaderData_primaryHeader_linkGroups_promotionalImage_image | null)[] | null;
}

export interface GetPrimaryHeaderData_primaryHeader_linkGroups_links {
  text: string | null;
  url: string | null;
}

export interface GetPrimaryHeaderData_primaryHeader_linkGroups_linkGroups_links {
  text: string | null;
  url: string | null;
}

export interface GetPrimaryHeaderData_primaryHeader_linkGroups_linkGroups {
  name: string | null;
  links: (GetPrimaryHeaderData_primaryHeader_linkGroups_linkGroups_links | null)[] | null;
}

export interface GetPrimaryHeaderData_primaryHeader_linkGroups {
  name: string | null;
  body: string | null;
  promotionalImage: GetPrimaryHeaderData_primaryHeader_linkGroups_promotionalImage | null;
  links: (GetPrimaryHeaderData_primaryHeader_linkGroups_links | null)[] | null;
  linkGroups: (GetPrimaryHeaderData_primaryHeader_linkGroups_linkGroups | null)[] | null;
}

export interface GetPrimaryHeaderData_primaryHeader {
  id: string;
  links: (GetPrimaryHeaderData_primaryHeader_links | null)[] | null;
  linkGroups: (GetPrimaryHeaderData_primaryHeader_linkGroups | null)[] | null;
}

export interface GetPrimaryHeaderData {
  primaryHeader: GetPrimaryHeaderData_primaryHeader;
}
