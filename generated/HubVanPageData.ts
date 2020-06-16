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
  hero: HubVanPageData_hubVanPage_sections_hero;
  leadText: HubVanPageData_hubVanPage_sections_leadText;
  featured1: HubVanPageData_hubVanPage_sections_featured1;
  featured2: HubVanPageData_hubVanPage_sections_featured2;
  cards: HubVanPageData_hubVanPage_sections_cards;
  steps: HubVanPageData_hubVanPage_sections_steps;
  tiles: HubVanPageData_hubVanPage_sections_tiles;
}

export interface HubVanPageData_hubVanPage {
  sections: HubVanPageData_hubVanPage_sections;
}

export interface HubVanPageData {
  hubVanPage: HubVanPageData_hubVanPage;
}
