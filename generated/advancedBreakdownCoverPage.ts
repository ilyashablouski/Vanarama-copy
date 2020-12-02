/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: advancedBreakdownCoverPage
// ====================================================

export interface advancedBreakdownCoverPage_advancedBreakdownCoverPage_metaData {
  title: string | null;
  name: string | null;
  metaRobots: string | null;
  metaDescription: string | null;
  legacyUrl: string | null;
  pageType: string | null;
  canonicalUrl: string | null;
  slug: string | null;
  schema: any | null;
  publishedOn: any | null;
  breadcrumbs: any | null;
}

export interface advancedBreakdownCoverPage_advancedBreakdownCoverPage_featuredImage_file {
  url: string;
  fileName: string;
  contentType: string;
}

export interface advancedBreakdownCoverPage_advancedBreakdownCoverPage_featuredImage {
  title: string | null;
  description: string | null;
  file: advancedBreakdownCoverPage_advancedBreakdownCoverPage_featuredImage_file | null;
}

export interface advancedBreakdownCoverPage_advancedBreakdownCoverPage_sections_featured1_image_file {
  url: string;
  fileName: string;
  contentType: string;
}

export interface advancedBreakdownCoverPage_advancedBreakdownCoverPage_sections_featured1_image {
  title: string | null;
  description: string | null;
  file: advancedBreakdownCoverPage_advancedBreakdownCoverPage_sections_featured1_image_file | null;
}

export interface advancedBreakdownCoverPage_advancedBreakdownCoverPage_sections_featured1 {
  title: string | null;
  titleTag: string | null;
  body: string | null;
  image: advancedBreakdownCoverPage_advancedBreakdownCoverPage_sections_featured1_image | null;
  layout: (string | null)[] | null;
}

export interface advancedBreakdownCoverPage_advancedBreakdownCoverPage_sections_featured2_image_file {
  url: string;
  fileName: string;
  contentType: string;
}

export interface advancedBreakdownCoverPage_advancedBreakdownCoverPage_sections_featured2_image {
  title: string | null;
  description: string | null;
  file: advancedBreakdownCoverPage_advancedBreakdownCoverPage_sections_featured2_image_file | null;
}

export interface advancedBreakdownCoverPage_advancedBreakdownCoverPage_sections_featured2 {
  title: string | null;
  titleTag: string | null;
  body: string | null;
  image: advancedBreakdownCoverPage_advancedBreakdownCoverPage_sections_featured2_image | null;
  layout: (string | null)[] | null;
}

export interface advancedBreakdownCoverPage_advancedBreakdownCoverPage_sections_featured3_image_file {
  url: string;
  fileName: string;
  contentType: string;
}

export interface advancedBreakdownCoverPage_advancedBreakdownCoverPage_sections_featured3_image {
  title: string | null;
  description: string | null;
  file: advancedBreakdownCoverPage_advancedBreakdownCoverPage_sections_featured3_image_file | null;
}

export interface advancedBreakdownCoverPage_advancedBreakdownCoverPage_sections_featured3 {
  title: string | null;
  titleTag: string | null;
  body: string | null;
  image: advancedBreakdownCoverPage_advancedBreakdownCoverPage_sections_featured3_image | null;
  layout: (string | null)[] | null;
}

export interface advancedBreakdownCoverPage_advancedBreakdownCoverPage_sections_tiles_tiles_link {
  text: string | null;
  url: string | null;
  legacyUrl: string | null;
}

export interface advancedBreakdownCoverPage_advancedBreakdownCoverPage_sections_tiles_tiles_image_file {
  url: string;
  fileName: string;
  contentType: string;
}

export interface advancedBreakdownCoverPage_advancedBreakdownCoverPage_sections_tiles_tiles_image {
  title: string | null;
  description: string | null;
  file: advancedBreakdownCoverPage_advancedBreakdownCoverPage_sections_tiles_tiles_image_file | null;
}

export interface advancedBreakdownCoverPage_advancedBreakdownCoverPage_sections_tiles_tiles {
  title: string | null;
  body: string | null;
  link: advancedBreakdownCoverPage_advancedBreakdownCoverPage_sections_tiles_tiles_link | null;
  image: advancedBreakdownCoverPage_advancedBreakdownCoverPage_sections_tiles_tiles_image | null;
}

export interface advancedBreakdownCoverPage_advancedBreakdownCoverPage_sections_tiles {
  name: string | null;
  tilesTitle: string | null;
  titleTag: string | null;
  position: number | null;
  tiles: advancedBreakdownCoverPage_advancedBreakdownCoverPage_sections_tiles_tiles[] | null;
}

export interface advancedBreakdownCoverPage_advancedBreakdownCoverPage_sections {
  featured1: advancedBreakdownCoverPage_advancedBreakdownCoverPage_sections_featured1 | null;
  featured2: advancedBreakdownCoverPage_advancedBreakdownCoverPage_sections_featured2 | null;
  featured3: advancedBreakdownCoverPage_advancedBreakdownCoverPage_sections_featured3 | null;
  tiles: advancedBreakdownCoverPage_advancedBreakdownCoverPage_sections_tiles | null;
}

export interface advancedBreakdownCoverPage_advancedBreakdownCoverPage {
  id: string;
  intro: string | null;
  body: string | null;
  metaData: advancedBreakdownCoverPage_advancedBreakdownCoverPage_metaData;
  featuredImage: advancedBreakdownCoverPage_advancedBreakdownCoverPage_featuredImage | null;
  sections: advancedBreakdownCoverPage_advancedBreakdownCoverPage_sections | null;
}

export interface advancedBreakdownCoverPage {
  advancedBreakdownCoverPage: advancedBreakdownCoverPage_advancedBreakdownCoverPage;
}
