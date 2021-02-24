/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: HomePageData
// ====================================================

export interface HomePageData_homePage_featuredImage_file_details_image {
  width: number;
  height: number;
}

export interface HomePageData_homePage_featuredImage_file_details {
  image: HomePageData_homePage_featuredImage_file_details_image;
}

export interface HomePageData_homePage_featuredImage_file {
  url: string;
  details: HomePageData_homePage_featuredImage_file_details;
}

export interface HomePageData_homePage_featuredImage {
  file: HomePageData_homePage_featuredImage_file | null;
}

export interface HomePageData_homePage_metaData {
  title: string | null;
  name: string | null;
  metaRobots: string | null;
  metaDescription: string | null;
  publishedOn: any | null;
  legacyUrl: string | null;
  pageType: string | null;
  canonicalUrl: string | null;
  slug: string | null;
  breadcrumbs: any | null;
  schema: any | null;
}

export interface HomePageData_homePage_sections_hero_image_file {
  url: string;
}

export interface HomePageData_homePage_sections_hero_image {
  title: string | null;
  file: HomePageData_homePage_sections_hero_image_file | null;
}

export interface HomePageData_homePage_sections_hero_heroLabel_link {
  text: string | null;
  url: string | null;
  visible: boolean | null;
}

export interface HomePageData_homePage_sections_hero_heroLabel {
  text: string | null;
  visible: boolean | null;
  link: HomePageData_homePage_sections_hero_heroLabel_link | null;
}

export interface HomePageData_homePage_sections_hero {
  title: string | null;
  titleTag: string | null;
  body: string | null;
  image: HomePageData_homePage_sections_hero_image | null;
  heroLabel: (HomePageData_homePage_sections_hero_heroLabel | null)[] | null;
}

export interface HomePageData_homePage_sections_leadText {
  heading: string | null;
  titleTag: string | null;
  description: string | null;
}

export interface HomePageData_homePage_sections_cards_cards_image_file {
  url: string;
}

export interface HomePageData_homePage_sections_cards_cards_image {
  file: HomePageData_homePage_sections_cards_cards_image_file | null;
}

export interface HomePageData_homePage_sections_cards_cards_link {
  url: string | null;
  legacyUrl: string | null;
  text: string | null;
}

export interface HomePageData_homePage_sections_cards_cards {
  title: string | null;
  titleTag: string | null;
  body: string | null;
  image: HomePageData_homePage_sections_cards_cards_image | null;
  link: HomePageData_homePage_sections_cards_cards_link | null;
}

export interface HomePageData_homePage_sections_cards {
  name: string | null;
  cards: HomePageData_homePage_sections_cards_cards[] | null;
}

export interface HomePageData_homePage_sections_featured1_iconList {
  text: string | null;
}

export interface HomePageData_homePage_sections_featured1_link {
  url: string | null;
  text: string | null;
  legacyUrl: string | null;
}

export interface HomePageData_homePage_sections_featured1_cards_image_file {
  url: string;
  fileName: string;
}

export interface HomePageData_homePage_sections_featured1_cards_image {
  title: string | null;
  description: string | null;
  file: HomePageData_homePage_sections_featured1_cards_image_file | null;
}

export interface HomePageData_homePage_sections_featured1_cards_link {
  text: string | null;
  url: string | null;
  legacyUrl: string | null;
}

export interface HomePageData_homePage_sections_featured1_cards {
  name: string | null;
  title: string | null;
  image: HomePageData_homePage_sections_featured1_cards_image | null;
  body: string | null;
  link: HomePageData_homePage_sections_featured1_cards_link | null;
}

export interface HomePageData_homePage_sections_featured1_image_file {
  url: string;
  fileName: string;
}

export interface HomePageData_homePage_sections_featured1_image {
  title: string | null;
  description: string | null;
  file: HomePageData_homePage_sections_featured1_image_file | null;
}

export interface HomePageData_homePage_sections_featured1_testimonials {
  customerName: string | null;
  summary: string | null;
  rating: string | null;
}

