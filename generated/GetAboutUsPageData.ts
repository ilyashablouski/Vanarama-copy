/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAboutUsPageData
// ====================================================

export interface GetAboutUsPageData_aboutUsLandingPage_metaData {
  name: string | null;
  body: string | null;
}

export interface GetAboutUsPageData_aboutUsLandingPage_sections_cards_cards {
  name: string | null;
  title: string | null;
  body: string | null;
}

export interface GetAboutUsPageData_aboutUsLandingPage_sections_cards {
  name: string | null;
  cards: GetAboutUsPageData_aboutUsLandingPage_sections_cards_cards[] | null;
}

export interface GetAboutUsPageData_aboutUsLandingPage_sections_carousel_cards {
  name: string | null;
  title: string | null;
  body: string | null;
}

export interface GetAboutUsPageData_aboutUsLandingPage_sections_carousel {
  name: string | null;
  cards: (GetAboutUsPageData_aboutUsLandingPage_sections_carousel_cards | null)[] | null;
}

export interface GetAboutUsPageData_aboutUsLandingPage_sections {
  cards: GetAboutUsPageData_aboutUsLandingPage_sections_cards | null;
  carousel: GetAboutUsPageData_aboutUsLandingPage_sections_carousel | null;
}

export interface GetAboutUsPageData_aboutUsLandingPage {
  metaData: GetAboutUsPageData_aboutUsLandingPage_metaData;
  sections: GetAboutUsPageData_aboutUsLandingPage_sections;
}

export interface GetAboutUsPageData {
  aboutUsLandingPage: GetAboutUsPageData_aboutUsLandingPage;
}
