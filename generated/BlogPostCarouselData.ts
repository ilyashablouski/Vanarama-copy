/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: BlogPostCarouselData
// ====================================================

export interface BlogPostCarouselData_blogPost_productFilter {
  title: string | null;
  manufacturer: (string | null)[] | null;
  range: (string | null)[] | null;
  bodyType: (string | null)[] | null;
  fuelType: (string | null)[] | null;
  transmission: (string | null)[] | null;
}

export interface BlogPostCarouselData_blogPost {
  carouselPosition: (string | null)[] | null;
  productFilter: BlogPostCarouselData_blogPost_productFilter | null;
}

export interface BlogPostCarouselData {
  blogPost: BlogPostCarouselData_blogPost;
}

export interface BlogPostCarouselDataVariables {
  slug: string;
  isPreview?: boolean | null;
}
