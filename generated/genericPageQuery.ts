/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GenericPageQuery
// ====================================================

export interface GenericPageQuery_genericPage_metaData {
  title: string | null;
  metaRobots: string | null;
  metaDescription: string | null;
  publishedOn: any | null;
  legacyUrl: string | null;
  pageType: string | null;
  canonicalUrl: string | null;
  slug: string | null;
  schema: any | null;
}

export interface GenericPageQuery_genericPage_sections_tiles {
  position: number | null;
  name: string;
  tilesTitle: string | null;
  titleTag: string | null;
}

export interface GenericPageQuery_genericPage_sections_cards_cards_image_file {
  url: string;
  fileName: string;
  contentType: string;
}

export interface GenericPageQuery_genericPage_sections_cards_cards_image {
  title: string | null;
  description: string | null;
  file: GenericPageQuery_genericPage_sections_cards_cards_image_file | null;
}

export interface GenericPageQuery_genericPage_sections_cards_cards_link {
  text: string | null;
  url: string | null;
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
  cards: GenericPageQuery_genericPage_sections_cards_cards[] | null;
}

export interface GenericPageQuery_genericPage_sections_featured1_image_file_details_image {
  width: number;
  height: number;
}

export interface GenericPageQuery_genericPage_sections_featured1_image_file_details {
  size: number;
  image: GenericPageQuery_genericPage_sections_featured1_image_file_details_image;
}

export interface GenericPageQuery_genericPage_sections_featured1_image_file {
  url: string;
  fileName: string;
  contentType: string;
  details: GenericPageQuery_genericPage_sections_featured1_image_file_details;
}

export interface GenericPageQuery_genericPage_sections_featured1_image {
  title: string | null;
  description: string | null;
  file: GenericPageQuery_genericPage_sections_featured1_image_file | null;
}

export interface GenericPageQuery_genericPage_sections_featured1 {
  layout: string[] | null;
  body: string | null;
  title: string | null;
  image: GenericPageQuery_genericPage_sections_featured1_image | null;
}

export interface GenericPageQuery_genericPage_sections_featured2_image_file_details_image {
  width: number;
  height: number;
}

export interface GenericPageQuery_genericPage_sections_featured2_image_file_details {
  size: number;
  image: GenericPageQuery_genericPage_sections_featured2_image_file_details_image;
}

export interface GenericPageQuery_genericPage_sections_featured2_image_file {
  url: string;
  fileName: string;
  contentType: string;
  details: GenericPageQuery_genericPage_sections_featured2_image_file_details;
}

export interface GenericPageQuery_genericPage_sections_featured2_image {
  title: string | null;
  description: string | null;
  file: GenericPageQuery_genericPage_sections_featured2_image_file | null;
}

export interface GenericPageQuery_genericPage_sections_featured2_cards_image_file {
  url: string;
  fileName: string;
  contentType: string;
}

export interface GenericPageQuery_genericPage_sections_featured2_cards_image {
  title: string | null;
  description: string | null;
  file: GenericPageQuery_genericPage_sections_featured2_cards_image_file | null;
}

export interface GenericPageQuery_genericPage_sections_featured2_cards_link {
  text: string | null;
  url: string | null;
}

export interface GenericPageQuery_genericPage_sections_featured2_cards {
  name: string | null;
  title: string | null;
  image: GenericPageQuery_genericPage_sections_featured2_cards_image | null;
  body: string | null;
  link: GenericPageQuery_genericPage_sections_featured2_cards_link | null;
}

export interface GenericPageQuery_genericPage_sections_featured2 {
  layout: string[] | null;
  body: string | null;
  image: GenericPageQuery_genericPage_sections_featured2_image | null;
  title: string | null;
  cards: (GenericPageQuery_genericPage_sections_featured2_cards | null)[] | null;
}

export interface GenericPageQuery_genericPage_sections_carousel_cards_image_file {
  url: string;
  fileName: string;
  contentType: string;
}

export interface GenericPageQuery_genericPage_sections_carousel_cards_image {
  title: string | null;
  description: string | null;
  file: GenericPageQuery_genericPage_sections_carousel_cards_image_file | null;
}

export interface GenericPageQuery_genericPage_sections_carousel_cards_link {
  text: string | null;
  url: string | null;
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

export interface GenericPageQuery_genericPage_sections {
  tiles: GenericPageQuery_genericPage_sections_tiles | null;
  cards: GenericPageQuery_genericPage_sections_cards | null;
  featured1: GenericPageQuery_genericPage_sections_featured1 | null;
  featured2: GenericPageQuery_genericPage_sections_featured2 | null;
  carousel: GenericPageQuery_genericPage_sections_carousel | null;
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

export interface GenericPageQuery_genericPage {
  id: string;
  metaData: GenericPageQuery_genericPage_metaData;
  sections: GenericPageQuery_genericPage_sections | null;
  intro: string | null;
  body: string | null;
  featuredImage: GenericPageQuery_genericPage_featuredImage | null;
}

export interface GenericPageQuery {
  genericPage: GenericPageQuery_genericPage;
}

export interface GenericPageQueryVariables {
  slug: string;
}
