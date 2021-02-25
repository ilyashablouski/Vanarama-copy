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
  legacyUrl: string | null;
  pageType: string | null;
  canonicalUrl: string | null;
  slug: string | null;
  schema: any | null;
  publishedOn: any | null;
  breadcrumbs: any | null;
}

export interface HubCarPageData_hubCarPage_featuredImage_file {
  url: string;
}

export interface HubCarPageData_hubCarPage_featuredImage {
  file: HubCarPageData_hubCarPage_featuredImage_file | null;
}

export interface HubCarPageData_hubCarPage_sections_hero_image_file {
  url: string;
}

export interface HubCarPageData_hubCarPage_sections_hero_image {
  title: string | null;
  file: HubCarPageData_hubCarPage_sections_hero_image_file | null;
}

export interface HubCarPageData_hubCarPage_sections_hero_heroLabel_link {
  text: string | null;
  url: string | null;
  visible: boolean | null;
}

export interface HubCarPageData_hubCarPage_sections_hero_heroLabel {
  text: string | null;
  visible: boolean | null;
  link: HubCarPageData_hubCarPage_sections_hero_heroLabel_link | null;
}

export interface HubCarPageData_hubCarPage_sections_hero {
  title: string | null;
  titleTag: string | null;
  body: string | null;
  image: HubCarPageData_hubCarPage_sections_hero_image | null;
  heroLabel: (HubCarPageData_hubCarPage_sections_hero_heroLabel | null)[] | null;
}

export interface HubCarPageData_hubCarPage_sections_leadText {
  heading: string | null;
  titleTag: string | null;
  description: string | null;
}

export interface HubCarPageData_hubCarPage_sections_featured1_iconList {
  text: string | null;
}

export interface HubCarPageData_hubCarPage_sections_featured1_link {
  url: string | null;
  text: string | null;
  legacyUrl: string | null;
}

export interface HubCarPageData_hubCarPage_sections_featured1_cards_image_file {
  url: string;
  fileName: string;
}

export interface HubCarPageData_hubCarPage_sections_featured1_cards_image {
  title: string | null;
  description: string | null;
  file: HubCarPageData_hubCarPage_sections_featured1_cards_image_file | null;
}

export interface HubCarPageData_hubCarPage_sections_featured1_cards_link {
  text: string | null;
  url: string | null;
  legacyUrl: string | null;
}

export interface HubCarPageData_hubCarPage_sections_featured1_cards {
  name: string | null;
  title: string | null;
  image: HubCarPageData_hubCarPage_sections_featured1_cards_image | null;
  body: string | null;
  link: HubCarPageData_hubCarPage_sections_featured1_cards_link | null;
}

export interface HubCarPageData_hubCarPage_sections_featured1_image_file {
  url: string;
  fileName: string;
}

export interface HubCarPageData_hubCarPage_sections_featured1_image {
  title: string | null;
  description: string | null;
  file: HubCarPageData_hubCarPage_sections_featured1_image_file | null;
}

export interface HubCarPageData_hubCarPage_sections_featured1_testimonials {
  customerName: string | null;
  summary: string | null;
  rating: string | null;
}

export interface HubCarPageData_hubCarPage_sections_featured1 {
  layout: (string | null)[] | null;
  body: string | null;
  title: string | null;
  titleTag: string | null;
  video: string | null;
  defaultHeight: number | null;
  iconList: (HubCarPageData_hubCarPage_sections_featured1_iconList | null)[] | null;
  link: HubCarPageData_hubCarPage_sections_featured1_link | null;
  cards: (HubCarPageData_hubCarPage_sections_featured1_cards | null)[] | null;
  image: HubCarPageData_hubCarPage_sections_featured1_image | null;
  testimonials: (HubCarPageData_hubCarPage_sections_featured1_testimonials | null)[] | null;
}

export interface HubCarPageData_hubCarPage_sections_featured2_iconList {
  text: string | null;
}

export interface HubCarPageData_hubCarPage_sections_featured2_link {
  url: string | null;
  text: string | null;
  legacyUrl: string | null;
}

export interface HubCarPageData_hubCarPage_sections_featured2_cards_image_file {
  url: string;
  fileName: string;
}

export interface HubCarPageData_hubCarPage_sections_featured2_cards_image {
  title: string | null;
  description: string | null;
  file: HubCarPageData_hubCarPage_sections_featured2_cards_image_file | null;
}

export interface HubCarPageData_hubCarPage_sections_featured2_cards_link {
  text: string | null;
  url: string | null;
  legacyUrl: string | null;
}

export interface HubCarPageData_hubCarPage_sections_featured2_cards {
  name: string | null;
  title: string | null;
  image: HubCarPageData_hubCarPage_sections_featured2_cards_image | null;
  body: string | null;
  link: HubCarPageData_hubCarPage_sections_featured2_cards_link | null;
}

export interface HubCarPageData_hubCarPage_sections_featured2_image_file {
  url: string;
  fileName: string;
}

export interface HubCarPageData_hubCarPage_sections_featured2_image {
  title: string | null;
  description: string | null;
  file: HubCarPageData_hubCarPage_sections_featured2_image_file | null;
}

export interface HubCarPageData_hubCarPage_sections_featured2_testimonials {
  customerName: string | null;
  summary: string | null;
  rating: string | null;
}

export interface HubCarPageData_hubCarPage_sections_featured2 {
  layout: (string | null)[] | null;
  body: string | null;
  title: string | null;
  titleTag: string | null;
  video: string | null;
  defaultHeight: number | null;
  iconList: (HubCarPageData_hubCarPage_sections_featured2_iconList | null)[] | null;
  link: HubCarPageData_hubCarPage_sections_featured2_link | null;
  cards: (HubCarPageData_hubCarPage_sections_featured2_cards | null)[] | null;
  image: HubCarPageData_hubCarPage_sections_featured2_image | null;
  testimonials: (HubCarPageData_hubCarPage_sections_featured2_testimonials | null)[] | null;
}

export interface HubCarPageData_hubCarPage_sections_steps_steps {
  title: string | null;
  body: string | null;
}

export interface HubCarPageData_hubCarPage_sections_steps {
  heading: string | null;
  steps: HubCarPageData_hubCarPage_sections_steps_steps[] | null;
}

export interface HubCarPageData_hubCarPage_sections_tiles_tiles_link {
  text: string | null;
  url: string | null;
  legacyUrl: string | null;
}

export interface HubCarPageData_hubCarPage_sections_tiles_tiles_image_file {
  url: string;
  fileName: string;
  contentType: string;
}

export interface HubCarPageData_hubCarPage_sections_tiles_tiles_image {
  title: string | null;
  description: string | null;
  file: HubCarPageData_hubCarPage_sections_tiles_tiles_image_file | null;
}

export interface HubCarPageData_hubCarPage_sections_tiles_tiles {
  body: string | null;
  title: string | null;
  link: HubCarPageData_hubCarPage_sections_tiles_tiles_link | null;
  image: HubCarPageData_hubCarPage_sections_tiles_tiles_image | null;
}

export interface HubCarPageData_hubCarPage_sections_tiles {
  position: number | null;
  name: string | null;
  tilesTitle: string | null;
  titleTag: string | null;
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
