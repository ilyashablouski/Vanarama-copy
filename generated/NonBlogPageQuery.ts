/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: NonBlogPageQuery
// ====================================================

export interface NonBlogPageQuery_genericPage_featuredImage_file_details_image {
  width: number;
  height: number;
}

export interface NonBlogPageQuery_genericPage_featuredImage_file_details {
  image: NonBlogPageQuery_genericPage_featuredImage_file_details_image;
}

export interface NonBlogPageQuery_genericPage_featuredImage_file {
  url: string;
  details: NonBlogPageQuery_genericPage_featuredImage_file_details;
}

export interface NonBlogPageQuery_genericPage_featuredImage {
  file: NonBlogPageQuery_genericPage_featuredImage_file | null;
}

export interface NonBlogPageQuery_genericPage_metaData {
  pageType: string | null;
  slug: string | null;
  title: string | null;
  metaRobots: string | null;
  metaDescription: string | null;
  legacyUrl: string | null;
  publishedOn: any | null;
}

export interface NonBlogPageQuery_genericPage {
  id: string;
  intro: string | null;
  body: string | null;
  featuredImage: NonBlogPageQuery_genericPage_featuredImage | null;
  metaData: NonBlogPageQuery_genericPage_metaData;
}

export interface NonBlogPageQuery {
  genericPage: NonBlogPageQuery_genericPage;
}

export interface NonBlogPageQueryVariables {
  slug: string;
}
