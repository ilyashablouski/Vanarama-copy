/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: HubPageData
// ====================================================

export interface HubPageData_homePage_sections_hero_image_file {
  url: string;
}

export interface HubPageData_homePage_sections_hero_image {
  title: string;
  file: HubPageData_homePage_sections_hero_image_file;
}

export interface HubPageData_homePage_sections_hero {
  title: string;
  body: string;
  image: HubPageData_homePage_sections_hero_image;
}

export interface HubPageData_homePage_sections_leadText {
  heading: string;
  description: string;
}

export interface HubPageData_homePage_sections_featured1 {
  title: string;
  body: string;
}

export interface HubPageData_homePage_sections_featured2 {
  title: string;
  body: string;
}

export interface HubPageData_homePage_sections_tiles_tiles_image_file {
  url: string;
}

export interface HubPageData_homePage_sections_tiles_tiles_image {
  file: HubPageData_homePage_sections_tiles_tiles_image_file;
  title: string;
}

export interface HubPageData_homePage_sections_tiles_tiles {
  title: string;
  body: string;
  image: HubPageData_homePage_sections_tiles_tiles_image | null;
}

export interface HubPageData_homePage_sections_tiles {
  name: string;
  tiles: HubPageData_homePage_sections_tiles_tiles[] | null;
}

export interface HubPageData_homePage_sections {
  hero: HubPageData_homePage_sections_hero;
  leadText: HubPageData_homePage_sections_leadText;
  featured1: HubPageData_homePage_sections_featured1;
  featured2: HubPageData_homePage_sections_featured2;
  tiles: HubPageData_homePage_sections_tiles;
}

export interface HubPageData_homePage {
  sections: HubPageData_homePage_sections;
}

export interface HubPageData {
  homePage: HubPageData_homePage;
}
