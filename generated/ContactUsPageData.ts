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
}

export interface ContactUsPageData_contactUsLandingPage_sections_cards_cards {
  title: string | null;
  titleTag: string | null;
  body: string | null;
}

export interface ContactUsPageData_contactUsLandingPage_sections_cards {
  titleTag: string | null;
  cards: ContactUsPageData_contactUsLandingPage_sections_cards_cards[] | null;
}

export interface ContactUsPageData_contactUsLandingPage_sections_featured2 {
  title: string | null;
  body: string | null;
}

export interface ContactUsPageData_contactUsLandingPage_sections {
  featured1: ContactUsPageData_contactUsLandingPage_sections_featured1 | null;
  cards: ContactUsPageData_contactUsLandingPage_sections_cards | null;
  featured2: ContactUsPageData_contactUsLandingPage_sections_featured2 | null;
}

export interface ContactUsPageData_contactUsLandingPage {
  id: string;
  sections: ContactUsPageData_contactUsLandingPage_sections;
}

export interface ContactUsPageData {
  contactUsLandingPage: ContactUsPageData_contactUsLandingPage;
}
