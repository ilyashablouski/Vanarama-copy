/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: manufacturerPage
// ====================================================

export interface manufacturerPage_manufacturerPage_metaData {
  pageType: string | null;
  slug: string | null;
  title: string | null;
  metaRobots: string | null;
  metaDescription: string | null;
  legacyUrl: string | null;
  publishedOn: any | null;
  name: string | null;
}

export interface manufacturerPage_manufacturerPage_sections_featured_image_file {
  url: string;
  fileName: string;
}

export interface manufacturerPage_manufacturerPage_sections_featured_image {
  title: string | null;
  description: string | null;
  file: manufacturerPage_manufacturerPage_sections_featured_image_file | null;
}

export interface manufacturerPage_manufacturerPage_sections_featured {
  layout: string[] | null;
  body: string | null;
  title: string | null;
  titleTag: string | null;
  image: manufacturerPage_manufacturerPage_sections_featured_image | null;
}

export interface manufacturerPage_manufacturerPage_sections {
  featured: manufacturerPage_manufacturerPage_sections_featured | null;
}

export interface manufacturerPage_manufacturerPage_featuredImage_file {
  url: string;
  fileName: string;
  contentType: string;
}

export interface manufacturerPage_manufacturerPage_featuredImage {
  title: string | null;
  description: string | null;
  file: manufacturerPage_manufacturerPage_featuredImage_file | null;
}

export interface manufacturerPage_manufacturerPage {
  metaData: manufacturerPage_manufacturerPage_metaData;
  sections: manufacturerPage_manufacturerPage_sections | null;
  featuredImage: manufacturerPage_manufacturerPage_featuredImage | null;
}

export interface manufacturerPage {
  manufacturerPage: manufacturerPage_manufacturerPage;
}
