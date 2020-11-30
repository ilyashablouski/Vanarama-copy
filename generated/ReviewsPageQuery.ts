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
  breadcrumbs: any | null;
}

export interface ReviewsPageQuery_reviewsPage_featuredImage_file {
  url: string;
  fileName: string;
  contentType: string;
}

export interface ReviewsPageQuery_reviewsPage_featuredImage {
  title: string | null;
  description: string | null;
  file: ReviewsPageQuery_reviewsPage_featuredImage_file | null;
}

export interface ReviewsPageQuery_reviewsPage_sections_link {
  text: string | null;
  url: string | null;
  legacyUrl: string | null;
}

export interface ReviewsPageQuery_reviewsPage_sections_rowText_link {
  text: string | null;
  url: string | null;
  legacyUrl: string | null;
}

export interface ReviewsPageQuery_reviewsPage_sections_rowText {
  heading: string | null;
  titleTag: string | null;
  link: ReviewsPageQuery_reviewsPage_sections_rowText_link | null;
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
  link: ReviewsPageQuery_reviewsPage_sections_link | null;
  rowText: ReviewsPageQuery_reviewsPage_sections_rowText | null;
  vehicleReviewMedia: ReviewsPageQuery_reviewsPage_sections_vehicleReviewMedia | null;
  vehicleReview: ReviewsPageQuery_reviewsPage_sections_vehicleReview | null;
  reviews: ReviewsPageQuery_reviewsPage_sections_reviews | null;
}

export interface ReviewsPageQuery_reviewsPage {
  metaData: ReviewsPageQuery_reviewsPage_metaData;
  featuredImage: ReviewsPageQuery_reviewsPage_featuredImage | null;
  body: string | null;
  sections: ReviewsPageQuery_reviewsPage_sections | null;
}

export interface ReviewsPageQuery {
  reviewsPage: ReviewsPageQuery_reviewsPage;
}

export interface ReviewsPageQueryVariables {
  slug: string;
}
