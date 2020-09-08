/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: LegalPageQuery
// ====================================================

export interface LegalPageQuery_genericPage_metaData {
  title: string | null;
  name: string | null;
  metaRobots: string | null;
  metaDescription: string | null;
  publishedOn: any | null;
  legacyUrl: string | null;
  pageType: string | null;
  canonicalUrl: string | null;
  slug: string | null;
  schema: any | null;
}

export interface LegalPageQuery_genericPage_featuredImage_file_details_image {
  width: number;
  height: number;
}

export interface LegalPageQuery_genericPage_featuredImage_file_details {
  image: LegalPageQuery_genericPage_featuredImage_file_details_image;
}

export interface LegalPageQuery_genericPage_featuredImage_file {
  url: string;
  details: LegalPageQuery_genericPage_featuredImage_file_details;
}

export interface LegalPageQuery_genericPage_featuredImage {
  file: LegalPageQuery_genericPage_featuredImage_file | null;
}

export interface LegalPageQuery_genericPage_sections_legalStatement {
  name: string | null;
  title: string | null;
  body: string | null;
}

export interface LegalPageQuery_genericPage_sections_legalStatement1 {
  name: string | null;
  title: string | null;
  body: string | null;
}

export interface LegalPageQuery_genericPage_sections_legalStatement2 {
  name: string | null;
  title: string | null;
  body: string | null;
}

export interface LegalPageQuery_genericPage_sections {
  legalStatement: LegalPageQuery_genericPage_sections_legalStatement | null;
  legalStatement1: LegalPageQuery_genericPage_sections_legalStatement1 | null;
  legalStatement2: LegalPageQuery_genericPage_sections_legalStatement2 | null;
}

export interface LegalPageQuery_genericPage {
  id: string;
  intro: string | null;
  body: string | null;
  metaData: LegalPageQuery_genericPage_metaData;
  featuredImage: LegalPageQuery_genericPage_featuredImage | null;
  sections: LegalPageQuery_genericPage_sections | null;
}

export interface LegalPageQuery {
  genericPage: LegalPageQuery_genericPage;
}

export interface LegalPageQueryVariables {
  slug: string;
}
