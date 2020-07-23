/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetFleetLandingPage
// ====================================================

export interface GetFleetLandingPage_fleetLandingPage_sections_featured1_image_file {
  url: string;
}

export interface GetFleetLandingPage_fleetLandingPage_sections_featured1_image {
  title: string | null;
  file: GetFleetLandingPage_fleetLandingPage_sections_featured1_image_file | null;
}

export interface GetFleetLandingPage_fleetLandingPage_sections_featured1 {
  title: string | null;
  titleTag: string | null;
  body: string | null;
  image: GetFleetLandingPage_fleetLandingPage_sections_featured1_image | null;
  video: string | null;
  layout: string[] | null;
}

export interface GetFleetLandingPage_fleetLandingPage_sections_featured2_image_file {
  url: string;
}

export interface GetFleetLandingPage_fleetLandingPage_sections_featured2_image {
  title: string | null;
  file: GetFleetLandingPage_fleetLandingPage_sections_featured2_image_file | null;
}

export interface GetFleetLandingPage_fleetLandingPage_sections_featured2 {
  title: string | null;
  titleTag: string | null;
  body: string | null;
  image: GetFleetLandingPage_fleetLandingPage_sections_featured2_image | null;
  video: string | null;
  layout: string[] | null;
}

export interface GetFleetLandingPage_fleetLandingPage_sections_featured3_image_file {
  url: string;
}

export interface GetFleetLandingPage_fleetLandingPage_sections_featured3_image {
  title: string | null;
  file: GetFleetLandingPage_fleetLandingPage_sections_featured3_image_file | null;
}

export interface GetFleetLandingPage_fleetLandingPage_sections_featured3 {
  title: string | null;
  titleTag: string | null;
  body: string | null;
  image: GetFleetLandingPage_fleetLandingPage_sections_featured3_image | null;
  video: string | null;
  layout: string[] | null;
}

export interface GetFleetLandingPage_fleetLandingPage_sections_featured4_image_file {
  url: string;
}

export interface GetFleetLandingPage_fleetLandingPage_sections_featured4_image {
  title: string | null;
  file: GetFleetLandingPage_fleetLandingPage_sections_featured4_image_file | null;
}

export interface GetFleetLandingPage_fleetLandingPage_sections_featured4 {
  title: string | null;
  titleTag: string | null;
  body: string | null;
  image: GetFleetLandingPage_fleetLandingPage_sections_featured4_image | null;
  video: string | null;
  layout: string[] | null;
}

export interface GetFleetLandingPage_fleetLandingPage_sections_leadText {
  heading: string | null;
  titleTag: string | null;
  description: string | null;
}

export interface GetFleetLandingPage_fleetLandingPage_sections_hero_image_file {
  url: string;
}

export interface GetFleetLandingPage_fleetLandingPage_sections_hero_image {
  title: string | null;
  description: string | null;
  file: GetFleetLandingPage_fleetLandingPage_sections_hero_image_file | null;
}

export interface GetFleetLandingPage_fleetLandingPage_sections_hero {
  flag: string | null;
  title: string | null;
  body: string | null;
  image: GetFleetLandingPage_fleetLandingPage_sections_hero_image | null;
}

export interface GetFleetLandingPage_fleetLandingPage_sections_tiles_tiles_image_file {
  url: string;
}

export interface GetFleetLandingPage_fleetLandingPage_sections_tiles_tiles_image {
  title: string | null;
  file: GetFleetLandingPage_fleetLandingPage_sections_tiles_tiles_image_file | null;
}

export interface GetFleetLandingPage_fleetLandingPage_sections_tiles_tiles {
  body: string | null;
  title: string | null;
  image: GetFleetLandingPage_fleetLandingPage_sections_tiles_tiles_image | null;
}

export interface GetFleetLandingPage_fleetLandingPage_sections_tiles {
  name: string;
  tiles: GetFleetLandingPage_fleetLandingPage_sections_tiles_tiles[] | null;
}

export interface GetFleetLandingPage_fleetLandingPage_sections {
  featured1: GetFleetLandingPage_fleetLandingPage_sections_featured1 | null;
  featured2: GetFleetLandingPage_fleetLandingPage_sections_featured2 | null;
  featured3: GetFleetLandingPage_fleetLandingPage_sections_featured3 | null;
  leadText: GetFleetLandingPage_fleetLandingPage_sections_leadText | null;
  hero: GetFleetLandingPage_fleetLandingPage_sections_hero | null;
  tiles: GetFleetLandingPage_fleetLandingPage_sections_tiles | null;
}

export interface GetFleetLandingPage_fleetLandingPage {
  id: string;
  sections: GetFleetLandingPage_fleetLandingPage_sections;
}

export interface GetFleetLandingPage {
  fleetLandingPage: GetFleetLandingPage_fleetLandingPage;
}
