/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.


// ====================================================
// GraphQL query operation: GetAboutUsPageData
// ====================================================


export interface GetAboutUsPageData_aboutUsLandingPage_metaData {
  title: string | null;
  name: string | null;
  metaRobots: string | null;
  metaDescription: string | null;
  legacyUrl: string | null;
  pageType: string | null;
  canonicalUrl: string | null;
  slug: string | null;
  schema: CustomJSON | null;
  publishedOn: CustomDateTime | null;
  breadcrumbs: CustomJSON | null;
}

export interface GetAboutUsPageData_aboutUsLandingPage_featuredImage_file {
  url: string;
}

export interface GetAboutUsPageData_aboutUsLandingPage_featuredImage {
  file: GetAboutUsPageData_aboutUsLandingPage_featuredImage_file | null;
}

export interface GetAboutUsPageData_aboutUsLandingPage_sections_rowText_rowTextLink {
  text: string | null;
  url: string | null;
}

export interface GetAboutUsPageData_aboutUsLandingPage_sections_rowText_link {
  text: string | null;
  url: string | null;
}

export interface GetAboutUsPageData_aboutUsLandingPage_sections_rowText {
  heading: string | null;
  subHeading: string | null;
  body: string | null;
  rowTextLink: GetAboutUsPageData_aboutUsLandingPage_sections_rowText_rowTextLink | null;
  link: GetAboutUsPageData_aboutUsLandingPage_sections_rowText_link | null;
}

export interface GetAboutUsPageData_aboutUsLandingPage_sections_cards_cards {
  titleTag: string | null;
  name: string | null;
  title: string | null;
  body: string | null;
}

export interface GetAboutUsPageData_aboutUsLandingPage_sections_cards {
  name: string | null;
  cards: GetAboutUsPageData_aboutUsLandingPage_sections_cards_cards[] | null;
}

export interface GetAboutUsPageData_aboutUsLandingPage_sections_carousel_cards {
  titleTag: string | null;
  name: string | null;
  title: string | null;
  body: string | null;
}

export interface GetAboutUsPageData_aboutUsLandingPage_sections_carousel {
  name: string | null;
  cards: (GetAboutUsPageData_aboutUsLandingPage_sections_carousel_cards | null)[] | null;
}

export interface GetAboutUsPageData_aboutUsLandingPage_sections {
  rowText: GetAboutUsPageData_aboutUsLandingPage_sections_rowText | null;
  cards: GetAboutUsPageData_aboutUsLandingPage_sections_cards | null;
  carousel: GetAboutUsPageData_aboutUsLandingPage_sections_carousel | null;
}

export interface GetAboutUsPageData_aboutUsLandingPage {
  id: string;
  body: string | null;
  metaData: GetAboutUsPageData_aboutUsLandingPage_metaData;
  featuredImage: GetAboutUsPageData_aboutUsLandingPage_featuredImage | null;
  sections: GetAboutUsPageData_aboutUsLandingPage_sections | null;
}

export interface GetAboutUsPageData {
  aboutUsLandingPage: GetAboutUsPageData_aboutUsLandingPage;
}

export interface GetAboutUsPageDataVariables {
  isPreview?: boolean | null;
}
