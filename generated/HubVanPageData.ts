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
  title: string;
  file: HubVanPageData_hubVanPage_sections_hero_image_file;
}

export interface HubVanPageData_hubVanPage_sections_hero {
  title: string;
  body: string;
  image: HubVanPageData_hubVanPage_sections_hero_image;
}

export interface HubVanPageData_hubVanPage_sections_leadText {
  heading: string;
  description: string;
}

export interface HubVanPageData_hubVanPage_sections_featured1 {
  title: string;
  body: string;
}

export interface HubVanPageData_hubVanPage_sections_featured2 {
  title: string;
  body: string;
}

export interface HubVanPageData_hubVanPage_sections_tiles_tiles_image_file {
  url: string;
}

export interface HubVanPageData_hubVanPage_sections_tiles_tiles_image {
  file: HubVanPageData_hubVanPage_sections_tiles_tiles_image_file;
  title: string;
}

export interface HubVanPageData_hubVanPage_sections_tiles_tiles {
  title: string;
  body: string;
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
  tiles: HubVanPageData_hubVanPage_sections_tiles;
}

export interface HubVanPageData_hubVanPage {
  sections: HubVanPageData_hubVanPage_sections;
}

export interface HubVanPageData {
  hubVanPage: HubVanPageData_hubVanPage;
}
