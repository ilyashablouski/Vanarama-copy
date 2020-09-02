/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ReviewsPageQuery
// ====================================================

export interface ReviewsPageQuery_reviewsPage_metaData {
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

export interface ReviewsPageQuery_reviewsPage_sections_vehicleReviewMedia_reviewPhoto_file {
  url: string;
}

export interface ReviewsPageQuery_reviewsPage_sections_vehicleReviewMedia_reviewPhoto {
  file: ReviewsPageQuery_reviewsPage_sections_vehicleReviewMedia_reviewPhoto_file | null;
}

export interface ReviewsPageQuery_reviewsPage_sections_vehicleReviewMedia {
  reviewVideo: string | null;
  reviewPhoto: ReviewsPageQuery_reviewsPage_sections_vehicleReviewMedia_reviewPhoto | null;
}

export interface ReviewsPageQuery_reviewsPage_sections_vehicleReview_author_avatar_file {
  url: string;
}

export interface ReviewsPageQuery_reviewsPage_sections_vehicleReview_author_avatar {
  file: ReviewsPageQuery_reviewsPage_sections_vehicleReview_author_avatar_file | null;
}

export interface ReviewsPageQuery_reviewsPage_sections_vehicleReview_author {
  name: string | null;
  avatar: ReviewsPageQuery_reviewsPage_sections_vehicleReview_author_avatar | null;
}

export interface ReviewsPageQuery_reviewsPage_sections_vehicleReview {
  reviewType: string | null;
  rating: string | null;
  summary: string | null;
  author: (ReviewsPageQuery_reviewsPage_sections_vehicleReview_author | null)[] | null;
}

export interface ReviewsPageQuery_reviewsPage_sections_reviews_reviews {
  reviewType: string | null;
  rating: string | null;
  summary: string | null;
  customerName: string | null;
}

export interface ReviewsPageQuery_reviewsPage_sections_reviews {
  reviews: (ReviewsPageQuery_reviewsPage_sections_reviews_reviews | null)[] | null;
}

export interface ReviewsPageQuery_reviewsPage_sections {
  vehicleReviewMedia: ReviewsPageQuery_reviewsPage_sections_vehicleReviewMedia | null;
  vehicleReview: ReviewsPageQuery_reviewsPage_sections_vehicleReview | null;
  reviews: ReviewsPageQuery_reviewsPage_sections_reviews | null;
}

export interface ReviewsPageQuery_reviewsPage {
  metaData: ReviewsPageQuery_reviewsPage_metaData;
  body: string | null;
  sections: ReviewsPageQuery_reviewsPage_sections | null;
}

export interface ReviewsPageQuery {
  reviewsPage: ReviewsPageQuery_reviewsPage;
}

export interface ReviewsPageQueryVariables {
  slug: string;
}