export interface HomePageData_homePage_sections_featured1 {
  layout: (string | null)[] | null;
  body: string | null;
  title: string | null;
  titleTag: string | null;
  video: string | null;
  defaultHeight: number | null;
  iconList: (HomePageData_homePage_sections_featured1_iconList | null)[] | null;
  link: HomePageData_homePage_sections_featured1_link | null;
  cards: (HomePageData_homePage_sections_featured1_cards | null)[] | null;
  image: HomePageData_homePage_sections_featured1_image | null;
  testimonials: (HomePageData_homePage_sections_featured1_testimonials | null)[] | null;
}

export interface HomePageData_homePage_sections_featured2_iconList {
  text: string | null;
}

export interface HomePageData_homePage_sections_featured2_link {
  url: string | null;
  text: string | null;
  legacyUrl: string | null;
}

export interface HomePageData_homePage_sections_featured2_cards_image_file {
  url: string;
  fileName: string;
}

export interface HomePageData_homePage_sections_featured2_cards_image {
  title: string | null;
  description: string | null;
  file: HomePageData_homePage_sections_featured2_cards_image_file | null;
}

export interface HomePageData_homePage_sections_featured2_cards_link {
  text: string | null;
  url: string | null;
  legacyUrl: string | null;
}

export interface HomePageData_homePage_sections_featured2_cards {
  name: string | null;
  title: string | null;
  image: HomePageData_homePage_sections_featured2_cards_image | null;
  body: string | null;
  link: HomePageData_homePage_sections_featured2_cards_link | null;
}

export interface HomePageData_homePage_sections_featured2_image_file {
  url: string;
  fileName: string;
}

export interface HomePageData_homePage_sections_featured2_image {
  title: string | null;
  description: string | null;
  file: HomePageData_homePage_sections_featured2_image_file | null;
}

export interface HomePageData_homePage_sections_featured2_testimonials {
  customerName: string | null;
  summary: string | null;
  rating: string | null;
}

export interface HomePageData_homePage_sections_featured2 {
  layout: (string | null)[] | null;
  body: string | null;
  title: string | null;
  titleTag: string | null;
  video: string | null;
  defaultHeight: number | null;
  iconList: (HomePageData_homePage_sections_featured2_iconList | null)[] | null;
  link: HomePageData_homePage_sections_featured2_link | null;
  cards: (HomePageData_homePage_sections_featured2_cards | null)[] | null;
  image: HomePageData_homePage_sections_featured2_image | null;
  testimonials: (HomePageData_homePage_sections_featured2_testimonials | null)[] | null;
}

export interface HomePageData_homePage_sections_tiles_tiles_link {
  text: string | null;
  url: string | null;
  legacyUrl: string | null;
}

export interface HomePageData_homePage_sections_tiles_tiles_image_file {
  url: string;
  fileName: string;
  contentType: string;
}

export interface HomePageData_homePage_sections_tiles_tiles_image {
  title: string | null;
  description: string | null;
  file: HomePageData_homePage_sections_tiles_tiles_image_file | null;
}

export interface HomePageData_homePage_sections_tiles_tiles {
  body: string | null;
  title: string | null;
  link: HomePageData_homePage_sections_tiles_tiles_link | null;
  image: HomePageData_homePage_sections_tiles_tiles_image | null;
}

export interface HomePageData_homePage_sections_tiles {
  position: number | null;
  name: string | null;
  tilesTitle: string | null;
  titleTag: string | null;
  tiles: HomePageData_homePage_sections_tiles_tiles[] | null;
}

export interface HomePageData_homePage_sections {
  hero: HomePageData_homePage_sections_hero | null;
  leadText: HomePageData_homePage_sections_leadText | null;
  cards: HomePageData_homePage_sections_cards | null;
  featured1: HomePageData_homePage_sections_featured1 | null;
  featured2: HomePageData_homePage_sections_featured2 | null;
  tiles: HomePageData_homePage_sections_tiles | null;
}

export interface HomePageData_homePage {
  id: string;
  featuredImage: HomePageData_homePage_featuredImage | null;
  metaData: HomePageData_homePage_metaData;
  sections: HomePageData_homePage_sections | null;
}

export interface HomePageData {
  homePage: HomePageData_homePage;
}
