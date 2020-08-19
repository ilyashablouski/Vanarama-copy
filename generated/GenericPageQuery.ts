/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: genericPageQuery
// ====================================================

export interface genericPageQuery_genericPage_metaData {
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

export interface genericPageQuery_genericPage_sections_tiles_tiles_image_file {
  url: string;
  fileName: string;
}

export interface genericPageQuery_genericPage_sections_tiles_tiles_image {
  title: string | null;
  description: string | null;
  file: genericPageQuery_genericPage_sections_tiles_tiles_image_file | null;
}

export interface genericPageQuery_genericPage_sections_tiles_tiles {
  body: string | null;
  title: string | null;
  image: genericPageQuery_genericPage_sections_tiles_tiles_image | null;
}

export interface genericPageQuery_genericPage_sections_tiles {
  position: number | null;
  name: string;
  tilesTitle: string | null;
  titleTag: string | null;
  tiles: genericPageQuery_genericPage_sections_tiles_tiles[] | null;
}

export interface genericPageQuery_genericPage_sections_iconBullets1_iconBullets {
  text: string | null;
}

export interface genericPageQuery_genericPage_sections_iconBullets1 {
  title: string | null;
  iconBullets: (genericPageQuery_genericPage_sections_iconBullets1_iconBullets | null)[] | null;
}

export interface genericPageQuery_genericPage_sections_iconBullets2_iconBullets {
  text: string | null;
}

export interface genericPageQuery_genericPage_sections_iconBullets2 {
  title: string | null;
  iconBullets: (genericPageQuery_genericPage_sections_iconBullets2_iconBullets | null)[] | null;
}

export interface genericPageQuery_genericPage_sections_faqs_questionSets_questionAnswers {
  question: string | null;
  answer: string | null;
}

export interface genericPageQuery_genericPage_sections_faqs_questionSets {
  title: string | null;
  questionAnswers: (genericPageQuery_genericPage_sections_faqs_questionSets_questionAnswers | null)[] | null;
}

export interface genericPageQuery_genericPage_sections_faqs {
  title: string | null;
  body: string | null;
  questionSets: (genericPageQuery_genericPage_sections_faqs_questionSets | null)[] | null;
}

export interface genericPageQuery_genericPage_sections_cards_cards_image_file {
  url: string;
  fileName: string;
}

export interface genericPageQuery_genericPage_sections_cards_cards_image {
  title: string | null;
  description: string | null;
  file: genericPageQuery_genericPage_sections_cards_cards_image_file | null;
}

export interface genericPageQuery_genericPage_sections_cards_cards_link {
  text: string | null;
  url: string | null;
}

export interface genericPageQuery_genericPage_sections_cards_cards {
  title: string | null;
  name: string | null;
  image: genericPageQuery_genericPage_sections_cards_cards_image | null;
  body: string | null;
  titleTag: string | null;
  link: genericPageQuery_genericPage_sections_cards_cards_link | null;
}

export interface genericPageQuery_genericPage_sections_cards {
  position: number | null;
  name: string | null;
  titleTag: string | null;
  description: string | null;
  cards: genericPageQuery_genericPage_sections_cards_cards[] | null;
}

export interface genericPageQuery_genericPage_sections_featured_image_file {
  url: string;
  fileName: string;
}

export interface genericPageQuery_genericPage_sections_featured_image {
  title: string | null;
  description: string | null;
  file: genericPageQuery_genericPage_sections_featured_image_file | null;
}

export interface genericPageQuery_genericPage_sections_featured {
  layout: string[] | null;
  body: string | null;
  title: string | null;
  image: genericPageQuery_genericPage_sections_featured_image | null;
}

export interface genericPageQuery_genericPage_sections_featured1_image_file {
  url: string;
  fileName: string;
}

export interface genericPageQuery_genericPage_sections_featured1_image {
  title: string | null;
  description: string | null;
  file: genericPageQuery_genericPage_sections_featured1_image_file | null;
}

export interface genericPageQuery_genericPage_sections_featured1 {
  layout: string[] | null;
  body: string | null;
  titleTag: string | null;
  title: string | null;
  image: genericPageQuery_genericPage_sections_featured1_image | null;
}

export interface genericPageQuery_genericPage_sections_featured2_image_file {
  url: string;
  fileName: string;
}

export interface genericPageQuery_genericPage_sections_featured2_image {
  title: string | null;
  description: string | null;
  file: genericPageQuery_genericPage_sections_featured2_image_file | null;
}

export interface genericPageQuery_genericPage_sections_featured2_cards_image_file {
  url: string;
  fileName: string;
}

export interface genericPageQuery_genericPage_sections_featured2_cards_image {
  title: string | null;
  description: string | null;
  file: genericPageQuery_genericPage_sections_featured2_cards_image_file | null;
}

export interface genericPageQuery_genericPage_sections_featured2_cards_link {
  text: string | null;
  url: string | null;
}

export interface genericPageQuery_genericPage_sections_featured2_cards {
  name: string | null;
  title: string | null;
  image: genericPageQuery_genericPage_sections_featured2_cards_image | null;
  body: string | null;
  link: genericPageQuery_genericPage_sections_featured2_cards_link | null;
}

export interface genericPageQuery_genericPage_sections_featured2 {
  layout: string[] | null;
  body: string | null;
  titleTag: string | null;
  image: genericPageQuery_genericPage_sections_featured2_image | null;
  title: string | null;
  cards: (genericPageQuery_genericPage_sections_featured2_cards | null)[] | null;
}

export interface genericPageQuery_genericPage_sections_carousel_cards_image_file {
  url: string;
  fileName: string;
}

export interface genericPageQuery_genericPage_sections_carousel_cards_image {
  title: string | null;
  description: string | null;
  file: genericPageQuery_genericPage_sections_carousel_cards_image_file | null;
}

export interface genericPageQuery_genericPage_sections_carousel_cards_link {
  text: string | null;
  url: string | null;
}

export interface genericPageQuery_genericPage_sections_carousel_cards {
  name: string | null;
  title: string | null;
  image: genericPageQuery_genericPage_sections_carousel_cards_image | null;
  body: string | null;
  link: genericPageQuery_genericPage_sections_carousel_cards_link | null;
}

export interface genericPageQuery_genericPage_sections_carousel {
  title: string | null;
  name: string | null;
  cards: (genericPageQuery_genericPage_sections_carousel_cards | null)[] | null;
}

export interface genericPageQuery_genericPage_sections {
  tiles: genericPageQuery_genericPage_sections_tiles | null;
  iconBullets1: genericPageQuery_genericPage_sections_iconBullets1 | null;
  iconBullets2: genericPageQuery_genericPage_sections_iconBullets2 | null;
  faqs: genericPageQuery_genericPage_sections_faqs | null;
  cards: genericPageQuery_genericPage_sections_cards | null;
  featured: genericPageQuery_genericPage_sections_featured | null;
  featured1: genericPageQuery_genericPage_sections_featured1 | null;
  featured2: genericPageQuery_genericPage_sections_featured2 | null;
  carousel: genericPageQuery_genericPage_sections_carousel | null;
}

export interface genericPageQuery_genericPage_featuredImage_file {
  url: string;
  fileName: string;
  contentType: string;
}

export interface genericPageQuery_genericPage_featuredImage {
  title: string | null;
  description: string | null;
  file: genericPageQuery_genericPage_featuredImage_file | null;
}

export interface genericPageQuery_genericPage {
  id: string;
  metaData: genericPageQuery_genericPage_metaData;
  sections: genericPageQuery_genericPage_sections | null;
  intro: string | null;
  body: string | null;
  featuredImage: genericPageQuery_genericPage_featuredImage | null;
}

export interface genericPageQuery {
  genericPage: genericPageQuery_genericPage;
}

export interface genericPageQueryVariables {
  slug: string;
}
