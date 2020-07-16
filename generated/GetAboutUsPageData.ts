/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAboutUsPageData
// ====================================================

export interface GetAboutUsPageData_aboutUsLandingPage_metaData {
  name: string | null;
}

export interface GetAboutUsPageData_aboutUsLandingPage_sections_accessories_accessories_image {
  title: string | null;
}

export interface GetAboutUsPageData_aboutUsLandingPage_sections_accessories_accessories {
  body: string | null;
  image: GetAboutUsPageData_aboutUsLandingPage_sections_accessories_accessories_image | null;
}

export interface GetAboutUsPageData_aboutUsLandingPage_sections_accessories {
  name: string;
  accessories: GetAboutUsPageData_aboutUsLandingPage_sections_accessories_accessories[] | null;
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
  accessories: GetAboutUsPageData_aboutUsLandingPage_sections_accessories | null;
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
