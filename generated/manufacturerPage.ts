/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: manufacturerPage
// ====================================================

export interface manufacturerPage_manufacturerPage_metaData {
  pageType: string | null;
  slug: string | null;
  title: string | null;
  metaRobots: string | null;
  metaDescription: string | null;
  legacyUrl: string | null;
  publishedOn: any | null;
}

export interface manufacturerPage_manufacturerPage_sections_carousel_cards {
  name: string | null;
  title: string | null;
  body: string | null;
}

export interface manufacturerPage_manufacturerPage_sections_carousel {
  title: string | null;
  name: string | null;
  cards: (manufacturerPage_manufacturerPage_sections_carousel_cards | null)[] | null;
}

export interface manufacturerPage_manufacturerPage_sections_featured {
  body: string | null;
}

export interface manufacturerPage_manufacturerPage_sections_tiles_tiles {
  title: string | null;
  body: string | null;
}

export interface manufacturerPage_manufacturerPage_sections_tiles {
  name: string;
  tilesTitle: string | null;
  tiles: manufacturerPage_manufacturerPage_sections_tiles_tiles[] | null;
}

export interface manufacturerPage_manufacturerPage_sections {
  carousel: manufacturerPage_manufacturerPage_sections_carousel | null;
  featured: manufacturerPage_manufacturerPage_sections_featured | null;
  tiles: manufacturerPage_manufacturerPage_sections_tiles | null;
}

export interface manufacturerPage_manufacturerPage {
  metaData: manufacturerPage_manufacturerPage_metaData;
  sections: manufacturerPage_manufacturerPage_sections | null;
}

export interface manufacturerPage {
  manufacturerPage: manufacturerPage_manufacturerPage;
}
