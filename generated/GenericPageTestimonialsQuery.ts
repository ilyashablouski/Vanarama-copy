/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GenericPageTestimonialsQuery
// ====================================================

export interface GenericPageTestimonialsQuery_genericPage_metaData {
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

export interface GenericPageTestimonialsQuery_genericPage_sections_tiles1_tiles_link {
  text: string | null;
  url: string | null;
  legacyUrl: string | null;
}

export interface GenericPageTestimonialsQuery_genericPage_sections_tiles1_tiles_image_file {
  url: string;
  fileName: string;
  contentType: string;
}

export interface GenericPageTestimonialsQuery_genericPage_sections_tiles1_tiles_image {
  title: string | null;
  description: string | null;
  file: GenericPageTestimonialsQuery_genericPage_sections_tiles1_tiles_image_file | null;
}

export interface GenericPageTestimonialsQuery_genericPage_sections_tiles1_tiles {
  body: string | null;
  title: string | null;
  link: GenericPageTestimonialsQuery_genericPage_sections_tiles1_tiles_link | null;
  image: GenericPageTestimonialsQuery_genericPage_sections_tiles1_tiles_image | null;
}

export interface GenericPageTestimonialsQuery_genericPage_sections_tiles1 {
  position: number | null;
  name: string | null;
  tilesTitle: string | null;
  titleTag: string | null;
  tiles: GenericPageTestimonialsQuery_genericPage_sections_tiles1_tiles[] | null;
}

export interface GenericPageTestimonialsQuery_genericPage_sections_tiles2_tiles_link {
  text: string | null;
  url: string | null;
  legacyUrl: string | null;
}

export interface GenericPageTestimonialsQuery_genericPage_sections_tiles2_tiles_image_file {
  url: string;
  fileName: string;
  contentType: string;
}

export interface GenericPageTestimonialsQuery_genericPage_sections_tiles2_tiles_image {
  title: string | null;
  description: string | null;
  file: GenericPageTestimonialsQuery_genericPage_sections_tiles2_tiles_image_file | null;
}

export interface GenericPageTestimonialsQuery_genericPage_sections_tiles2_tiles {
  body: string | null;
  title: string | null;
  link: GenericPageTestimonialsQuery_genericPage_sections_tiles2_tiles_link | null;
  image: GenericPageTestimonialsQuery_genericPage_sections_tiles2_tiles_image | null;
}

export interface GenericPageTestimonialsQuery_genericPage_sections_tiles2 {
  position: number | null;
  name: string | null;
  tilesTitle: string | null;
  titleTag: string | null;
  tiles: GenericPageTestimonialsQuery_genericPage_sections_tiles2_tiles[] | null;
}

export interface GenericPageTestimonialsQuery_genericPage_sections_featured_iconList {
  text: string | null;
}

export interface GenericPageTestimonialsQuery_genericPage_sections_featured_link {
  url: string | null;
  text: string | null;
  legacyUrl: string | null;
}

export interface GenericPageTestimonialsQuery_genericPage_sections_featured_cards_image_file {
  url: string;
  fileName: string;
}

export interface GenericPageTestimonialsQuery_genericPage_sections_featured_cards_image {
  title: string | null;
  description: string | null;
  file: GenericPageTestimonialsQuery_genericPage_sections_featured_cards_image_file | null;
}

export interface GenericPageTestimonialsQuery_genericPage_sections_featured_cards_link {
  text: string | null;
  url: string | null;
  legacyUrl: string | null;
}

export interface GenericPageTestimonialsQuery_genericPage_sections_featured_cards {
  name: string | null;
  title: string | null;
  image: GenericPageTestimonialsQuery_genericPage_sections_featured_cards_image | null;
  body: string | null;
  link: GenericPageTestimonialsQuery_genericPage_sections_featured_cards_link | null;
}

export interface GenericPageTestimonialsQuery_genericPage_sections_featured_image_file {
  url: string;
  fileName: string;
}

export interface GenericPageTestimonialsQuery_genericPage_sections_featured_image {
  title: string | null;
  description: string | null;
  file: GenericPageTestimonialsQuery_genericPage_sections_featured_image_file | null;
}

export interface GenericPageTestimonialsQuery_genericPage_sections_featured_testimonials {
  customerName: string | null;
  summary: string | null;
  rating: string | null;
}

export interface GenericPageTestimonialsQuery_genericPage_sections_featured {
  layout: (string | null)[] | null;
  body: string | null;
  title: string | null;
  titleTag: string | null;
  video: string | null;
  defaultHeight: number | null;
  iconList: (GenericPageTestimonialsQuery_genericPage_sections_featured_iconList | null)[] | null;
  link: GenericPageTestimonialsQuery_genericPage_sections_featured_link | null;
  cards: (GenericPageTestimonialsQuery_genericPage_sections_featured_cards | null)[] | null;
  image: GenericPageTestimonialsQuery_genericPage_sections_featured_image | null;
  testimonials: (GenericPageTestimonialsQuery_genericPage_sections_featured_testimonials | null)[] | null;
}

export interface GenericPageTestimonialsQuery_genericPage_sections {
  tiles1: GenericPageTestimonialsQuery_genericPage_sections_tiles1 | null;
  tiles2: GenericPageTestimonialsQuery_genericPage_sections_tiles2 | null;
  featured: GenericPageTestimonialsQuery_genericPage_sections_featured | null;
}

export interface GenericPageTestimonialsQuery_genericPage {
  id: string;
  intro: string | null;
  body: string | null;
  metaData: GenericPageTestimonialsQuery_genericPage_metaData;
  sections: GenericPageTestimonialsQuery_genericPage_sections | null;
}

export interface GenericPageTestimonialsQuery {
  genericPage: GenericPageTestimonialsQuery_genericPage;
}

export interface GenericPageTestimonialsQueryVariables {
  slug: string;
}
