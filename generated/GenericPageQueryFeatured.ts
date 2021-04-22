/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GenericPageQueryFeatured
// ====================================================

export interface GenericPageQueryFeatured_iconList {
  text: string | null;
}

export interface GenericPageQueryFeatured_link {
  url: string | null;
  text: string | null;
  legacyUrl: string | null;
}

export interface GenericPageQueryFeatured_cards_image_file {
  url: string;
  fileName: string;
}

export interface GenericPageQueryFeatured_cards_image {
  title: string | null;
  description: string | null;
  file: GenericPageQueryFeatured_cards_image_file | null;
}

export interface GenericPageQueryFeatured_cards_link {
  text: string | null;
  url: string | null;
  legacyUrl: string | null;
}

export interface GenericPageQueryFeatured_cards {
  name: string | null;
  title: string | null;
  image: GenericPageQueryFeatured_cards_image | null;
  body: string | null;
  link: GenericPageQueryFeatured_cards_link | null;
}

export interface GenericPageQueryFeatured_image_file {
  url: string;
  fileName: string;
}

export interface GenericPageQueryFeatured_image {
  title: string | null;
  description: string | null;
  file: GenericPageQueryFeatured_image_file | null;
}

export interface GenericPageQueryFeatured_testimonials {
  customerName: string | null;
  summary: string | null;
  rating: string | null;
}

export interface GenericPageQueryFeatured {
  layout: (string | null)[] | null;
  body: string | null;
  title: string | null;
  titleTag: string | null;
  video: string | null;
  targetId: string | null;
  defaultHeight: number | null;
  iconList: (GenericPageQueryFeatured_iconList | null)[] | null;
  link: GenericPageQueryFeatured_link | null;
  cards: (GenericPageQueryFeatured_cards | null)[] | null;
  image: GenericPageQueryFeatured_image | null;
  testimonials: (GenericPageQueryFeatured_testimonials | null)[] | null;
}
