/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: HomePageData
// ====================================================

export interface HomePageData_homePage_metaData_featuredImage_file {
  url: string;
}

export interface HomePageData_homePage_metaData_featuredImage {
  file: HomePageData_homePage_metaData_featuredImage_file | null;
}

export interface HomePageData_homePage_metaData {
  title: string | null;
  metaDescription: string | null;
  legacyUrl: string | null;
  featuredImage: HomePageData_homePage_metaData_featuredImage | null;
}

export interface HomePageData_homePage_sections_hero_image_file {
  url: string;
}

export interface HomePageData_homePage_sections_hero_image {
  title: string | null;
  file: HomePageData_homePage_sections_hero_image_file | null;
}

export interface HomePageData_homePage_sections_hero {
  title: string | null;
  titleTag: string | null;
  body: string | null;
  image: HomePageData_homePage_sections_hero_image | null;
}

export interface HomePageData_homePage_sections_leadText {
  heading: string | null;
  titleTag: string | null;
  description: string | null;
}

export interface HomePageData_homePage_sections_cards_cards_image_file {
  url: string;
}

export interface HomePageData_homePage_sections_cards_cards_image {
  file: HomePageData_homePage_sections_cards_cards_image_file | null;
}

export interface HomePageData_homePage_sections_cards_cards_link {
  url: string | null;
  text: string | null;
}

export interface HomePageData_homePage_sections_cards_cards {
  title: string | null;
  titleTag: string | null;
  body: string | null;
  image: HomePageData_homePage_sections_cards_cards_image | null;
  link: HomePageData_homePage_sections_cards_cards_link | null;
}

export interface HomePageData_homePage_sections_cards {
  name: string | null;
  cards: HomePageData_homePage_sections_cards_cards[] | null;
}

export interface HomePageData_homePage_sections_featured1 {
  title: string | null;
  titleTag: string | null;
  body: string | null;
}

export interface HomePageData_homePage_sections_featured2 {
  title: string | null;
  titleTag: string | null;
  body: string | null;
}

export interface HomePageData_homePage_sections_tiles_tiles_image_file {
  url: string;
}

export interface HomePageData_homePage_sections_tiles_tiles_image {
  file: HomePageData_homePage_sections_tiles_tiles_image_file | null;
  title: string | null;
}

export interface HomePageData_homePage_sections_tiles_tiles {
  title: string | null;
  link: string | null;
  body: string | null;
  image: HomePageData_homePage_sections_tiles_tiles_image | null;
}

export interface HomePageData_homePage_sections_tiles {
  name: string;
  titleTag: string | null;
  tilesTitle: string | null;
  tiles: HomePageData_homePage_sections_tiles_tiles[] | null;
}

export interface HomePageData_homePage_sections {
  hero: HomePageData_homePage_sections_hero | null;
  leadText: HomePageData_homePage_sections_leadText | null;
  cards: HomePageData_homePage_sections_cards | null;
  featured1: HomePageData_homePage_sections_featured1 | null;
  featured2: HomePageData_homePage_sections_featured2 | null;
  tiles: HomePageData_homePage_sections_tiles | null;
}

export interface HomePageData_homePage {
  id: string;
  metaData: HomePageData_homePage_metaData;
  sections: HomePageData_homePage_sections;
}

export interface HomePageData {
  homePage: HomePageData_homePage;
}
