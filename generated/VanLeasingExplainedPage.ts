/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: VanLeasingExplainedPage
// ====================================================

export interface VanLeasingExplainedPage_genericPage_metaData {
  title: string | null;
  name: string | null;
  pageType: string | null;
}

export interface VanLeasingExplainedPage_genericPage_sections_cards_cards_image_file_details_image {
  width: number;
  height: number;
}

export interface VanLeasingExplainedPage_genericPage_sections_cards_cards_image_file_details {
  size: number;
  image: VanLeasingExplainedPage_genericPage_sections_cards_cards_image_file_details_image;
}

export interface VanLeasingExplainedPage_genericPage_sections_cards_cards_image_file {
  url: string;
  fileName: string;
  contentType: string;
  details: VanLeasingExplainedPage_genericPage_sections_cards_cards_image_file_details;
}

export interface VanLeasingExplainedPage_genericPage_sections_cards_cards_image {
  title: string | null;
  description: string | null;
  file: VanLeasingExplainedPage_genericPage_sections_cards_cards_image_file | null;
}

export interface VanLeasingExplainedPage_genericPage_sections_cards_cards_link {
  text: string | null;
  url: string | null;
}

export interface VanLeasingExplainedPage_genericPage_sections_cards_cards {
  name: string | null;
  title: string | null;
  image: VanLeasingExplainedPage_genericPage_sections_cards_cards_image | null;
  body: string | null;
  link: VanLeasingExplainedPage_genericPage_sections_cards_cards_link | null;
}

export interface VanLeasingExplainedPage_genericPage_sections_cards {
  name: string | null;
  description: string | null;
  cards: VanLeasingExplainedPage_genericPage_sections_cards_cards[] | null;
}

export interface VanLeasingExplainedPage_genericPage_sections_featured1_image_file_details_image {
  width: number;
  height: number;
}

export interface VanLeasingExplainedPage_genericPage_sections_featured1_image_file_details {
  size: number;
  image: VanLeasingExplainedPage_genericPage_sections_featured1_image_file_details_image;
}

export interface VanLeasingExplainedPage_genericPage_sections_featured1_image_file {
  url: string;
  fileName: string;
  contentType: string;
  details: VanLeasingExplainedPage_genericPage_sections_featured1_image_file_details;
}

export interface VanLeasingExplainedPage_genericPage_sections_featured1_image {
  title: string | null;
  description: string | null;
  file: VanLeasingExplainedPage_genericPage_sections_featured1_image_file | null;
}

export interface VanLeasingExplainedPage_genericPage_sections_featured1 {
  layout: string[] | null;
  body: string | null;
  title: string | null;
  image: VanLeasingExplainedPage_genericPage_sections_featured1_image | null;
}

export interface VanLeasingExplainedPage_genericPage_sections_featured2_image_file_details_image {
  width: number;
  height: number;
}

export interface VanLeasingExplainedPage_genericPage_sections_featured2_image_file_details {
  size: number;
  image: VanLeasingExplainedPage_genericPage_sections_featured2_image_file_details_image;
}

export interface VanLeasingExplainedPage_genericPage_sections_featured2_image_file {
  url: string;
  fileName: string;
  contentType: string;
  details: VanLeasingExplainedPage_genericPage_sections_featured2_image_file_details;
}

export interface VanLeasingExplainedPage_genericPage_sections_featured2_image {
  title: string | null;
  description: string | null;
  file: VanLeasingExplainedPage_genericPage_sections_featured2_image_file | null;
}

export interface VanLeasingExplainedPage_genericPage_sections_featured2_cards_image_file_details_image {
  width: number;
  height: number;
}

export interface VanLeasingExplainedPage_genericPage_sections_featured2_cards_image_file_details {
  size: number;
  image: VanLeasingExplainedPage_genericPage_sections_featured2_cards_image_file_details_image;
}

export interface VanLeasingExplainedPage_genericPage_sections_featured2_cards_image_file {
  url: string;
  fileName: string;
  contentType: string;
  details: VanLeasingExplainedPage_genericPage_sections_featured2_cards_image_file_details;
}

export interface VanLeasingExplainedPage_genericPage_sections_featured2_cards_image {
  title: string | null;
  description: string | null;
  file: VanLeasingExplainedPage_genericPage_sections_featured2_cards_image_file | null;
}

export interface VanLeasingExplainedPage_genericPage_sections_featured2_cards_link {
  text: string | null;
  url: string | null;
}

export interface VanLeasingExplainedPage_genericPage_sections_featured2_cards {
  name: string | null;
  title: string | null;
  image: VanLeasingExplainedPage_genericPage_sections_featured2_cards_image | null;
  body: string | null;
  link: VanLeasingExplainedPage_genericPage_sections_featured2_cards_link | null;
}

export interface VanLeasingExplainedPage_genericPage_sections_featured2 {
  layout: string[] | null;
  body: string | null;
  image: VanLeasingExplainedPage_genericPage_sections_featured2_image | null;
  title: string | null;
  cards: (VanLeasingExplainedPage_genericPage_sections_featured2_cards | null)[] | null;
}

export interface VanLeasingExplainedPage_genericPage_sections_carousel_cards_image_file_details_image {
  width: number;
  height: number;
}

export interface VanLeasingExplainedPage_genericPage_sections_carousel_cards_image_file_details {
  size: number;
  image: VanLeasingExplainedPage_genericPage_sections_carousel_cards_image_file_details_image;
}

export interface VanLeasingExplainedPage_genericPage_sections_carousel_cards_image_file {
  url: string;
  fileName: string;
  contentType: string;
  details: VanLeasingExplainedPage_genericPage_sections_carousel_cards_image_file_details;
}

export interface VanLeasingExplainedPage_genericPage_sections_carousel_cards_image {
  title: string | null;
  description: string | null;
  file: VanLeasingExplainedPage_genericPage_sections_carousel_cards_image_file | null;
}

export interface VanLeasingExplainedPage_genericPage_sections_carousel_cards_link {
  text: string | null;
  url: string | null;
}

export interface VanLeasingExplainedPage_genericPage_sections_carousel_cards {
  name: string | null;
  title: string | null;
  image: VanLeasingExplainedPage_genericPage_sections_carousel_cards_image | null;
  body: string | null;
  link: VanLeasingExplainedPage_genericPage_sections_carousel_cards_link | null;
}

export interface VanLeasingExplainedPage_genericPage_sections_carousel {
  title: string | null;
  name: string | null;
  cards: (VanLeasingExplainedPage_genericPage_sections_carousel_cards | null)[] | null;
}

export interface VanLeasingExplainedPage_genericPage_sections {
  cards: VanLeasingExplainedPage_genericPage_sections_cards | null;
  featured1: VanLeasingExplainedPage_genericPage_sections_featured1 | null;
  featured2: VanLeasingExplainedPage_genericPage_sections_featured2 | null;
  carousel: VanLeasingExplainedPage_genericPage_sections_carousel | null;
}

export interface VanLeasingExplainedPage_genericPage {
  id: string;
  body: string | null;
  metaData: VanLeasingExplainedPage_genericPage_metaData;
  sections: VanLeasingExplainedPage_genericPage_sections | null;
}

export interface VanLeasingExplainedPage {
  genericPage: VanLeasingExplainedPage_genericPage;
}
