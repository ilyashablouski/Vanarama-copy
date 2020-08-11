/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: HubPickupPageData
// ====================================================

export interface HubPickupPageData_hubPickupPage_sections_hero_image_file {
  url: string;
}

export interface HubPickupPageData_hubPickupPage_sections_hero_image {
  title: string | null;
  file: HubPickupPageData_hubPickupPage_sections_hero_image_file | null;
}

export interface HubPickupPageData_hubPickupPage_sections_hero {
  title: string | null;
  titleTag: string | null;
  body: string | null;
  image: HubPickupPageData_hubPickupPage_sections_hero_image | null;
}

export interface HubPickupPageData_hubPickupPage_sections_leadText {
  heading: string | null;
  titleTag: string | null;
  description: string | null;
}

export interface HubPickupPageData_hubPickupPage_sections_featured1_image_file {
  url: string;
}

export interface HubPickupPageData_hubPickupPage_sections_featured1_image {
  file: HubPickupPageData_hubPickupPage_sections_featured1_image_file | null;
}

export interface HubPickupPageData_hubPickupPage_sections_featured1 {
  title: string | null;
  titleTag: string | null;
  body: string | null;
  image: HubPickupPageData_hubPickupPage_sections_featured1_image | null;
}

export interface HubPickupPageData_hubPickupPage_sections_featured2_image_file {
  url: string;
}

export interface HubPickupPageData_hubPickupPage_sections_featured2_image {
  file: HubPickupPageData_hubPickupPage_sections_featured2_image_file | null;
}

export interface HubPickupPageData_hubPickupPage_sections_featured2 {
  title: string | null;
  titleTag: string | null;
  body: string | null;
  image: HubPickupPageData_hubPickupPage_sections_featured2_image | null;
}

export interface HubPickupPageData_hubPickupPage_sections_rowText {
  heading: string | null;
  titleTag: string | null;
  subHeading: string | null;
  body: string | null;
}

export interface HubPickupPageData_hubPickupPage_sections_steps_steps {
  title: string | null;
  body: string | null;
}

export interface HubPickupPageData_hubPickupPage_sections_steps {
  heading: string | null;
  titleTag: string | null;
  steps: HubPickupPageData_hubPickupPage_sections_steps_steps[] | null;
}

export interface HubPickupPageData_hubPickupPage_sections_tiles1_tiles_image_file {
  url: string;
}

export interface HubPickupPageData_hubPickupPage_sections_tiles1_tiles_image {
  file: HubPickupPageData_hubPickupPage_sections_tiles1_tiles_image_file | null;
}

export interface HubPickupPageData_hubPickupPage_sections_tiles1_tiles {
  title: string | null;
  link: string | null;
  body: string | null;
  image: HubPickupPageData_hubPickupPage_sections_tiles1_tiles_image | null;
}

export interface HubPickupPageData_hubPickupPage_sections_tiles1 {
  name: string;
  titleTag: string | null;
  tilesTitle: string | null;
  tiles: HubPickupPageData_hubPickupPage_sections_tiles1_tiles[] | null;
}

export interface HubPickupPageData_hubPickupPage_sections_tiles2_tiles_image_file {
  url: string;
}

export interface HubPickupPageData_hubPickupPage_sections_tiles2_tiles_image {
  file: HubPickupPageData_hubPickupPage_sections_tiles2_tiles_image_file | null;
  title: string | null;
}

export interface HubPickupPageData_hubPickupPage_sections_tiles2_tiles {
  title: string | null;
  link: string | null;
  body: string | null;
  image: HubPickupPageData_hubPickupPage_sections_tiles2_tiles_image | null;
}

export interface HubPickupPageData_hubPickupPage_sections_tiles2 {
  name: string;
  titleTag: string | null;
  tilesTitle: string | null;
  tiles: HubPickupPageData_hubPickupPage_sections_tiles2_tiles[] | null;
}

export interface HubPickupPageData_hubPickupPage_sections {
  hero: HubPickupPageData_hubPickupPage_sections_hero | null;
  leadText: HubPickupPageData_hubPickupPage_sections_leadText | null;
  featured1: HubPickupPageData_hubPickupPage_sections_featured1 | null;
  featured2: HubPickupPageData_hubPickupPage_sections_featured2 | null;
  rowText: HubPickupPageData_hubPickupPage_sections_rowText | null;
  steps: HubPickupPageData_hubPickupPage_sections_steps | null;
  tiles1: HubPickupPageData_hubPickupPage_sections_tiles1 | null;
  tiles2: HubPickupPageData_hubPickupPage_sections_tiles2 | null;
}

export interface HubPickupPageData_hubPickupPage {
  id: string;
  sections: HubPickupPageData_hubPickupPage_sections | null;
}

export interface HubPickupPageData {
  hubPickupPage: HubPickupPageData_hubPickupPage;
}
