/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GenericPageTestimonialsQuery
// ====================================================

export interface GenericPageTestimonialsQuery_genericPage_featuredImage_file {
  url: string;
  fileName: string;
  contentType: string;
}

export interface GenericPageTestimonialsQuery_genericPage_featuredImage {
  title: string | null;
  description: string | null;
  file: GenericPageTestimonialsQuery_genericPage_featuredImage_file | null;
}

export interface GenericPageTestimonialsQuery_genericPage_metaData {
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

export interface GenericPageTestimonialsQuery_genericPage_sections_tiles1_tiles_image_file {
  url: string;
  contentType: string;
}

export interface GenericPageTestimonialsQuery_genericPage_sections_tiles1_tiles_image {
  title: string | null;
  description: string | null;
  file: GenericPageTestimonialsQuery_genericPage_sections_tiles1_tiles_image_file | null;
}

export interface GenericPageTestimonialsQuery_genericPage_sections_tiles1_tiles {
  title: string | null;
  body: string | null;
  image: GenericPageTestimonialsQuery_genericPage_sections_tiles1_tiles_image | null;
  link: string | null;
}

export interface GenericPageTestimonialsQuery_genericPage_sections_tiles1 {
  name: string | null;
  titleTag: string | null;
  tiles: GenericPageTestimonialsQuery_genericPage_sections_tiles1_tiles[] | null;
}

export interface GenericPageTestimonialsQuery_genericPage_sections_tiles2_tiles_image_file {
  url: string;
  contentType: string;
}

export interface GenericPageTestimonialsQuery_genericPage_sections_tiles2_tiles_image {
  title: string | null;
  description: string | null;
  file: GenericPageTestimonialsQuery_genericPage_sections_tiles2_tiles_image_file | null;
}

export interface GenericPageTestimonialsQuery_genericPage_sections_tiles2_tiles {
  title: string | null;
  body: string | null;
  image: GenericPageTestimonialsQuery_genericPage_sections_tiles2_tiles_image | null;
  link: string | null;
}

export interface GenericPageTestimonialsQuery_genericPage_sections_tiles2 {
  name: string | null;
  titleTag: string | null;
  tiles: GenericPageTestimonialsQuery_genericPage_sections_tiles2_tiles[] | null;
}

export interface GenericPageTestimonialsQuery_genericPage_sections_featured_link {
  text: string | null;
  url: string | null;
}

export interface GenericPageTestimonialsQuery_genericPage_sections_featured_image_file_details_image {
  width: number;
  height: number;
}

export interface GenericPageTestimonialsQuery_genericPage_sections_featured_image_file_details {
  size: number;
  image: GenericPageTestimonialsQuery_genericPage_sections_featured_image_file_details_image;
}

export interface GenericPageTestimonialsQuery_genericPage_sections_featured_image_file {
  url: string;
  fileName: string;
  contentType: string;
  details: GenericPageTestimonialsQuery_genericPage_sections_featured_image_file_details;
}

export interface GenericPageTestimonialsQuery_genericPage_sections_featured_image {
  title: string | null;
  description: string | null;
  file: GenericPageTestimonialsQuery_genericPage_sections_featured_image_file | null;
}

export interface GenericPageTestimonialsQuery_genericPage_sections_featured {
  layout: (string | null)[] | null;
  body: string | null;
  title: string | null;
  video: string | null;
  titleTag: string | null;
  link: GenericPageTestimonialsQuery_genericPage_sections_featured_link | null;
  image: GenericPageTestimonialsQuery_genericPage_sections_featured_image | null;
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
  featuredImage: GenericPageTestimonialsQuery_genericPage_featuredImage | null;
  metaData: GenericPageTestimonialsQuery_genericPage_metaData;
  sections: GenericPageTestimonialsQuery_genericPage_sections | null;
}

export interface GenericPageTestimonialsQuery {
  genericPage: GenericPageTestimonialsQuery_genericPage;
}

export interface GenericPageTestimonialsQueryVariables {
  slug: string;
}
