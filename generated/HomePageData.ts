/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: HomePageData
// ====================================================

export interface HomePageData_homePage_sections_hero_image_file {
  url: string;
}

export interface HomePageData_homePage_sections_hero_image {
  title: string;
  file: HomePageData_homePage_sections_hero_image_file;
}

export interface HomePageData_homePage_sections_hero {
  title: string;
  flag: string;
  body: string;
  image: HomePageData_homePage_sections_hero_image;
}

export interface HomePageData_homePage_sections_cards_cards_image_file {
  url: string;
}

export interface HomePageData_homePage_sections_cards_cards_image {
  file: HomePageData_homePage_sections_cards_cards_image_file;
}

export interface HomePageData_homePage_sections_cards_cards {
  title: string;
  body: string;
  image: HomePageData_homePage_sections_cards_cards_image | null;
}

export interface HomePageData_homePage_sections_cards {
  name: string;
  cards: HomePageData_homePage_sections_cards_cards[] | null;
}

export interface HomePageData_homePage_sections_featured1 {
  title: string;
  body: string;
}

export interface HomePageData_homePage_sections_featured2 {
  title: string;
  body: string;
}

export interface HomePageData_homePage_sections_tiles_tiles_image_file {
  url: string;
}

export interface HomePageData_homePage_sections_tiles_tiles_image {
  file: HomePageData_homePage_sections_tiles_tiles_image_file;
  title: string;
}

export interface HomePageData_homePage_sections_tiles_tiles {
  title: string;
  body: string;
  image: HomePageData_homePage_sections_tiles_tiles_image | null;
}

export interface HomePageData_homePage_sections_tiles {
  name: string;
  tiles: HomePageData_homePage_sections_tiles_tiles[] | null;
}

export interface HomePageData_homePage_sections {
  hero: HomePageData_homePage_sections_hero;
  cards: HomePageData_homePage_sections_cards;
  featured1: HomePageData_homePage_sections_featured1;
  featured2: HomePageData_homePage_sections_featured2;
  tiles: HomePageData_homePage_sections_tiles;
}

export interface HomePageData_homePage {
  sections: HomePageData_homePage_sections;
}

export interface HomePageData {
  homePage: HomePageData_homePage;
}
