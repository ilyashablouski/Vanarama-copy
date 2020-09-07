/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: LocationsPageData
// ====================================================

export interface LocationsPageData_regionalOfficesPage_metaData {
  title: string | null;
  name: string | null;
  metaRobots: string | null;
  metaDescription: string | null;
  publishedOn: any | null;
  legacyUrl: string | null;
  pageType: string | null;
  canonicalUrl: string | null;
  slug: string | null;
  schema: any | null;
}

export interface LocationsPageData_regionalOfficesPage_featuredImage_file {
  url: string;
  fileName: string;
  contentType: string;
}

export interface LocationsPageData_regionalOfficesPage_featuredImage {
  title: string | null;
  description: string | null;
  file: LocationsPageData_regionalOfficesPage_featuredImage_file | null;
}

export interface LocationsPageData_regionalOfficesPage_sections_cards_cards_image_file {
  url: string;
  fileName: string;
}

export interface LocationsPageData_regionalOfficesPage_sections_cards_cards_image {
  title: string | null;
  description: string | null;
  file: LocationsPageData_regionalOfficesPage_sections_cards_cards_image_file | null;
}

export interface LocationsPageData_regionalOfficesPage_sections_cards_cards_link {
  text: string | null;
  url: string | null;
}

export interface LocationsPageData_regionalOfficesPage_sections_cards_cards {
  title: string | null;
  name: string | null;
  image: LocationsPageData_regionalOfficesPage_sections_cards_cards_image | null;
  body: string | null;
  titleTag: string | null;
  link: LocationsPageData_regionalOfficesPage_sections_cards_cards_link | null;
}

export interface LocationsPageData_regionalOfficesPage_sections_cards {
  position: number | null;
  name: string | null;
  titleTag: string | null;
  description: string | null;
  title: string | null;
  cards: LocationsPageData_regionalOfficesPage_sections_cards_cards[] | null;
}

export interface LocationsPageData_regionalOfficesPage_sections {
  cards: LocationsPageData_regionalOfficesPage_sections_cards | null;
}

export interface LocationsPageData_regionalOfficesPage {
  id: string;
  metaData: LocationsPageData_regionalOfficesPage_metaData;
  body: string | null;
  intro: string | null;
  featuredImage: LocationsPageData_regionalOfficesPage_featuredImage | null;
  sections: LocationsPageData_regionalOfficesPage_sections | null;
}

export interface LocationsPageData {
  regionalOfficesPage: LocationsPageData_regionalOfficesPage;
}
