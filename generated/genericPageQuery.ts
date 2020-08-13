/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: genericPageQuery
// ====================================================

export interface genericPageQuery_genericPage_metaData {
  title: string | null;
  metaRobots: string | null;
  metaDescription: string | null;
  publishedOn: any | null;
  legacyUrl: string | null;
  pageType: string | null;
  canonicalUrl: string | null;
  slug: string | null;
  schema: any | null;
}

export interface genericPageQuery_genericPage_sections_carousel {
  title: string | null;
  name: string | null;
}

export interface genericPageQuery_genericPage_sections_tiles {
  position: number | null;
  name: string;
  tilesTitle: string | null;
  titleTag: string | null;
}

export interface genericPageQuery_genericPage_sections_cards_cards_image_file {
  url: string;
  fileName: string;
  contentType: string;
}

export interface genericPageQuery_genericPage_sections_cards_cards_image {
  title: string | null;
  description: string | null;
  file: genericPageQuery_genericPage_sections_cards_cards_image_file | null;
}

export interface genericPageQuery_genericPage_sections_cards_cards_link {
  text: string | null;
  url: string | null;
}

export interface genericPageQuery_genericPage_sections_cards_cards {
  title: string | null;
  name: string | null;
  image: genericPageQuery_genericPage_sections_cards_cards_image | null;
  body: string | null;
  titleTag: string | null;
  link: genericPageQuery_genericPage_sections_cards_cards_link | null;
}

export interface genericPageQuery_genericPage_sections_cards {
  position: number | null;
  name: string | null;
  titleTag: string | null;
  description: string | null;
  cards: genericPageQuery_genericPage_sections_cards_cards[] | null;
}

export interface genericPageQuery_genericPage_sections {
  carousel: genericPageQuery_genericPage_sections_carousel | null;
  tiles: genericPageQuery_genericPage_sections_tiles | null;
  cards: genericPageQuery_genericPage_sections_cards | null;
}

export interface genericPageQuery_genericPage_featuredImage_file {
  url: string;
  fileName: string;
  contentType: string;
}

export interface genericPageQuery_genericPage_featuredImage {
  title: string | null;
  description: string | null;
  file: genericPageQuery_genericPage_featuredImage_file | null;
}

export interface genericPageQuery_genericPage {
  id: string;
  metaData: genericPageQuery_genericPage_metaData;
  sections: genericPageQuery_genericPage_sections | null;
  intro: string | null;
  body: string | null;
  featuredImage: genericPageQuery_genericPage_featuredImage | null;
}

export interface genericPageQuery {
  genericPage: genericPageQuery_genericPage;
}

export interface genericPageQueryVariables {
  slug: string;
}
