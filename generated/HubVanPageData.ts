/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: HubVanPageData
// ====================================================

export interface HubVanPageData_hubVanPage_metaData {
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

export interface HubVanPageData_hubVanPage_featuredImage_file {
  url: string;
}

export interface HubVanPageData_hubVanPage_featuredImage {
  file: HubVanPageData_hubVanPage_featuredImage_file | null;
}

export interface HubVanPageData_hubVanPage_sections_hero_image_file {
  url: string;
}

export interface HubVanPageData_hubVanPage_sections_hero_image {
  title: string | null;
  file: HubVanPageData_hubVanPage_sections_hero_image_file | null;
}

export interface HubVanPageData_hubVanPage_sections_hero {
  title: string | null;
  titleTag: string | null;
  body: string | null;
  image: HubVanPageData_hubVanPage_sections_hero_image | null;
}

export interface HubVanPageData_hubVanPage_sections_leadText {
  heading: string | null;
  titleTag: string | null;
  description: string | null;
}

export interface HubVanPageData_hubVanPage_sections_featured1_iconList {
  text: string | null;
}

export interface HubVanPageData_hubVanPage_sections_featured1_link {
  url: string | null;
  text: string | null;
  legacyUrl: string | null;
}

export interface HubVanPageData_hubVanPage_sections_featured1_cards_image_file {
  url: string;
  fileName: string;
}

export interface HubVanPageData_hubVanPage_sections_featured1_cards_image {
  title: string | null;
  description: string | null;
  file: HubVanPageData_hubVanPage_sections_featured1_cards_image_file | null;
}

export interface HubVanPageData_hubVanPage_sections_featured1_cards_link {
  text: string | null;
  url: string | null;
  legacyUrl: string | null;
}

export interface HubVanPageData_hubVanPage_sections_featured1_cards {
  name: string | null;
  title: string | null;
  image: HubVanPageData_hubVanPage_sections_featured1_cards_image | null;
  body: string | null;
  link: HubVanPageData_hubVanPage_sections_featured1_cards_link | null;
}

export interface HubVanPageData_hubVanPage_sections_featured1_image_file {
  url: string;
  fileName: string;
}

export interface HubVanPageData_hubVanPage_sections_featured1_image {
  title: string | null;
  description: string | null;
  file: HubVanPageData_hubVanPage_sections_featured1_image_file | null;
}

export interface HubVanPageData_hubVanPage_sections_featured1_testimonials {
  customerName: string | null;
  summary: string | null;
  rating: string | null;
}

export interface HubVanPageData_hubVanPage_sections_featured1 {
  layout: (string | null)[] | null;
  body: string | null;
  title: string | null;
  titleTag: string | null;
  video: string | null;
  defaultHeight: number | null;
  iconList: (HubVanPageData_hubVanPage_sections_featured1_iconList | null)[] | null;
  link: HubVanPageData_hubVanPage_sections_featured1_link | null;
  cards: (HubVanPageData_hubVanPage_sections_featured1_cards | null)[] | null;
  image: HubVanPageData_hubVanPage_sections_featured1_image | null;
  testimonials: (HubVanPageData_hubVanPage_sections_featured1_testimonials | null)[] | null;
}

export interface HubVanPageData_hubVanPage_sections_featured2_iconList {
  text: string | null;
}

export interface HubVanPageData_hubVanPage_sections_featured2_link {
  url: string | null;
  text: string | null;
  legacyUrl: string | null;
}

export interface HubVanPageData_hubVanPage_sections_featured2_cards_image_file {
  url: string;
  fileName: string;
}

export interface HubVanPageData_hubVanPage_sections_featured2_cards_image {
  title: string | null;
  description: string | null;
  file: HubVanPageData_hubVanPage_sections_featured2_cards_image_file | null;
}

export interface HubVanPageData_hubVanPage_sections_featured2_cards_link {
  text: string | null;
  url: string | null;
  legacyUrl: string | null;
}

export interface HubVanPageData_hubVanPage_sections_featured2_cards {
  name: string | null;
  title: string | null;
  image: HubVanPageData_hubVanPage_sections_featured2_cards_image | null;
  body: string | null;
  link: HubVanPageData_hubVanPage_sections_featured2_cards_link | null;
}

export interface HubVanPageData_hubVanPage_sections_featured2_image_file {
  url: string;
  fileName: string;
}

export interface HubVanPageData_hubVanPage_sections_featured2_image {
  title: string | null;
  description: string | null;
  file: HubVanPageData_hubVanPage_sections_featured2_image_file | null;
}

export interface HubVanPageData_hubVanPage_sections_featured2_testimonials {
  customerName: string | null;
  summary: string | null;
  rating: string | null;
}

export interface HubVanPageData_hubVanPage_sections_featured2 {
  layout: (string | null)[] | null;
  body: string | null;
  title: string | null;
  titleTag: string | null;
  video: string | null;
  defaultHeight: number | null;
  iconList: (HubVanPageData_hubVanPage_sections_featured2_iconList | null)[] | null;
  link: HubVanPageData_hubVanPage_sections_featured2_link | null;
  cards: (HubVanPageData_hubVanPage_sections_featured2_cards | null)[] | null;
  image: HubVanPageData_hubVanPage_sections_featured2_image | null;
  testimonials: (HubVanPageData_hubVanPage_sections_featured2_testimonials | null)[] | null;
}

export interface HubVanPageData_hubVanPage_sections_rowText {
  heading: string | null;
  titleTag: string | null;
  subHeading: string | null;
  body: string | null;
}

export interface HubVanPageData_hubVanPage_sections_cards_cards_image_file {
  url: string;
}

export interface HubVanPageData_hubVanPage_sections_cards_cards_image {
  file: HubVanPageData_hubVanPage_sections_cards_cards_image_file | null;
}

export interface HubVanPageData_hubVanPage_sections_cards_cards_link {
  url: string | null;
  text: string | null;
  legacyUrl: string | null;
}

export interface HubVanPageData_hubVanPage_sections_cards_cards {
  title: string | null;
  titleTag: string | null;
  body: string | null;
  image: HubVanPageData_hubVanPage_sections_cards_cards_image | null;
  link: HubVanPageData_hubVanPage_sections_cards_cards_link | null;
}

export interface HubVanPageData_hubVanPage_sections_cards {
  name: string | null;
  titleTag: string | null;
  description: string | null;
  cards: HubVanPageData_hubVanPage_sections_cards_cards[] | null;
}

export interface HubVanPageData_hubVanPage_sections_steps_steps {
  title: string | null;
  body: string | null;
}

export interface HubVanPageData_hubVanPage_sections_steps {
  heading: string | null;
  titleTag: string | null;
  steps: HubVanPageData_hubVanPage_sections_steps_steps[] | null;
}

export interface HubVanPageData_hubVanPage_sections_tiles_tiles_link {
  text: string | null;
  url: string | null;
  legacyUrl: string | null;
}

export interface HubVanPageData_hubVanPage_sections_tiles_tiles_image_file {
  url: string;
  fileName: string;
  contentType: string;
}

export interface HubVanPageData_hubVanPage_sections_tiles_tiles_image {
  title: string | null;
  description: string | null;
  file: HubVanPageData_hubVanPage_sections_tiles_tiles_image_file | null;
}

export interface HubVanPageData_hubVanPage_sections_tiles_tiles {
  body: string | null;
  title: string | null;
  link: HubVanPageData_hubVanPage_sections_tiles_tiles_link | null;
  image: HubVanPageData_hubVanPage_sections_tiles_tiles_image | null;
}

export interface HubVanPageData_hubVanPage_sections_tiles {
  position: number | null;
  name: string | null;
  tilesTitle: string | null;
  titleTag: string | null;
  tiles: HubVanPageData_hubVanPage_sections_tiles_tiles[] | null;
}

export interface HubVanPageData_hubVanPage_sections {
  hero: HubVanPageData_hubVanPage_sections_hero | null;
  leadText: HubVanPageData_hubVanPage_sections_leadText | null;
  featured1: HubVanPageData_hubVanPage_sections_featured1 | null;
  featured2: HubVanPageData_hubVanPage_sections_featured2 | null;
  rowText: HubVanPageData_hubVanPage_sections_rowText | null;
  cards: HubVanPageData_hubVanPage_sections_cards | null;
  steps: HubVanPageData_hubVanPage_sections_steps | null;
  tiles: HubVanPageData_hubVanPage_sections_tiles | null;
}

export interface HubVanPageData_hubVanPage {
  id: string;
  metaData: HubVanPageData_hubVanPage_metaData;
  featuredImage: HubVanPageData_hubVanPage_featuredImage | null;
  sections: HubVanPageData_hubVanPage_sections | null;
}

export interface HubVanPageData {
  hubVanPage: HubVanPageData_hubVanPage;
}
