/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GenericPageQuestionQuery
// ====================================================

export interface GenericPageQuestionQuery_genericPage_metaData {
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

export interface GenericPageQuestionQuery_genericPage_sections_hero_image_file {
  url: string;
  fileName: string;
  contentType: string;
}

export interface GenericPageQuestionQuery_genericPage_sections_hero_image {
  file: GenericPageQuestionQuery_genericPage_sections_hero_image_file | null;
  title: string | null;
  description: string | null;
}

export interface GenericPageQuestionQuery_genericPage_sections_hero_heroCard {
  title: string | null;
  body: string | null;
}

export interface GenericPageQuestionQuery_genericPage_sections_hero {
  title: string | null;
  body: string | null;
  image: GenericPageQuestionQuery_genericPage_sections_hero_image | null;
  heroCard: (GenericPageQuestionQuery_genericPage_sections_hero_heroCard | null)[] | null;
  position: number | null;
  flag: string | null;
  titleTag: string | null;
}

export interface GenericPageQuestionQuery_genericPage_sections_tiles_tiles_link {
  text: string | null;
  url: string | null;
  legacyUrl: string | null;
}

export interface GenericPageQuestionQuery_genericPage_sections_tiles_tiles_image_file {
  url: string;
  fileName: string;
}

export interface GenericPageQuestionQuery_genericPage_sections_tiles_tiles_image {
  title: string | null;
  description: string | null;
  file: GenericPageQuestionQuery_genericPage_sections_tiles_tiles_image_file | null;
}

export interface GenericPageQuestionQuery_genericPage_sections_tiles_tiles {
  body: string | null;
  title: string | null;
  link: GenericPageQuestionQuery_genericPage_sections_tiles_tiles_link | null;
  image: GenericPageQuestionQuery_genericPage_sections_tiles_tiles_image | null;
}

export interface GenericPageQuestionQuery_genericPage_sections_tiles {
  position: number | null;
  name: string | null;
  tilesTitle: string | null;
  titleTag: string | null;
  tiles: GenericPageQuestionQuery_genericPage_sections_tiles_tiles[] | null;
}

export interface GenericPageQuestionQuery_genericPage_sections_leadText {
  titleTag: string | null;
  heading: string | null;
  description: string | null;
  position: number | null;
}

export interface GenericPageQuestionQuery_genericPage_sections_iconBullets1_iconBullets {
  text: string | null;
}

export interface GenericPageQuestionQuery_genericPage_sections_iconBullets1 {
  title: string | null;
  iconBullets: (GenericPageQuestionQuery_genericPage_sections_iconBullets1_iconBullets | null)[] | null;
}

export interface GenericPageQuestionQuery_genericPage_sections_iconBullets2_iconBullets {
  text: string | null;
}

export interface GenericPageQuestionQuery_genericPage_sections_iconBullets2 {
  title: string | null;
  iconBullets: (GenericPageQuestionQuery_genericPage_sections_iconBullets2_iconBullets | null)[] | null;
}

export interface GenericPageQuestionQuery_genericPage_sections_faqs_questionSets_questionAnswers {
  question: string | null;
  answer: string | null;
}

export interface GenericPageQuestionQuery_genericPage_sections_faqs_questionSets {
  title: string | null;
  questionAnswers: (GenericPageQuestionQuery_genericPage_sections_faqs_questionSets_questionAnswers | null)[] | null;
}

export interface GenericPageQuestionQuery_genericPage_sections_faqs {
  title: string | null;
  body: string | null;
  questionSets: (GenericPageQuestionQuery_genericPage_sections_faqs_questionSets | null)[] | null;
}

export interface GenericPageQuestionQuery_genericPage_sections_cards_cards_image_file {
  url: string;
  fileName: string;
}

export interface GenericPageQuestionQuery_genericPage_sections_cards_cards_image {
  title: string | null;
  description: string | null;
  file: GenericPageQuestionQuery_genericPage_sections_cards_cards_image_file | null;
}

export interface GenericPageQuestionQuery_genericPage_sections_cards_cards_link {
  text: string | null;
  url: string | null;
  legacyUrl: string | null;
}

export interface GenericPageQuestionQuery_genericPage_sections_cards_cards {
  title: string | null;
  name: string | null;
  image: GenericPageQuestionQuery_genericPage_sections_cards_cards_image | null;
  body: string | null;
  titleTag: string | null;
  link: GenericPageQuestionQuery_genericPage_sections_cards_cards_link | null;
}

export interface GenericPageQuestionQuery_genericPage_sections_cards {
  position: number | null;
  name: string | null;
  titleTag: string | null;
  description: string | null;
  title: string | null;
  cards: GenericPageQuestionQuery_genericPage_sections_cards_cards[] | null;
}

export interface GenericPageQuestionQuery_genericPage_sections_rowText {
  position: number | null;
  heading: string | null;
  titleTag: string | null;
  subHeading: string | null;
  body: string | null;
}

export interface GenericPageQuestionQuery_genericPage_sections_featured_link {
  text: string | null;
  url: string | null;
  legacyUrl: string | null;
}

export interface GenericPageQuestionQuery_genericPage_sections_featured_image_file_details_image {
  width: number;
  height: number;
}

export interface GenericPageQuestionQuery_genericPage_sections_featured_image_file_details {
  size: number;
  image: GenericPageQuestionQuery_genericPage_sections_featured_image_file_details_image;
}

export interface GenericPageQuestionQuery_genericPage_sections_featured_image_file {
  url: string;
  fileName: string;
  contentType: string;
  details: GenericPageQuestionQuery_genericPage_sections_featured_image_file_details;
}

export interface GenericPageQuestionQuery_genericPage_sections_featured_image {
  title: string | null;
  description: string | null;
  file: GenericPageQuestionQuery_genericPage_sections_featured_image_file | null;
}

export interface GenericPageQuestionQuery_genericPage_sections_featured {
  layout: (string | null)[] | null;
  body: string | null;
  title: string | null;
  video: string | null;
  link: GenericPageQuestionQuery_genericPage_sections_featured_link | null;
  image: GenericPageQuestionQuery_genericPage_sections_featured_image | null;
}

export interface GenericPageQuestionQuery_genericPage_sections_featured1_link {
  url: string | null;
  text: string | null;
  legacyUrl: string | null;
}

export interface GenericPageQuestionQuery_genericPage_sections_featured1_image_file {
  url: string;
  fileName: string;
}

export interface GenericPageQuestionQuery_genericPage_sections_featured1_image {
  title: string | null;
  description: string | null;
  file: GenericPageQuestionQuery_genericPage_sections_featured1_image_file | null;
}

export interface GenericPageQuestionQuery_genericPage_sections_featured1 {
  layout: (string | null)[] | null;
  body: string | null;
  titleTag: string | null;
  title: string | null;
  link: GenericPageQuestionQuery_genericPage_sections_featured1_link | null;
  image: GenericPageQuestionQuery_genericPage_sections_featured1_image | null;
}

export interface GenericPageQuestionQuery_genericPage_sections_featured2_link {
  url: string | null;
  text: string | null;
  legacyUrl: string | null;
}

export interface GenericPageQuestionQuery_genericPage_sections_featured2_image_file {
  url: string;
  fileName: string;
}

export interface GenericPageQuestionQuery_genericPage_sections_featured2_image {
  title: string | null;
  description: string | null;
  file: GenericPageQuestionQuery_genericPage_sections_featured2_image_file | null;
}

export interface GenericPageQuestionQuery_genericPage_sections_featured2_cards_image_file {
  url: string;
  fileName: string;
}

export interface GenericPageQuestionQuery_genericPage_sections_featured2_cards_image {
  title: string | null;
  description: string | null;
  file: GenericPageQuestionQuery_genericPage_sections_featured2_cards_image_file | null;
}

export interface GenericPageQuestionQuery_genericPage_sections_featured2_cards_link {
  text: string | null;
  url: string | null;
  legacyUrl: string | null;
}

export interface GenericPageQuestionQuery_genericPage_sections_featured2_cards {
  name: string | null;
  title: string | null;
  image: GenericPageQuestionQuery_genericPage_sections_featured2_cards_image | null;
  body: string | null;
  link: GenericPageQuestionQuery_genericPage_sections_featured2_cards_link | null;
}

export interface GenericPageQuestionQuery_genericPage_sections_featured2 {
  layout: (string | null)[] | null;
  body: string | null;
  titleTag: string | null;
  link: GenericPageQuestionQuery_genericPage_sections_featured2_link | null;
  image: GenericPageQuestionQuery_genericPage_sections_featured2_image | null;
  title: string | null;
  cards: (GenericPageQuestionQuery_genericPage_sections_featured2_cards | null)[] | null;
}

export interface GenericPageQuestionQuery_genericPage_sections_carousel_cards_image_file {
  url: string;
  fileName: string;
}

export interface GenericPageQuestionQuery_genericPage_sections_carousel_cards_image {
  title: string | null;
  description: string | null;
  file: GenericPageQuestionQuery_genericPage_sections_carousel_cards_image_file | null;
}

export interface GenericPageQuestionQuery_genericPage_sections_carousel_cards_link {
  text: string | null;
  url: string | null;
  legacyUrl: string | null;
}

export interface GenericPageQuestionQuery_genericPage_sections_carousel_cards {
  name: string | null;
  title: string | null;
  image: GenericPageQuestionQuery_genericPage_sections_carousel_cards_image | null;
  body: string | null;
  link: GenericPageQuestionQuery_genericPage_sections_carousel_cards_link | null;
}

export interface GenericPageQuestionQuery_genericPage_sections_carousel {
  title: string | null;
  name: string | null;
  cards: (GenericPageQuestionQuery_genericPage_sections_carousel_cards | null)[] | null;
}

export interface GenericPageQuestionQuery_genericPage_sections_questionSet_questionAnswers {
  answer: string | null;
  question: string | null;
}

export interface GenericPageQuestionQuery_genericPage_sections_questionSet {
  title: string | null;
  questionAnswers: (GenericPageQuestionQuery_genericPage_sections_questionSet_questionAnswers | null)[] | null;
}

export interface GenericPageQuestionQuery_genericPage_sections {
  hero: GenericPageQuestionQuery_genericPage_sections_hero | null;
  tiles: GenericPageQuestionQuery_genericPage_sections_tiles | null;
  leadText: GenericPageQuestionQuery_genericPage_sections_leadText | null;
  iconBullets1: GenericPageQuestionQuery_genericPage_sections_iconBullets1 | null;
  iconBullets2: GenericPageQuestionQuery_genericPage_sections_iconBullets2 | null;
  faqs: GenericPageQuestionQuery_genericPage_sections_faqs | null;
  cards: GenericPageQuestionQuery_genericPage_sections_cards | null;
  rowText: GenericPageQuestionQuery_genericPage_sections_rowText | null;
  featured: GenericPageQuestionQuery_genericPage_sections_featured | null;
  featured1: GenericPageQuestionQuery_genericPage_sections_featured1 | null;
  featured2: GenericPageQuestionQuery_genericPage_sections_featured2 | null;
  carousel: GenericPageQuestionQuery_genericPage_sections_carousel | null;
  questionSet: GenericPageQuestionQuery_genericPage_sections_questionSet | null;
}

export interface GenericPageQuestionQuery_genericPage_featuredImage_file {
  url: string;
  fileName: string;
  contentType: string;
}

export interface GenericPageQuestionQuery_genericPage_featuredImage {
  title: string | null;
  description: string | null;
  file: GenericPageQuestionQuery_genericPage_featuredImage_file | null;
}

export interface GenericPageQuestionQuery_genericPage {
  id: string;
  metaData: GenericPageQuestionQuery_genericPage_metaData;
  sections: GenericPageQuestionQuery_genericPage_sections | null;
  intro: string | null;
  body: string | null;
  featuredImage: GenericPageQuestionQuery_genericPage_featuredImage | null;
}

export interface GenericPageQuestionQuery {
  genericPage: GenericPageQuestionQuery_genericPage;
}

export interface GenericPageQuestionQueryVariables {
  slug: string;
}
