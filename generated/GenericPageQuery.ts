/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GenericPageQuery
// ====================================================

export interface GenericPageQuery_genericPage_metaData {
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

export interface GenericPageQuery_genericPage_featuredImage_file {
  url: string;
  fileName: string;
  contentType: string;
}

export interface GenericPageQuery_genericPage_featuredImage {
  title: string | null;
  description: string | null;
  file: GenericPageQuery_genericPage_featuredImage_file | null;
}

export interface GenericPageQuery_genericPage_sections_leadText {
  titleTag: string | null;
  heading: string | null;
  description: string | null;
  position: number | null;
}

export interface GenericPageQuery_genericPage_sections_iconBullets1_iconBullets {
  text: string | null;
}

export interface GenericPageQuery_genericPage_sections_iconBullets1 {
  title: string | null;
  iconBullets: (GenericPageQuery_genericPage_sections_iconBullets1_iconBullets | null)[] | null;
}

export interface GenericPageQuery_genericPage_sections_iconBullets2_iconBullets {
  text: string | null;
}

export interface GenericPageQuery_genericPage_sections_iconBullets2 {
  title: string | null;
  iconBullets: (GenericPageQuery_genericPage_sections_iconBullets2_iconBullets | null)[] | null;
}

export interface GenericPageQuery_genericPage_sections_faqs_questionSets_questionAnswers {
  question: string | null;
  answer: string | null;
}

export interface GenericPageQuery_genericPage_sections_faqs_questionSets {
  title: string | null;
  questionAnswers: (GenericPageQuery_genericPage_sections_faqs_questionSets_questionAnswers | null)[] | null;
}

export interface GenericPageQuery_genericPage_sections_faqs {
  title: string | null;
  body: string | null;
  questionSets: (GenericPageQuery_genericPage_sections_faqs_questionSets | null)[] | null;
}

export interface GenericPageQuery_genericPage_sections_cards_cards_image_file {
  url: string;
  fileName: string;
}

export interface GenericPageQuery_genericPage_sections_cards_cards_image {
  title: string | null;
  description: string | null;
  file: GenericPageQuery_genericPage_sections_cards_cards_image_file | null;
}

export interface GenericPageQuery_genericPage_sections_cards_cards_link {
  text: string | null;
  url: string | null;
  legacyUrl: string | null;
}

export interface GenericPageQuery_genericPage_sections_cards_cards {
  title: string | null;
  name: string | null;
  image: GenericPageQuery_genericPage_sections_cards_cards_image | null;
  body: string | null;
  titleTag: string | null;
  link: GenericPageQuery_genericPage_sections_cards_cards_link | null;
}

export interface GenericPageQuery_genericPage_sections_cards {
  position: number | null;
  name: string | null;
  titleTag: string | null;
  description: string | null;
  title: string | null;
  cards: GenericPageQuery_genericPage_sections_cards_cards[] | null;
}

export interface GenericPageQuery_genericPage_sections_hero_image_file {
  url: string;
  fileName: string;
  contentType: string;
}

export interface GenericPageQuery_genericPage_sections_hero_image {
  title: string | null;
  description: string | null;
  file: GenericPageQuery_genericPage_sections_hero_image_file | null;
}

export interface GenericPageQuery_genericPage_sections_hero_heroCard {
  title: string | null;
  body: string | null;
}

export interface GenericPageQuery_genericPage_sections_hero_heroLabel_link {
  text: string | null;
  url: string | null;
}

export interface GenericPageQuery_genericPage_sections_hero_heroLabel {
  text: string | null;
  visible: boolean | null;
  link: GenericPageQuery_genericPage_sections_hero_heroLabel_link | null;
}

export interface GenericPageQuery_genericPage_sections_hero {
  position: number | null;
  flag: string | null;
  title: string | null;
  titleTag: string | null;
  body: string | null;
  image: GenericPageQuery_genericPage_sections_hero_image | null;
  heroCard: (GenericPageQuery_genericPage_sections_hero_heroCard | null)[] | null;
  heroLabel: (GenericPageQuery_genericPage_sections_hero_heroLabel | null)[] | null;
}

export interface GenericPageQuery_genericPage_sections_rowText {
  position: number | null;
  heading: string | null;
  titleTag: string | null;
  subHeading: string | null;
  body: string | null;
}

export interface GenericPageQuery_genericPage_sections_featured_iconList {
  text: string | null;
}

export interface GenericPageQuery_genericPage_sections_featured_link {
  url: string | null;
  text: string | null;
  legacyUrl: string | null;
}

export interface GenericPageQuery_genericPage_sections_featured_cards_image_file {
  url: string;
  fileName: string;
}

export interface GenericPageQuery_genericPage_sections_featured_cards_image {
  title: string | null;
  description: string | null;
  file: GenericPageQuery_genericPage_sections_featured_cards_image_file | null;
}

export interface GenericPageQuery_genericPage_sections_featured_cards_link {
  text: string | null;
  url: string | null;
  legacyUrl: string | null;
}

export interface GenericPageQuery_genericPage_sections_featured_cards {
  name: string | null;
  title: string | null;
  image: GenericPageQuery_genericPage_sections_featured_cards_image | null;
  body: string | null;
  link: GenericPageQuery_genericPage_sections_featured_cards_link | null;
}

export interface GenericPageQuery_genericPage_sections_featured_image_file {
  url: string;
  fileName: string;
}

export interface GenericPageQuery_genericPage_sections_featured_image {
  title: string | null;
  description: string | null;
  file: GenericPageQuery_genericPage_sections_featured_image_file | null;
}

export interface GenericPageQuery_genericPage_sections_featured_testimonials {
  customerName: string | null;
  summary: string | null;
  rating: string | null;
}

export interface GenericPageQuery_genericPage_sections_featured {
  layout: (string | null)[] | null;
  body: string | null;
  title: string | null;
  titleTag: string | null;
  video: string | null;
  defaultHeight: number | null;
  iconList: (GenericPageQuery_genericPage_sections_featured_iconList | null)[] | null;
  link: GenericPageQuery_genericPage_sections_featured_link | null;
  cards: (GenericPageQuery_genericPage_sections_featured_cards | null)[] | null;
  image: GenericPageQuery_genericPage_sections_featured_image | null;
  testimonials: (GenericPageQuery_genericPage_sections_featured_testimonials | null)[] | null;
}

export interface GenericPageQuery_genericPage_sections_featured1_iconList {
  text: string | null;
}

export interface GenericPageQuery_genericPage_sections_featured1_link {
  url: string | null;
  text: string | null;
  legacyUrl: string | null;
}

export interface GenericPageQuery_genericPage_sections_featured1_cards_image_file {
  url: string;
  fileName: string;
}

export interface GenericPageQuery_genericPage_sections_featured1_cards_image {
  title: string | null;
  description: string | null;
  file: GenericPageQuery_genericPage_sections_featured1_cards_image_file | null;
}

export interface GenericPageQuery_genericPage_sections_featured1_cards_link {
  text: string | null;
  url: string | null;
  legacyUrl: string | null;
}

export interface GenericPageQuery_genericPage_sections_featured1_cards {
  name: string | null;
  title: string | null;
  image: GenericPageQuery_genericPage_sections_featured1_cards_image | null;
  body: string | null;
  link: GenericPageQuery_genericPage_sections_featured1_cards_link | null;
}

export interface GenericPageQuery_genericPage_sections_featured1_image_file {
  url: string;
  fileName: string;
}

export interface GenericPageQuery_genericPage_sections_featured1_image {
  title: string | null;
  description: string | null;
  file: GenericPageQuery_genericPage_sections_featured1_image_file | null;
}

export interface GenericPageQuery_genericPage_sections_featured1_testimonials {
  customerName: string | null;
  summary: string | null;
  rating: string | null;
}

export interface GenericPageQuery_genericPage_sections_featured1 {
  layout: (string | null)[] | null;
  body: string | null;
  title: string | null;
  titleTag: string | null;
  video: string | null;
  defaultHeight: number | null;
  iconList: (GenericPageQuery_genericPage_sections_featured1_iconList | null)[] | null;
  link: GenericPageQuery_genericPage_sections_featured1_link | null;
  cards: (GenericPageQuery_genericPage_sections_featured1_cards | null)[] | null;
  image: GenericPageQuery_genericPage_sections_featured1_image | null;
  testimonials: (GenericPageQuery_genericPage_sections_featured1_testimonials | null)[] | null;
}

export interface GenericPageQuery_genericPage_sections_featured2_iconList {
  text: string | null;
}

export interface GenericPageQuery_genericPage_sections_featured2_link {
  url: string | null;
  text: string | null;
  legacyUrl: string | null;
}

export interface GenericPageQuery_genericPage_sections_featured2_cards_image_file {
  url: string;
  fileName: string;
}

export interface GenericPageQuery_genericPage_sections_featured2_cards_image {
  title: string | null;
  description: string | null;
  file: GenericPageQuery_genericPage_sections_featured2_cards_image_file | null;
}

export interface GenericPageQuery_genericPage_sections_featured2_cards_link {
  text: string | null;
  url: string | null;
  legacyUrl: string | null;
}

export interface GenericPageQuery_genericPage_sections_featured2_cards {
  name: string | null;
  title: string | null;
  image: GenericPageQuery_genericPage_sections_featured2_cards_image | null;
  body: string | null;
  link: GenericPageQuery_genericPage_sections_featured2_cards_link | null;
}

export interface GenericPageQuery_genericPage_sections_featured2_image_file {
  url: string;
  fileName: string;
}

export interface GenericPageQuery_genericPage_sections_featured2_image {
  title: string | null;
  description: string | null;
  file: GenericPageQuery_genericPage_sections_featured2_image_file | null;
}

export interface GenericPageQuery_genericPage_sections_featured2_testimonials {
  customerName: string | null;
  summary: string | null;
  rating: string | null;
}

export interface GenericPageQuery_genericPage_sections_featured2 {
  layout: (string | null)[] | null;
  body: string | null;
  title: string | null;
  titleTag: string | null;
  video: string | null;
  defaultHeight: number | null;
  iconList: (GenericPageQuery_genericPage_sections_featured2_iconList | null)[] | null;
  link: GenericPageQuery_genericPage_sections_featured2_link | null;
  cards: (GenericPageQuery_genericPage_sections_featured2_cards | null)[] | null;
  image: GenericPageQuery_genericPage_sections_featured2_image | null;
  testimonials: (GenericPageQuery_genericPage_sections_featured2_testimonials | null)[] | null;
}

export interface GenericPageQuery_genericPage_sections_featured3_iconList {
  text: string | null;
}

export interface GenericPageQuery_genericPage_sections_featured3_link {
  url: string | null;
  text: string | null;
  legacyUrl: string | null;
}

export interface GenericPageQuery_genericPage_sections_featured3_cards_image_file {
  url: string;
  fileName: string;
}

export interface GenericPageQuery_genericPage_sections_featured3_cards_image {
  title: string | null;
  description: string | null;
  file: GenericPageQuery_genericPage_sections_featured3_cards_image_file | null;
}

export interface GenericPageQuery_genericPage_sections_featured3_cards_link {
  text: string | null;
  url: string | null;
  legacyUrl: string | null;
}

export interface GenericPageQuery_genericPage_sections_featured3_cards {
  name: string | null;
  title: string | null;
  image: GenericPageQuery_genericPage_sections_featured3_cards_image | null;
  body: string | null;
  link: GenericPageQuery_genericPage_sections_featured3_cards_link | null;
}

export interface GenericPageQuery_genericPage_sections_featured3_image_file {
  url: string;
  fileName: string;
}

export interface GenericPageQuery_genericPage_sections_featured3_image {
  title: string | null;
  description: string | null;
  file: GenericPageQuery_genericPage_sections_featured3_image_file | null;
}

export interface GenericPageQuery_genericPage_sections_featured3_testimonials {
  customerName: string | null;
  summary: string | null;
  rating: string | null;
}

export interface GenericPageQuery_genericPage_sections_featured3 {
  layout: (string | null)[] | null;
  body: string | null;
  title: string | null;
  titleTag: string | null;
  video: string | null;
  defaultHeight: number | null;
  iconList: (GenericPageQuery_genericPage_sections_featured3_iconList | null)[] | null;
  link: GenericPageQuery_genericPage_sections_featured3_link | null;
  cards: (GenericPageQuery_genericPage_sections_featured3_cards | null)[] | null;
  image: GenericPageQuery_genericPage_sections_featured3_image | null;
  testimonials: (GenericPageQuery_genericPage_sections_featured3_testimonials | null)[] | null;
}

export interface GenericPageQuery_genericPage_sections_carousel_cards_image_file {
  url: string;
  fileName: string;
}

export interface GenericPageQuery_genericPage_sections_carousel_cards_image {
  title: string | null;
  description: string | null;
  file: GenericPageQuery_genericPage_sections_carousel_cards_image_file | null;
}

export interface GenericPageQuery_genericPage_sections_carousel_cards_link {
  text: string | null;
  url: string | null;
  legacyUrl: string | null;
}

export interface GenericPageQuery_genericPage_sections_carousel_cards {
  name: string | null;
  title: string | null;
  image: GenericPageQuery_genericPage_sections_carousel_cards_image | null;
  body: string | null;
  link: GenericPageQuery_genericPage_sections_carousel_cards_link | null;
}

export interface GenericPageQuery_genericPage_sections_carousel {
  title: string | null;
  name: string | null;
  cards: (GenericPageQuery_genericPage_sections_carousel_cards | null)[] | null;
}

export interface GenericPageQuery_genericPage_sections_tiles_tiles_link {
  text: string | null;
  url: string | null;
  legacyUrl: string | null;
}

export interface GenericPageQuery_genericPage_sections_tiles_tiles_image_file {
  url: string;
  fileName: string;
  contentType: string;
}

export interface GenericPageQuery_genericPage_sections_tiles_tiles_image {
  title: string | null;
  description: string | null;
  file: GenericPageQuery_genericPage_sections_tiles_tiles_image_file | null;
}

export interface GenericPageQuery_genericPage_sections_tiles_tiles {
  body: string | null;
  title: string | null;
  link: GenericPageQuery_genericPage_sections_tiles_tiles_link | null;
  image: GenericPageQuery_genericPage_sections_tiles_tiles_image | null;
}

export interface GenericPageQuery_genericPage_sections_tiles {
  position: number | null;
  name: string | null;
  tilesTitle: string | null;
  titleTag: string | null;
  tiles: GenericPageQuery_genericPage_sections_tiles_tiles[] | null;
}

export interface GenericPageQuery_genericPage_sections {
  leadText: GenericPageQuery_genericPage_sections_leadText | null;
  iconBullets1: GenericPageQuery_genericPage_sections_iconBullets1 | null;
  iconBullets2: GenericPageQuery_genericPage_sections_iconBullets2 | null;
  faqs: GenericPageQuery_genericPage_sections_faqs | null;
  cards: GenericPageQuery_genericPage_sections_cards | null;
  hero: GenericPageQuery_genericPage_sections_hero | null;
  rowText: GenericPageQuery_genericPage_sections_rowText | null;
  featured: GenericPageQuery_genericPage_sections_featured | null;
  featured1: GenericPageQuery_genericPage_sections_featured1 | null;
  featured2: GenericPageQuery_genericPage_sections_featured2 | null;
  featured3: GenericPageQuery_genericPage_sections_featured3 | null;
  carousel: GenericPageQuery_genericPage_sections_carousel | null;
  tiles: GenericPageQuery_genericPage_sections_tiles | null;
}

export interface GenericPageQuery_genericPage {
  id: string;
  intro: string | null;
  metaData: GenericPageQuery_genericPage_metaData;
  featuredImage: GenericPageQuery_genericPage_featuredImage | null;
  sections: GenericPageQuery_genericPage_sections | null;
  body: string | null;
}

export interface GenericPageQuery {
  genericPage: GenericPageQuery_genericPage;
}

export interface GenericPageQueryVariables {
  slug: string;
}
