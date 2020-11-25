/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: HubPickupPageData
// ====================================================

export interface HubPickupPageData_hubPickupPage_metaData {
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

export interface HubPickupPageData_hubPickupPage_featuredImage_file {
  url: string;
}

export interface HubPickupPageData_hubPickupPage_featuredImage {
  file: HubPickupPageData_hubPickupPage_featuredImage_file | null;
}

export interface HubPickupPageData_hubPickupPage_sections_hero_image_file {
  url: string;
}

export interface HubPickupPageData_hubPickupPage_sections_hero_image {
  title: string | null;
  file: HubPickupPageData_hubPickupPage_sections_hero_image_file | null;
}

export interface HubPickupPageData_hubPickupPage_sections_hero {
  title: string | null;
  titleTag: string | null;
  body: string | null;
  image: HubPickupPageData_hubPickupPage_sections_hero_image | null;
}

export interface HubPickupPageData_hubPickupPage_sections_leadText {
  heading: string | null;
  titleTag: string | null;
  description: string | null;
}

export interface HubPickupPageData_hubPickupPage_sections_featured1_iconList {
  text: string | null;
}

export interface HubPickupPageData_hubPickupPage_sections_featured1_link {
  url: string | null;
  text: string | null;
  legacyUrl: string | null;
}

export interface HubPickupPageData_hubPickupPage_sections_featured1_cards_image_file {
  url: string;
  fileName: string;
}

export interface HubPickupPageData_hubPickupPage_sections_featured1_cards_image {
  title: string | null;
  description: string | null;
  file: HubPickupPageData_hubPickupPage_sections_featured1_cards_image_file | null;
}

export interface HubPickupPageData_hubPickupPage_sections_featured1_cards_link {
  text: string | null;
  url: string | null;
  legacyUrl: string | null;
}

export interface HubPickupPageData_hubPickupPage_sections_featured1_cards {
  name: string | null;
  title: string | null;
  image: HubPickupPageData_hubPickupPage_sections_featured1_cards_image | null;
  body: string | null;
  link: HubPickupPageData_hubPickupPage_sections_featured1_cards_link | null;
}

export interface HubPickupPageData_hubPickupPage_sections_featured1_image_file {
  url: string;
  fileName: string;
}

export interface HubPickupPageData_hubPickupPage_sections_featured1_image {
  title: string | null;
  description: string | null;
  file: HubPickupPageData_hubPickupPage_sections_featured1_image_file | null;
}

export interface HubPickupPageData_hubPickupPage_sections_featured1_testimonials {
  customerName: string | null;
  summary: string | null;
  rating: string | null;
}

export interface HubPickupPageData_hubPickupPage_sections_featured1 {
  layout: (string | null)[] | null;
  body: string | null;
  title: string | null;
  titleTag: string | null;
  video: string | null;
  defaultHeight: number | null;
  iconList: (HubPickupPageData_hubPickupPage_sections_featured1_iconList | null)[] | null;
  link: HubPickupPageData_hubPickupPage_sections_featured1_link | null;
  cards: (HubPickupPageData_hubPickupPage_sections_featured1_cards | null)[] | null;
  image: HubPickupPageData_hubPickupPage_sections_featured1_image | null;
  testimonials: (HubPickupPageData_hubPickupPage_sections_featured1_testimonials | null)[] | null;
}

export interface HubPickupPageData_hubPickupPage_sections_featured2_iconList {
  text: string | null;
}

export interface HubPickupPageData_hubPickupPage_sections_featured2_link {
  url: string | null;
  text: string | null;
  legacyUrl: string | null;
}

export interface HubPickupPageData_hubPickupPage_sections_featured2_cards_image_file {
  url: string;
  fileName: string;
}

export interface HubPickupPageData_hubPickupPage_sections_featured2_cards_image {
  title: string | null;
  description: string | null;
  file: HubPickupPageData_hubPickupPage_sections_featured2_cards_image_file | null;
}

export interface HubPickupPageData_hubPickupPage_sections_featured2_cards_link {
  text: string | null;
  url: string | null;
  legacyUrl: string | null;
}

export interface HubPickupPageData_hubPickupPage_sections_featured2_cards {
  name: string | null;
  title: string | null;
  image: HubPickupPageData_hubPickupPage_sections_featured2_cards_image | null;
  body: string | null;
  link: HubPickupPageData_hubPickupPage_sections_featured2_cards_link | null;
}

export interface HubPickupPageData_hubPickupPage_sections_featured2_image_file {
  url: string;
  fileName: string;
}

export interface HubPickupPageData_hubPickupPage_sections_featured2_image {
  title: string | null;
  description: string | null;
  file: HubPickupPageData_hubPickupPage_sections_featured2_image_file | null;
}

export interface HubPickupPageData_hubPickupPage_sections_featured2_testimonials {
  customerName: string | null;
  summary: string | null;
  rating: string | null;
}

export interface HubPickupPageData_hubPickupPage_sections_featured2 {
  layout: (string | null)[] | null;
  body: string | null;
  title: string | null;
  titleTag: string | null;
  video: string | null;
  defaultHeight: number | null;
  iconList: (HubPickupPageData_hubPickupPage_sections_featured2_iconList | null)[] | null;
  link: HubPickupPageData_hubPickupPage_sections_featured2_link | null;
  cards: (HubPickupPageData_hubPickupPage_sections_featured2_cards | null)[] | null;
  image: HubPickupPageData_hubPickupPage_sections_featured2_image | null;
  testimonials: (HubPickupPageData_hubPickupPage_sections_featured2_testimonials | null)[] | null;
}

export interface HubPickupPageData_hubPickupPage_sections_rowText {
  heading: string | null;
  titleTag: string | null;
  subHeading: string | null;
  body: string | null;
}

export interface HubPickupPageData_hubPickupPage_sections_steps_steps {
  title: string | null;
  body: string | null;
}

export interface HubPickupPageData_hubPickupPage_sections_steps {
  heading: string | null;
  titleTag: string | null;
  steps: HubPickupPageData_hubPickupPage_sections_steps_steps[] | null;
}

export interface HubPickupPageData_hubPickupPage_sections_tiles1_tiles_link {
  text: string | null;
  url: string | null;
  legacyUrl: string | null;
}

export interface HubPickupPageData_hubPickupPage_sections_tiles1_tiles_image_file {
  url: string;
  fileName: string;
  contentType: string;
}

export interface HubPickupPageData_hubPickupPage_sections_tiles1_tiles_image {
  title: string | null;
  description: string | null;
  file: HubPickupPageData_hubPickupPage_sections_tiles1_tiles_image_file | null;
}

export interface HubPickupPageData_hubPickupPage_sections_tiles1_tiles {
  body: string | null;
  title: string | null;
  link: HubPickupPageData_hubPickupPage_sections_tiles1_tiles_link | null;
  image: HubPickupPageData_hubPickupPage_sections_tiles1_tiles_image | null;
}

export interface HubPickupPageData_hubPickupPage_sections_tiles1 {
  position: number | null;
  name: string | null;
  tilesTitle: string | null;
  titleTag: string | null;
  tiles: HubPickupPageData_hubPickupPage_sections_tiles1_tiles[] | null;
}

export interface HubPickupPageData_hubPickupPage_sections_tiles2_tiles_link {
  text: string | null;
  url: string | null;
  legacyUrl: string | null;
}

export interface HubPickupPageData_hubPickupPage_sections_tiles2_tiles_image_file {
  url: string;
  fileName: string;
  contentType: string;
}

export interface HubPickupPageData_hubPickupPage_sections_tiles2_tiles_image {
  title: string | null;
  description: string | null;
  file: HubPickupPageData_hubPickupPage_sections_tiles2_tiles_image_file | null;
}

export interface HubPickupPageData_hubPickupPage_sections_tiles2_tiles {
  body: string | null;
  title: string | null;
  link: HubPickupPageData_hubPickupPage_sections_tiles2_tiles_link | null;
  image: HubPickupPageData_hubPickupPage_sections_tiles2_tiles_image | null;
}

export interface HubPickupPageData_hubPickupPage_sections_tiles2 {
  position: number | null;
  name: string | null;
  tilesTitle: string | null;
  titleTag: string | null;
  tiles: HubPickupPageData_hubPickupPage_sections_tiles2_tiles[] | null;
}

export interface HubPickupPageData_hubPickupPage_sections {
  hero: HubPickupPageData_hubPickupPage_sections_hero | null;
  leadText: HubPickupPageData_hubPickupPage_sections_leadText | null;
  featured1: HubPickupPageData_hubPickupPage_sections_featured1 | null;
  featured2: HubPickupPageData_hubPickupPage_sections_featured2 | null;
  rowText: HubPickupPageData_hubPickupPage_sections_rowText | null;
  steps: HubPickupPageData_hubPickupPage_sections_steps | null;
  tiles1: HubPickupPageData_hubPickupPage_sections_tiles1 | null;
  tiles2: HubPickupPageData_hubPickupPage_sections_tiles2 | null;
}

export interface HubPickupPageData_hubPickupPage {
  id: string;
  metaData: HubPickupPageData_hubPickupPage_metaData;
  featuredImage: HubPickupPageData_hubPickupPage_featuredImage | null;
  sections: HubPickupPageData_hubPickupPage_sections | null;
}

export interface HubPickupPageData {
  hubPickupPage: HubPickupPageData_hubPickupPage;
}
