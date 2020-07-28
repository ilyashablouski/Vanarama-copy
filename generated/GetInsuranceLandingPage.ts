/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetInsuranceLandingPage
// ====================================================

export interface GetInsuranceLandingPage_insuranceLandingPage_sections_featured1_image_file {
  url: string;
}

export interface GetInsuranceLandingPage_insuranceLandingPage_sections_featured1_image {
  title: string | null;
  file: GetInsuranceLandingPage_insuranceLandingPage_sections_featured1_image_file | null;
}

export interface GetInsuranceLandingPage_insuranceLandingPage_sections_featured1 {
  title: string | null;
  titleTag: string | null;
  body: string | null;
  layout: string[] | null;
  image: GetInsuranceLandingPage_insuranceLandingPage_sections_featured1_image | null;
}

export interface GetInsuranceLandingPage_insuranceLandingPage_sections_featured2_image_file {
  url: string;
}

export interface GetInsuranceLandingPage_insuranceLandingPage_sections_featured2_image {
  title: string | null;
  file: GetInsuranceLandingPage_insuranceLandingPage_sections_featured2_image_file | null;
}

export interface GetInsuranceLandingPage_insuranceLandingPage_sections_featured2 {
  title: string | null;
  titleTag: string | null;
  body: string | null;
  image: GetInsuranceLandingPage_insuranceLandingPage_sections_featured2_image | null;
  layout: string[] | null;
}

export interface GetInsuranceLandingPage_insuranceLandingPage_sections_cards_cards_link {
  text: string | null;
  url: string | null;
}

export interface GetInsuranceLandingPage_insuranceLandingPage_sections_cards_cards_image_file {
  url: string;
}

export interface GetInsuranceLandingPage_insuranceLandingPage_sections_cards_cards_image {
  title: string | null;
  file: GetInsuranceLandingPage_insuranceLandingPage_sections_cards_cards_image_file | null;
}

export interface GetInsuranceLandingPage_insuranceLandingPage_sections_cards_cards {
  titleTag: string | null;
  name: string | null;
  title: string | null;
  body: string | null;
  link: GetInsuranceLandingPage_insuranceLandingPage_sections_cards_cards_link | null;
  image: GetInsuranceLandingPage_insuranceLandingPage_sections_cards_cards_image | null;
}

export interface GetInsuranceLandingPage_insuranceLandingPage_sections_cards {
  name: string | null;
  description: string | null;
  cards: GetInsuranceLandingPage_insuranceLandingPage_sections_cards_cards[] | null;
}

export interface GetInsuranceLandingPage_insuranceLandingPage_sections_carousel_cards {
  titleTag: string | null;
  name: string | null;
  title: string | null;
  body: string | null;
}

export interface GetInsuranceLandingPage_insuranceLandingPage_sections_carousel {
  name: string | null;
  cards: (GetInsuranceLandingPage_insuranceLandingPage_sections_carousel_cards | null)[] | null;
}

export interface GetInsuranceLandingPage_insuranceLandingPage_sections_leadText {
  heading: string | null;
  titleTag: string | null;
  description: string | null;
}

export interface GetInsuranceLandingPage_insuranceLandingPage_sections_hero_heroCard {
  title: string | null;
  body: string | null;
}

export interface GetInsuranceLandingPage_insuranceLandingPage_sections_hero {
  title: string | null;
  body: string | null;
  heroCard: (GetInsuranceLandingPage_insuranceLandingPage_sections_hero_heroCard | null)[] | null;
}

export interface GetInsuranceLandingPage_insuranceLandingPage_sections {
  featured1: GetInsuranceLandingPage_insuranceLandingPage_sections_featured1 | null;
  featured2: GetInsuranceLandingPage_insuranceLandingPage_sections_featured2 | null;
  cards: GetInsuranceLandingPage_insuranceLandingPage_sections_cards | null;
  carousel: GetInsuranceLandingPage_insuranceLandingPage_sections_carousel | null;
  leadText: GetInsuranceLandingPage_insuranceLandingPage_sections_leadText | null;
  hero: GetInsuranceLandingPage_insuranceLandingPage_sections_hero | null;
}

export interface GetInsuranceLandingPage_insuranceLandingPage {
  id: string;
  body: string | null;
  sections: GetInsuranceLandingPage_insuranceLandingPage_sections;
}

export interface GetInsuranceLandingPage {
  insuranceLandingPage: GetInsuranceLandingPage_insuranceLandingPage;
}
