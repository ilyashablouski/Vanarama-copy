/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GenericPageHeadQuery
// ====================================================

export interface GenericPageHeadQuery_genericPage_metaData {
  title: string | null;
  metaRobots: string | null;
  metaDescription: string | null;
  publishedOn: any | null;
  legacyUrl: string | null;
  pageType: string | null;
  canonicalUrl: string | null;
  slug: string | null;
  schema: any | null;
  name: string | null;
}

export interface GenericPageHeadQuery_genericPage_featuredImage_file {
  url: string;
  fileName: string;
  contentType: string;
}

export interface GenericPageHeadQuery_genericPage_featuredImage {
  title: string | null;
  description: string | null;
  file: GenericPageHeadQuery_genericPage_featuredImage_file | null;
}

export interface GenericPageHeadQuery_genericPage {
  id: string;
  metaData: GenericPageHeadQuery_genericPage_metaData;
  featuredImage: GenericPageHeadQuery_genericPage_featuredImage | null;
}

export interface GenericPageHeadQuery {
  genericPage: GenericPageHeadQuery_genericPage;
}

export interface GenericPageHeadQueryVariables {
  slug: string;
}
