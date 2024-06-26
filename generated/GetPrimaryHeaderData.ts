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

export interface GetPrimaryHeaderData_primaryHeader_linkGroups_promotionalImages_image_file_details_image {
  width: number;
  height: number;
}

export interface GetPrimaryHeaderData_primaryHeader_linkGroups_promotionalImages_image_file_details {
  image: GetPrimaryHeaderData_primaryHeader_linkGroups_promotionalImages_image_file_details_image;
}

export interface GetPrimaryHeaderData_primaryHeader_linkGroups_promotionalImages_image_file {
  fileName: string;
  url: string;
  details: GetPrimaryHeaderData_primaryHeader_linkGroups_promotionalImages_image_file_details;
}

export interface GetPrimaryHeaderData_primaryHeader_linkGroups_promotionalImages_image {
  file: GetPrimaryHeaderData_primaryHeader_linkGroups_promotionalImages_image_file | null;
}

export interface GetPrimaryHeaderData_primaryHeader_linkGroups_promotionalImages {
  url: string | null;
  legacyUrl: string | null;
  image: (GetPrimaryHeaderData_primaryHeader_linkGroups_promotionalImages_image | null)[] | null;
}

export interface GetPrimaryHeaderData_primaryHeader_linkGroups_links {
  text: string | null;
  url: string | null;
  label: string | null;
}

export interface GetPrimaryHeaderData_primaryHeader_linkGroups_linkGroups_links {
  text: string | null;
  url: string | null;
  label: string | null;
}

export interface GetPrimaryHeaderData_primaryHeader_linkGroups_linkGroups_promotionalImage_image_file_details_image {
  width: number;
  height: number;
}

export interface GetPrimaryHeaderData_primaryHeader_linkGroups_linkGroups_promotionalImage_image_file_details {
  image: GetPrimaryHeaderData_primaryHeader_linkGroups_linkGroups_promotionalImage_image_file_details_image;
}

export interface GetPrimaryHeaderData_primaryHeader_linkGroups_linkGroups_promotionalImage_image_file {
  fileName: string;
  url: string;
  details: GetPrimaryHeaderData_primaryHeader_linkGroups_linkGroups_promotionalImage_image_file_details;
}

export interface GetPrimaryHeaderData_primaryHeader_linkGroups_linkGroups_promotionalImage_image {
  file: GetPrimaryHeaderData_primaryHeader_linkGroups_linkGroups_promotionalImage_image_file | null;
}

export interface GetPrimaryHeaderData_primaryHeader_linkGroups_linkGroups_promotionalImage {
  url: string | null;
  legacyUrl: string | null;
  image: (GetPrimaryHeaderData_primaryHeader_linkGroups_linkGroups_promotionalImage_image | null)[] | null;
}

export interface GetPrimaryHeaderData_primaryHeader_linkGroups_linkGroups {
  name: string | null;
  links: (GetPrimaryHeaderData_primaryHeader_linkGroups_linkGroups_links | null)[] | null;
  promotionalImage: GetPrimaryHeaderData_primaryHeader_linkGroups_linkGroups_promotionalImage | null;
}

export interface GetPrimaryHeaderData_primaryHeader_linkGroups {
  name: string | null;
  body: string | null;
  promotionalImages: (GetPrimaryHeaderData_primaryHeader_linkGroups_promotionalImages | null)[] | null;
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
