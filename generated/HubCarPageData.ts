/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: HubCarPageData
// ====================================================

export interface HubCarPageData_hubCarPage_sections_hero_image_file {
  url: string;
}

export interface HubCarPageData_hubCarPage_sections_hero_image {
  title: string | null;
  file: HubCarPageData_hubCarPage_sections_hero_image_file | null;
}

export interface HubCarPageData_hubCarPage_sections_hero {
  title: string | null;
  body: string | null;
  image: HubCarPageData_hubCarPage_sections_hero_image | null;
}

export interface HubCarPageData_hubCarPage_sections_leadText {
  heading: string | null;
  description: string | null;
}

export interface HubCarPageData_hubCarPage_sections_featured1_image_file {
  url: string;
}

export interface HubCarPageData_hubCarPage_sections_featured1_image {
  file: HubCarPageData_hubCarPage_sections_featured1_image_file | null;
}

export interface HubCarPageData_hubCarPage_sections_featured1 {
  title: string | null;
  body: string | null;
  image: HubCarPageData_hubCarPage_sections_featured1_image | null;
}

export interface HubCarPageData_hubCarPage_sections_featured2_image_file {
  url: string;
}

export interface HubCarPageData_hubCarPage_sections_featured2_image {
  file: HubCarPageData_hubCarPage_sections_featured2_image_file | null;
}

export interface HubCarPageData_hubCarPage_sections_featured2 {
  title: string | null;
  body: string | null;
  image: HubCarPageData_hubCarPage_sections_featured2_image | null;
}

export interface HubCarPageData_hubCarPage_sections_steps_steps {
  title: string | null;
  body: string | null;
}

export interface HubCarPageData_hubCarPage_sections_steps {
  heading: string | null;
  steps: HubCarPageData_hubCarPage_sections_steps_steps[] | null;
}

export interface HubCarPageData_hubCarPage_sections_tiles_tiles_image_file {
  url: string;
}

export interface HubCarPageData_hubCarPage_sections_tiles_tiles_image {
  file: HubCarPageData_hubCarPage_sections_tiles_tiles_image_file | null;
  title: string | null;
}

export interface HubCarPageData_hubCarPage_sections_tiles_tiles {
  title: string | null;
  body: string | null;
  image: HubCarPageData_hubCarPage_sections_tiles_tiles_image | null;
}

export interface HubCarPageData_hubCarPage_sections_tiles {
  name: string;
  tiles: HubCarPageData_hubCarPage_sections_tiles_tiles[] | null;
}

export interface HubCarPageData_hubCarPage_sections {
  hero: HubCarPageData_hubCarPage_sections_hero;
  leadText: HubCarPageData_hubCarPage_sections_leadText;
  featured1: HubCarPageData_hubCarPage_sections_featured1;
  featured2: HubCarPageData_hubCarPage_sections_featured2;
  steps: HubCarPageData_hubCarPage_sections_steps;
  tiles: HubCarPageData_hubCarPage_sections_tiles;
}

export interface HubCarPageData_hubCarPage {
  sections: HubCarPageData_hubCarPage_sections;
}

export interface HubCarPageData {
  hubCarPage: HubCarPageData_hubCarPage;
}
