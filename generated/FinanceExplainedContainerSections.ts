/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: FinanceExplainedContainerSections
// ====================================================

export interface FinanceExplainedContainerSections_cards_cards_image_file_details_image {
  width: number;
  height: number;
}

export interface FinanceExplainedContainerSections_cards_cards_image_file_details {
  size: number;
  image: FinanceExplainedContainerSections_cards_cards_image_file_details_image;
}

export interface FinanceExplainedContainerSections_cards_cards_image_file {
  url: string;
  fileName: string;
  contentType: string;
  details: FinanceExplainedContainerSections_cards_cards_image_file_details;
}

export interface FinanceExplainedContainerSections_cards_cards_image {
  title: string | null;
  description: string | null;
  file: FinanceExplainedContainerSections_cards_cards_image_file | null;
}

export interface FinanceExplainedContainerSections_cards_cards_link {
  text: string | null;
  url: string | null;
}

export interface FinanceExplainedContainerSections_cards_cards {
  name: string | null;
  title: string | null;
  image: FinanceExplainedContainerSections_cards_cards_image | null;
  body: string | null;
  link: FinanceExplainedContainerSections_cards_cards_link | null;
}

export interface FinanceExplainedContainerSections_cards {
  name: string | null;
  description: string | null;
  cards: FinanceExplainedContainerSections_cards_cards[] | null;
}

export interface FinanceExplainedContainerSections_featured1_image_file_details_image {
  width: number;
  height: number;
}

export interface FinanceExplainedContainerSections_featured1_image_file_details {
  size: number;
  image: FinanceExplainedContainerSections_featured1_image_file_details_image;
}

export interface FinanceExplainedContainerSections_featured1_image_file {
  url: string;
  fileName: string;
  contentType: string;
  details: FinanceExplainedContainerSections_featured1_image_file_details;
}

export interface FinanceExplainedContainerSections_featured1_image {
  title: string | null;
  description: string | null;
  file: FinanceExplainedContainerSections_featured1_image_file | null;
}

export interface FinanceExplainedContainerSections_featured1 {
  layout: string[] | null;
  body: string | null;
  title: string | null;
  image: FinanceExplainedContainerSections_featured1_image | null;
}

export interface FinanceExplainedContainerSections_featured2_image_file_details_image {
  width: number;
  height: number;
}

export interface FinanceExplainedContainerSections_featured2_image_file_details {
  size: number;
  image: FinanceExplainedContainerSections_featured2_image_file_details_image;
}

export interface FinanceExplainedContainerSections_featured2_image_file {
  url: string;
  fileName: string;
  contentType: string;
  details: FinanceExplainedContainerSections_featured2_image_file_details;
}

export interface FinanceExplainedContainerSections_featured2_image {
  title: string | null;
  description: string | null;
  file: FinanceExplainedContainerSections_featured2_image_file | null;
}

export interface FinanceExplainedContainerSections_featured2_cards_image_file_details_image {
  width: number;
  height: number;
}

export interface FinanceExplainedContainerSections_featured2_cards_image_file_details {
  size: number;
  image: FinanceExplainedContainerSections_featured2_cards_image_file_details_image;
}

export interface FinanceExplainedContainerSections_featured2_cards_image_file {
  url: string;
  fileName: string;
  contentType: string;
  details: FinanceExplainedContainerSections_featured2_cards_image_file_details;
}

export interface FinanceExplainedContainerSections_featured2_cards_image {
  title: string | null;
  description: string | null;
  file: FinanceExplainedContainerSections_featured2_cards_image_file | null;
}

export interface FinanceExplainedContainerSections_featured2_cards_link {
  text: string | null;
  url: string | null;
}

export interface FinanceExplainedContainerSections_featured2_cards {
  name: string | null;
  title: string | null;
  image: FinanceExplainedContainerSections_featured2_cards_image | null;
  body: string | null;
  link: FinanceExplainedContainerSections_featured2_cards_link | null;
}

export interface FinanceExplainedContainerSections_featured2 {
  layout: string[] | null;
  body: string | null;
  image: FinanceExplainedContainerSections_featured2_image | null;
  title: string | null;
  cards: (FinanceExplainedContainerSections_featured2_cards | null)[] | null;
}

export interface FinanceExplainedContainerSections_carousel_cards_image_file_details_image {
  width: number;
  height: number;
}

export interface FinanceExplainedContainerSections_carousel_cards_image_file_details {
  size: number;
  image: FinanceExplainedContainerSections_carousel_cards_image_file_details_image;
}

export interface FinanceExplainedContainerSections_carousel_cards_image_file {
  url: string;
  fileName: string;
  contentType: string;
  details: FinanceExplainedContainerSections_carousel_cards_image_file_details;
}

export interface FinanceExplainedContainerSections_carousel_cards_image {
  title: string | null;
  description: string | null;
  file: FinanceExplainedContainerSections_carousel_cards_image_file | null;
}

export interface FinanceExplainedContainerSections_carousel_cards_link {
  text: string | null;
  url: string | null;
}

export interface FinanceExplainedContainerSections_carousel_cards {
  name: string | null;
  title: string | null;
  image: FinanceExplainedContainerSections_carousel_cards_image | null;
  body: string | null;
  link: FinanceExplainedContainerSections_carousel_cards_link | null;
}

export interface FinanceExplainedContainerSections_carousel {
  title: string | null;
  name: string | null;
  cards: (FinanceExplainedContainerSections_carousel_cards | null)[] | null;
}

export interface FinanceExplainedContainerSections {
  cards: FinanceExplainedContainerSections_cards | null;
  featured1: FinanceExplainedContainerSections_featured1 | null;
  featured2: FinanceExplainedContainerSections_featured2 | null;
  carousel: FinanceExplainedContainerSections_carousel | null;
}
