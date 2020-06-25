/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: HubVanPageData
// ====================================================

export interface HubVanPageData_hubVanPage_sections_hero_image_file {
  url: string;
}

export interface HubVanPageData_hubVanPage_sections_hero_image {
  title: string | null;
  file: HubVanPageData_hubVanPage_sections_hero_image_file | null;
}

export interface HubVanPageData_hubVanPage_sections_hero {
  title: string | null;
  body: string | null;
  image: HubVanPageData_hubVanPage_sections_hero_image | null;
}

export interface HubVanPageData_hubVanPage_sections_leadText {
  heading: string | null;
  description: string | null;
}

export interface HubVanPageData_hubVanPage_sections_featured1_image_file {
  url: string;
}

export interface HubVanPageData_hubVanPage_sections_featured1_image {
  file: HubVanPageData_hubVanPage_sections_featured1_image_file | null;
}

export interface HubVanPageData_hubVanPage_sections_featured1 {
  title: string | null;
  body: string | null;
  image: HubVanPageData_hubVanPage_sections_featured1_image | null;
}

export interface HubVanPageData_hubVanPage_sections_featured2_image_file {
  url: string;
}

export interface HubVanPageData_hubVanPage_sections_featured2_image {
  file: HubVanPageData_hubVanPage_sections_featured2_image_file | null;
}

export interface HubVanPageData_hubVanPage_sections_featured2 {
  title: string | null;
  body: string | null;
  image: HubVanPageData_hubVanPage_sections_featured2_image | null;
}

export interface HubVanPageData_hubVanPage_sections_rowText {
  heading: string | null;
  subHeading: string | null;
  body: string | null;
}

export interface HubVanPageData_hubVanPage_sections_cards_cards_image_file {
  url: string;
}

export interface HubVanPageData_hubVanPage_sections_cards_cards_image {
  file: HubVanPageData_hubVanPage_sections_cards_cards_image_file | null;
}

export interface HubVanPageData_hubVanPage_sections_cards_cards {
  title: string | null;
  body: string | null;
  image: HubVanPageData_hubVanPage_sections_cards_cards_image | null;
}

export interface HubVanPageData_hubVanPage_sections_cards {
  name: string | null;
  description: string | null;
  cards: HubVanPageData_hubVanPage_sections_cards_cards[] | null;
}

export interface HubVanPageData_hubVanPage_sections_steps_steps {
  title: string | null;
  body: string | null;
}

export interface HubVanPageData_hubVanPage_sections_steps {
  heading: string | null;
  steps: HubVanPageData_hubVanPage_sections_steps_steps[] | null;
}

export interface HubVanPageData_hubVanPage_sections_tiles_tiles_image_file {
  url: string;
}

export interface HubVanPageData_hubVanPage_sections_tiles_tiles_image {
  file: HubVanPageData_hubVanPage_sections_tiles_tiles_image_file | null;
  title: string | null;
}

export interface HubVanPageData_hubVanPage_sections_tiles_tiles {
  title: string | null;
  body: string | null;
  image: HubVanPageData_hubVanPage_sections_tiles_tiles_image | null;
}

export interface HubVanPageData_hubVanPage_sections_tiles {
  name: string;
  tiles: HubVanPageData_hubVanPage_sections_tiles_tiles[] | null;
}

export interface HubVanPageData_hubVanPage_sections {
  hero: HubVanPageData_hubVanPage_sections_hero | null;
  leadText: HubVanPageData_hubVanPage_sections_leadText | null;
  featured1: HubVanPageData_hubVanPage_sections_featured1 | null;
  featured2: HubVanPageData_hubVanPage_sections_featured2 | null;
  rowText: HubVanPageData_hubVanPage_sections_rowText | null;
  cards: HubVanPageData_hubVanPage_sections_cards | null;
  steps: HubVanPageData_hubVanPage_sections_steps | null;
  tiles: HubVanPageData_hubVanPage_sections_tiles | null;
}

export interface HubVanPageData_hubVanPage {
  id: string;
  sections: HubVanPageData_hubVanPage_sections;
}

export interface HubVanPageData {
  hubVanPage: HubVanPageData_hubVanPage;
}
