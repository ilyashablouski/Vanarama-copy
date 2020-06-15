/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: HubCarPageData
// ====================================================

export interface HubCarPageData_hubVanPage_sections_hero_image_file {
  url: string;
}

export interface HubCarPageData_hubVanPage_sections_hero_image {
  title: string;
  file: HubCarPageData_hubVanPage_sections_hero_image_file;
}

export interface HubCarPageData_hubVanPage_sections_hero {
  title: string;
  body: string;
  image: HubCarPageData_hubVanPage_sections_hero_image;
}

export interface HubCarPageData_hubVanPage_sections_leadText {
  heading: string;
  description: string;
}

export interface HubCarPageData_hubVanPage_sections_featured1 {
  title: string;
  body: string;
}

export interface HubCarPageData_hubVanPage_sections_featured2 {
  title: string;
  body: string;
}

export interface HubCarPageData_hubVanPage_sections_steps_steps {
  title: string;
  body: string;
}

export interface HubCarPageData_hubVanPage_sections_steps {
  steps: HubCarPageData_hubVanPage_sections_steps_steps[] | null;
}

export interface HubCarPageData_hubVanPage_sections_tiles_tiles_image_file {
  url: string;
}

export interface HubCarPageData_hubVanPage_sections_tiles_tiles_image {
  file: HubCarPageData_hubVanPage_sections_tiles_tiles_image_file;
  title: string;
}

export interface HubCarPageData_hubVanPage_sections_tiles_tiles {
  title: string;
  body: string;
  image: HubCarPageData_hubVanPage_sections_tiles_tiles_image | null;
}

export interface HubCarPageData_hubVanPage_sections_tiles {
  name: string;
  tiles: HubCarPageData_hubVanPage_sections_tiles_tiles[] | null;
}

export interface HubCarPageData_hubVanPage_sections {
  hero: HubCarPageData_hubVanPage_sections_hero;
  leadText: HubCarPageData_hubVanPage_sections_leadText;
  featured1: HubCarPageData_hubVanPage_sections_featured1;
  featured2: HubCarPageData_hubVanPage_sections_featured2;
  steps: HubCarPageData_hubVanPage_sections_steps;
  tiles: HubCarPageData_hubVanPage_sections_tiles;
}

export interface HubCarPageData_hubVanPage {
  sections: HubCarPageData_hubVanPage_sections;
}

export interface HubCarPageData {
  hubVanPage: HubCarPageData_hubVanPage;
}
