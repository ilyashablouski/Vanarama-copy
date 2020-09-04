/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: HubCarPageData
// ====================================================

export interface HubCarPageData_hubCarPage_metaData {
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

export interface HubCarPageData_hubCarPage_featuredImage_file {
  url: string;
  fileName: string;
  contentType: string;
}

export interface HubCarPageData_hubCarPage_featuredImage {
  title: string | null;
  description: string | null;
  file: HubCarPageData_hubCarPage_featuredImage_file | null;
}

export interface HubCarPageData_hubCarPage_sections_hero_image_file {
  url: string;
}

export interface HubCarPageData_hubCarPage_sections_hero_image {
  title: string | null;
  file: HubCarPageData_hubCarPage_sections_hero_image_file | null;
}

export interface HubCarPageData_hubCarPage_sections_hero {
  title: string | null;
  titleTag: string | null;
  body: string | null;
  image: HubCarPageData_hubCarPage_sections_hero_image | null;
}

export interface HubCarPageData_hubCarPage_sections_leadText {
  heading: string | null;
  titleTag: string | null;
  description: string | null;
}

export interface HubCarPageData_hubCarPage_sections_featured1_image_file {
  url: string;
}

export interface HubCarPageData_hubCarPage_sections_featured1_image {
  file: HubCarPageData_hubCarPage_sections_featured1_image_file | null;
}

export interface HubCarPageData_hubCarPage_sections_featured1 {
  title: string | null;
  titleTag: string | null;
  body: string | null;
  layout: (string | null)[] | null;
  image: HubCarPageData_hubCarPage_sections_featured1_image | null;
}

export interface HubCarPageData_hubCarPage_sections_featured2_image_file {
  url: string;
}

export interface HubCarPageData_hubCarPage_sections_featured2_image {
  file: HubCarPageData_hubCarPage_sections_featured2_image_file | null;
}

export interface HubCarPageData_hubCarPage_sections_featured2 {
  title: string | null;
  titleTag: string | null;
  body: string | null;
  layout: (string | null)[] | null;
  image: HubCarPageData_hubCarPage_sections_featured2_image | null;
}

export interface HubCarPageData_hubCarPage_sections_steps_steps {
  title: string | null;
  body: string | null;
}

export interface HubCarPageData_hubCarPage_sections_steps {
  heading: string | null;
  steps: HubCarPageData_hubCarPage_sections_steps_steps[] | null;
}

export interface HubCarPageData_hubCarPage_sections_tiles_tiles_image_file {
  url: string;
}

export interface HubCarPageData_hubCarPage_sections_tiles_tiles_image {
  file: HubCarPageData_hubCarPage_sections_tiles_tiles_image_file | null;
  title: string | null;
}

export interface HubCarPageData_hubCarPage_sections_tiles_tiles {
  title: string | null;
  link: string | null;
  body: string | null;
  image: HubCarPageData_hubCarPage_sections_tiles_tiles_image | null;
}

export interface HubCarPageData_hubCarPage_sections_tiles {
  name: string | null;
  titleTag: string | null;
  tilesTitle: string | null;
  tiles: HubCarPageData_hubCarPage_sections_tiles_tiles[] | null;
}

export interface HubCarPageData_hubCarPage_sections {
  hero: HubCarPageData_hubCarPage_sections_hero | null;
  leadText: HubCarPageData_hubCarPage_sections_leadText | null;
  featured1: HubCarPageData_hubCarPage_sections_featured1 | null;
  featured2: HubCarPageData_hubCarPage_sections_featured2 | null;
  steps: HubCarPageData_hubCarPage_sections_steps | null;
  tiles: HubCarPageData_hubCarPage_sections_tiles | null;
}

export interface HubCarPageData_hubCarPage {
  id: string;
  metaData: HubCarPageData_hubCarPage_metaData;
  featuredImage: HubCarPageData_hubCarPage_featuredImage | null;
  sections: HubCarPageData_hubCarPage_sections | null;
}

export interface HubCarPageData {
  hubCarPage: HubCarPageData_hubCarPage;
}
