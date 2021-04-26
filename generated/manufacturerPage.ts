/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: manufacturerPage
// ====================================================

export interface manufacturerPage_manufacturerPage_metaData {
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

export interface manufacturerPage_manufacturerPage_sections_featured_iconList {
  text: string | null;
}

export interface manufacturerPage_manufacturerPage_sections_featured_link {
  url: string | null;
  text: string | null;
  legacyUrl: string | null;
}

export interface manufacturerPage_manufacturerPage_sections_featured_cards_image_file {
  url: string;
  fileName: string;
}

export interface manufacturerPage_manufacturerPage_sections_featured_cards_image {
  title: string | null;
  description: string | null;
  file: manufacturerPage_manufacturerPage_sections_featured_cards_image_file | null;
}

export interface manufacturerPage_manufacturerPage_sections_featured_cards_link {
  text: string | null;
  url: string | null;
  legacyUrl: string | null;
}

export interface manufacturerPage_manufacturerPage_sections_featured_cards {
  name: string | null;
  title: string | null;
  image: manufacturerPage_manufacturerPage_sections_featured_cards_image | null;
  body: string | null;
  link: manufacturerPage_manufacturerPage_sections_featured_cards_link | null;
}

export interface manufacturerPage_manufacturerPage_sections_featured_image_file {
  url: string;
  fileName: string;
}

export interface manufacturerPage_manufacturerPage_sections_featured_image {
  title: string | null;
  description: string | null;
  file: manufacturerPage_manufacturerPage_sections_featured_image_file | null;
}

export interface manufacturerPage_manufacturerPage_sections_featured_testimonials {
  customerName: string | null;
  summary: string | null;
  rating: string | null;
}

export interface manufacturerPage_manufacturerPage_sections_featured {
  layout: (string | null)[] | null;
  body: string | null;
  title: string | null;
  titleTag: string | null;
  video: string | null;
  targetId: string | null;
  defaultHeight: number | null;
  iconList: (manufacturerPage_manufacturerPage_sections_featured_iconList | null)[] | null;
  link: manufacturerPage_manufacturerPage_sections_featured_link | null;
  cards: (manufacturerPage_manufacturerPage_sections_featured_cards | null)[] | null;
  image: manufacturerPage_manufacturerPage_sections_featured_image | null;
  testimonials: (manufacturerPage_manufacturerPage_sections_featured_testimonials | null)[] | null;
}

export interface manufacturerPage_manufacturerPage_sections {
  featured: manufacturerPage_manufacturerPage_sections_featured | null;
}

export interface manufacturerPage_manufacturerPage {
  metaData: manufacturerPage_manufacturerPage_metaData;
  sections: manufacturerPage_manufacturerPage_sections | null;
}

export interface manufacturerPage {
  manufacturerPage: manufacturerPage_manufacturerPage;
}
