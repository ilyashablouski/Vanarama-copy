/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SearchResultsPage
// ====================================================

export interface SearchResultsPage_searchResultsPage_featuredImage_file_details_image {
  width: number;
  height: number;
}

export interface SearchResultsPage_searchResultsPage_featuredImage_file_details {
  image: SearchResultsPage_searchResultsPage_featuredImage_file_details_image;
}

export interface SearchResultsPage_searchResultsPage_featuredImage_file {
  url: string;
  details: SearchResultsPage_searchResultsPage_featuredImage_file_details;
}

export interface SearchResultsPage_searchResultsPage_featuredImage {
  file: SearchResultsPage_searchResultsPage_featuredImage_file | null;
}

export interface SearchResultsPage_searchResultsPage_metaData {
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

export interface SearchResultsPage_searchResultsPage {
  id: string;
  intro: string | null;
  body: string | null;
  featuredImage: SearchResultsPage_searchResultsPage_featuredImage | null;
  metaData: SearchResultsPage_searchResultsPage_metaData;
}

export interface SearchResultsPage {
  searchResultsPage: SearchResultsPage_searchResultsPage;
}

export interface SearchResultsPageVariables {
  slug: string;
}
