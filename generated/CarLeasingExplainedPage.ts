/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CarLeasingExplainedPage
// ====================================================

export interface CarLeasingExplainedPage_genericPage_metaData {
  title: string | null;
  name: string | null;
  pageType: string | null;
  metaRobots: string | null;
  metaDescription: string | null;
  publishedOn: any | null;
  legacyUrl: string | null;
}

export interface CarLeasingExplainedPage_genericPage_featuredImage_file_details_image {
  width: number;
  height: number;
}

export interface CarLeasingExplainedPage_genericPage_featuredImage_file_details {
  image: CarLeasingExplainedPage_genericPage_featuredImage_file_details_image;
}

export interface CarLeasingExplainedPage_genericPage_featuredImage_file {
  url: string;
  details: CarLeasingExplainedPage_genericPage_featuredImage_file_details;
}

export interface CarLeasingExplainedPage_genericPage_featuredImage {
  file: CarLeasingExplainedPage_genericPage_featuredImage_file | null;
}

export interface CarLeasingExplainedPage_genericPage_sections_cards_cards_image_file {
  url: string;
  fileName: string;
  contentType: string;
}

export interface CarLeasingExplainedPage_genericPage_sections_cards_cards_image {
  title: string | null;
  description: string | null;
  file: CarLeasingExplainedPage_genericPage_sections_cards_cards_image_file | null;
}

export interface CarLeasingExplainedPage_genericPage_sections_cards_cards_link {
  text: string | null;
  url: string | null;
}

export interface CarLeasingExplainedPage_genericPage_sections_cards_cards {
  name: string | null;
  title: string | null;
  image: CarLeasingExplainedPage_genericPage_sections_cards_cards_image | null;
  body: string | null;
  link: CarLeasingExplainedPage_genericPage_sections_cards_cards_link | null;
}

export interface CarLeasingExplainedPage_genericPage_sections_cards {
  name: string | null;
  description: string | null;
  cards: CarLeasingExplainedPage_genericPage_sections_cards_cards[] | null;
}

export interface CarLeasingExplainedPage_genericPage_sections_featured1_image_file_details_image {
  width: number;
  height: number;
}

export interface CarLeasingExplainedPage_genericPage_sections_featured1_image_file_details {
  size: number;
  image: CarLeasingExplainedPage_genericPage_sections_featured1_image_file_details_image;
}

export interface CarLeasingExplainedPage_genericPage_sections_featured1_image_file {
  url: string;
  fileName: string;
  contentType: string;
  details: CarLeasingExplainedPage_genericPage_sections_featured1_image_file_details;
}

export interface CarLeasingExplainedPage_genericPage_sections_featured1_image {
  title: string | null;
  description: string | null;
  file: CarLeasingExplainedPage_genericPage_sections_featured1_image_file | null;
}

export interface CarLeasingExplainedPage_genericPage_sections_featured1 {
  layout: string[] | null;
  body: string | null;
  title: string | null;
  image: CarLeasingExplainedPage_genericPage_sections_featured1_image | null;
}

export interface CarLeasingExplainedPage_genericPage_sections_featured2_image_file_details_image {
  width: number;
  height: number;
}

export interface CarLeasingExplainedPage_genericPage_sections_featured2_image_file_details {
  size: number;
  image: CarLeasingExplainedPage_genericPage_sections_featured2_image_file_details_image;
}

export interface CarLeasingExplainedPage_genericPage_sections_featured2_image_file {
  url: string;
  fileName: string;
  contentType: string;
  details: CarLeasingExplainedPage_genericPage_sections_featured2_image_file_details;
}

export interface CarLeasingExplainedPage_genericPage_sections_featured2_image {
  title: string | null;
  description: string | null;
  file: CarLeasingExplainedPage_genericPage_sections_featured2_image_file | null;
}

export interface CarLeasingExplainedPage_genericPage_sections_featured2_cards_image_file {
  url: string;
  fileName: string;
  contentType: string;
}

export interface CarLeasingExplainedPage_genericPage_sections_featured2_cards_image {
  title: string | null;
  description: string | null;
  file: CarLeasingExplainedPage_genericPage_sections_featured2_cards_image_file | null;
}

export interface CarLeasingExplainedPage_genericPage_sections_featured2_cards_link {
  text: string | null;
  url: string | null;
}

export interface CarLeasingExplainedPage_genericPage_sections_featured2_cards {
  name: string | null;
  title: string | null;
  image: CarLeasingExplainedPage_genericPage_sections_featured2_cards_image | null;
  body: string | null;
  link: CarLeasingExplainedPage_genericPage_sections_featured2_cards_link | null;
}

export interface CarLeasingExplainedPage_genericPage_sections_featured2 {
  layout: string[] | null;
  body: string | null;
  image: CarLeasingExplainedPage_genericPage_sections_featured2_image | null;
  title: string | null;
  cards: (CarLeasingExplainedPage_genericPage_sections_featured2_cards | null)[] | null;
}

export interface CarLeasingExplainedPage_genericPage_sections_carousel_cards_image_file {
  url: string;
  fileName: string;
  contentType: string;
}

export interface CarLeasingExplainedPage_genericPage_sections_carousel_cards_image {
  title: string | null;
  description: string | null;
  file: CarLeasingExplainedPage_genericPage_sections_carousel_cards_image_file | null;
}

export interface CarLeasingExplainedPage_genericPage_sections_carousel_cards_link {
  text: string | null;
  url: string | null;
}

export interface CarLeasingExplainedPage_genericPage_sections_carousel_cards {
  name: string | null;
  title: string | null;
  image: CarLeasingExplainedPage_genericPage_sections_carousel_cards_image | null;
  body: string | null;
  link: CarLeasingExplainedPage_genericPage_sections_carousel_cards_link | null;
}

export interface CarLeasingExplainedPage_genericPage_sections_carousel {
  title: string | null;
  name: string | null;
  cards: (CarLeasingExplainedPage_genericPage_sections_carousel_cards | null)[] | null;
}

export interface CarLeasingExplainedPage_genericPage_sections {
  cards: CarLeasingExplainedPage_genericPage_sections_cards | null;
  featured1: CarLeasingExplainedPage_genericPage_sections_featured1 | null;
  featured2: CarLeasingExplainedPage_genericPage_sections_featured2 | null;
  carousel: CarLeasingExplainedPage_genericPage_sections_carousel | null;
}

export interface CarLeasingExplainedPage_genericPage {
  id: string;
  body: string | null;
  metaData: CarLeasingExplainedPage_genericPage_metaData;
  featuredImage: CarLeasingExplainedPage_genericPage_featuredImage | null;
  sections: CarLeasingExplainedPage_genericPage_sections | null;
}

export interface CarLeasingExplainedPage {
  genericPage: CarLeasingExplainedPage_genericPage;
}
