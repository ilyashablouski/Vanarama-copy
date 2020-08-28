/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ContactUsPageData
// ====================================================

export interface ContactUsPageData_contactUsLandingPage_sections_featured1 {
  title: string | null;
  body: string | null;
  layout: (string | null)[] | null;
}

export interface ContactUsPageData_contactUsLandingPage_sections_cards_cards {
  title: string | null;
  titleTag: string | null;
  body: string | null;
}

export interface ContactUsPageData_contactUsLandingPage_sections_cards {
  cards: ContactUsPageData_contactUsLandingPage_sections_cards_cards[] | null;
}

export interface ContactUsPageData_contactUsLandingPage_sections_featured2_cards_image_file {
  url: string;
}

export interface ContactUsPageData_contactUsLandingPage_sections_featured2_cards_image {
  file: ContactUsPageData_contactUsLandingPage_sections_featured2_cards_image_file | null;
}

export interface ContactUsPageData_contactUsLandingPage_sections_featured2_cards_link {
  url: string | null;
  text: string | null;
}

export interface ContactUsPageData_contactUsLandingPage_sections_featured2_cards {
  title: string | null;
  body: string | null;
  image: ContactUsPageData_contactUsLandingPage_sections_featured2_cards_image | null;
  link: ContactUsPageData_contactUsLandingPage_sections_featured2_cards_link | null;
}

export interface ContactUsPageData_contactUsLandingPage_sections_featured2 {
  title: string | null;
  body: string | null;
  cards: (ContactUsPageData_contactUsLandingPage_sections_featured2_cards | null)[] | null;
}

export interface ContactUsPageData_contactUsLandingPage_sections {
  featured1: ContactUsPageData_contactUsLandingPage_sections_featured1 | null;
  cards: ContactUsPageData_contactUsLandingPage_sections_cards | null;
  featured2: ContactUsPageData_contactUsLandingPage_sections_featured2 | null;
}

export interface ContactUsPageData_contactUsLandingPage {
  id: string;
  sections: ContactUsPageData_contactUsLandingPage_sections | null;
}

export interface ContactUsPageData {
  contactUsLandingPage: ContactUsPageData_contactUsLandingPage;
}
