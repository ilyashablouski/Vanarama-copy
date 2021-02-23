/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetFleetLandingPage
// ====================================================

export interface GetFleetLandingPage_fleetLandingPage_metaData {
  title: string | null;
  name: string | null;
  metaRobots: string | null;
  metaDescription: string | null;
  legacyUrl: string | null;
  pageType: string | null;
  canonicalUrl: string | null;
  slug: string | null;
  schema: any | null;
  publishedOn: any | null;
  breadcrumbs: any | null;
}

export interface GetFleetLandingPage_fleetLandingPage_featuredImage_file {
  url: string;
}

export interface GetFleetLandingPage_fleetLandingPage_featuredImage {
  file: GetFleetLandingPage_fleetLandingPage_featuredImage_file | null;
}

export interface GetFleetLandingPage_fleetLandingPage_sections_featured1_testimonials {
  customerName: string | null;
  summary: string | null;
  rating: string | null;
}

export interface GetFleetLandingPage_fleetLandingPage_sections_featured1 {
  title: string | null;
  titleTag: string | null;
  body: string | null;
  layout: (string | null)[] | null;
  testimonials: (GetFleetLandingPage_fleetLandingPage_sections_featured1_testimonials | null)[] | null;
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
  layout: (string | null)[] | null;
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
  layout: (string | null)[] | null;
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
  layout: (string | null)[] | null;
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

export interface GetFleetLandingPage_fleetLandingPage_sections_hero_heroLabel_link {
  text: string | null;
  url: string | null;
}

export interface GetFleetLandingPage_fleetLandingPage_sections_hero_heroLabel {
  text: string | null;
  visible: boolean | null;
  link: GetFleetLandingPage_fleetLandingPage_sections_hero_heroLabel_link | null;
}

export interface GetFleetLandingPage_fleetLandingPage_sections_hero {
  title: string | null;
  body: string | null;
  image: GetFleetLandingPage_fleetLandingPage_sections_hero_image | null;
  heroLabel: (GetFleetLandingPage_fleetLandingPage_sections_hero_heroLabel | null)[] | null;
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
  name: string | null;
  tiles: GetFleetLandingPage_fleetLandingPage_sections_tiles_tiles[] | null;
}

export interface GetFleetLandingPage_fleetLandingPage_sections {
  featured1: GetFleetLandingPage_fleetLandingPage_sections_featured1 | null;
  featured2: GetFleetLandingPage_fleetLandingPage_sections_featured2 | null;
  featured3: GetFleetLandingPage_fleetLandingPage_sections_featured3 | null;
  featured4: GetFleetLandingPage_fleetLandingPage_sections_featured4 | null;
  leadText: GetFleetLandingPage_fleetLandingPage_sections_leadText | null;
  hero: GetFleetLandingPage_fleetLandingPage_sections_hero | null;
  tiles: GetFleetLandingPage_fleetLandingPage_sections_tiles | null;
}

export interface GetFleetLandingPage_fleetLandingPage {
  id: string;
  metaData: GetFleetLandingPage_fleetLandingPage_metaData;
  featuredImage: GetFleetLandingPage_fleetLandingPage_featuredImage | null;
  sections: GetFleetLandingPage_fleetLandingPage_sections | null;
}

export interface GetFleetLandingPage {
  fleetLandingPage: GetFleetLandingPage_fleetLandingPage;
}
