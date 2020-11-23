/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ReviewsHubCategoryQuery
// ====================================================

export interface ReviewsHubCategoryQuery_genericPage_featuredImage_file {
  url: string;
  fileName: string;
  contentType: string;
}

export interface ReviewsHubCategoryQuery_genericPage_featuredImage {
  title: string | null;
  description: string | null;
  file: ReviewsHubCategoryQuery_genericPage_featuredImage_file | null;
}

export interface ReviewsHubCategoryQuery_genericPage_metaData {
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
  breadcrumbs: any | null;
}

export interface ReviewsHubCategoryQuery_genericPage_sections_cards_cards_link {
  text: string | null;
  url: string | null;
  legacyUrl: string | null;
}

export interface ReviewsHubCategoryQuery_genericPage_sections_cards_cards_image_file {
  url: string;
}

export interface ReviewsHubCategoryQuery_genericPage_sections_cards_cards_image {
  title: string | null;
  file: ReviewsHubCategoryQuery_genericPage_sections_cards_cards_image_file | null;
}

export interface ReviewsHubCategoryQuery_genericPage_sections_cards_cards {
  titleTag: string | null;
  name: string | null;
  title: string | null;
  body: string | null;
  reviewRating: string | null;
  link: ReviewsHubCategoryQuery_genericPage_sections_cards_cards_link | null;
  image: ReviewsHubCategoryQuery_genericPage_sections_cards_cards_image | null;
}

export interface ReviewsHubCategoryQuery_genericPage_sections_cards {
  name: string | null;
  description: string | null;
  cards: ReviewsHubCategoryQuery_genericPage_sections_cards_cards[] | null;
}

export interface ReviewsHubCategoryQuery_genericPage_sections {
  cards: ReviewsHubCategoryQuery_genericPage_sections_cards | null;
}

export interface ReviewsHubCategoryQuery_genericPage {
  id: string;
  intro: string | null;
  body: string | null;
  featuredImage: ReviewsHubCategoryQuery_genericPage_featuredImage | null;
  metaData: ReviewsHubCategoryQuery_genericPage_metaData;
  sections: ReviewsHubCategoryQuery_genericPage_sections | null;
}

export interface ReviewsHubCategoryQuery {
  genericPage: ReviewsHubCategoryQuery_genericPage;
}

export interface ReviewsHubCategoryQueryVariables {
  slug: string;
}
