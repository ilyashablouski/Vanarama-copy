/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: vanaramaSmilesPageQuery
// ====================================================

export interface vanaramaSmilesPageQuery_genericPage_metaData {
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

export interface vanaramaSmilesPageQuery_genericPage_featuredImage_file {
  url: string;
  fileName: string;
  contentType: string;
}

export interface vanaramaSmilesPageQuery_genericPage_featuredImage {
  title: string | null;
  description: string | null;
  file: vanaramaSmilesPageQuery_genericPage_featuredImage_file | null;
}

export interface vanaramaSmilesPageQuery_genericPage_sections_featured1_image_file {
  url: string;
  fileName: string;
  contentType: string;
}

export interface vanaramaSmilesPageQuery_genericPage_sections_featured1_image {
  title: string | null;
  description: string | null;
  file: vanaramaSmilesPageQuery_genericPage_sections_featured1_image_file | null;
}

export interface vanaramaSmilesPageQuery_genericPage_sections_featured1 {
  title: string | null;
  titleTag: string | null;
  body: string | null;
  image: vanaramaSmilesPageQuery_genericPage_sections_featured1_image | null;
  layout: (string | null)[] | null;
}

export interface vanaramaSmilesPageQuery_genericPage_sections_featured2_image_file {
  url: string;
  fileName: string;
  contentType: string;
}

export interface vanaramaSmilesPageQuery_genericPage_sections_featured2_image {
  title: string | null;
  description: string | null;
  file: vanaramaSmilesPageQuery_genericPage_sections_featured2_image_file | null;
}

export interface vanaramaSmilesPageQuery_genericPage_sections_featured2 {
  title: string | null;
  titleTag: string | null;
  body: string | null;
  image: vanaramaSmilesPageQuery_genericPage_sections_featured2_image | null;
  layout: (string | null)[] | null;
}

export interface vanaramaSmilesPageQuery_genericPage_sections_featured3_image_file {
  url: string;
  fileName: string;
  contentType: string;
}

export interface vanaramaSmilesPageQuery_genericPage_sections_featured3_image {
  title: string | null;
  description: string | null;
  file: vanaramaSmilesPageQuery_genericPage_sections_featured3_image_file | null;
}

export interface vanaramaSmilesPageQuery_genericPage_sections_featured3 {
  title: string | null;
  titleTag: string | null;
  body: string | null;
  image: vanaramaSmilesPageQuery_genericPage_sections_featured3_image | null;
  layout: (string | null)[] | null;
}

export interface vanaramaSmilesPageQuery_genericPage_sections_tiles_tiles_image_file {
  url: string;
  fileName: string;
  contentType: string;
}

export interface vanaramaSmilesPageQuery_genericPage_sections_tiles_tiles_image {
  title: string | null;
  description: string | null;
  file: vanaramaSmilesPageQuery_genericPage_sections_tiles_tiles_image_file | null;
}

export interface vanaramaSmilesPageQuery_genericPage_sections_tiles_tiles {
  title: string | null;
  body: string | null;
  link: string | null;
  image: vanaramaSmilesPageQuery_genericPage_sections_tiles_tiles_image | null;
}

export interface vanaramaSmilesPageQuery_genericPage_sections_tiles {
  name: string | null;
  tilesTitle: string | null;
  titleTag: string | null;
  tiles: vanaramaSmilesPageQuery_genericPage_sections_tiles_tiles[] | null;
}

export interface vanaramaSmilesPageQuery_genericPage_sections {
  featured1: vanaramaSmilesPageQuery_genericPage_sections_featured1 | null;
  featured2: vanaramaSmilesPageQuery_genericPage_sections_featured2 | null;
  featured3: vanaramaSmilesPageQuery_genericPage_sections_featured3 | null;
  tiles: vanaramaSmilesPageQuery_genericPage_sections_tiles | null;
}

export interface vanaramaSmilesPageQuery_genericPage {
  id: string;
  intro: string | null;
  body: string | null;
  metaData: vanaramaSmilesPageQuery_genericPage_metaData;
  featuredImage: vanaramaSmilesPageQuery_genericPage_featuredImage | null;
  sections: vanaramaSmilesPageQuery_genericPage_sections | null;
}

export interface vanaramaSmilesPageQuery {
  genericPage: vanaramaSmilesPageQuery_genericPage;
}

export interface vanaramaSmilesPageQueryVariables {
  slug: string;
}
