/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: BlogPost
// ====================================================

export interface BlogPost_blogPost_metaData {
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

export interface BlogPost_blogPost_category {
  pageTitle: string | null;
  title: string | null;
  slug: string | null;
  metaDescription: string | null;
  canonicalUrl: string | null;
  legacyUrl: string | null;
}

export interface BlogPost_blogPost_featuredImage_file {
  url: string;
  fileName: string;
  contentType: string;
}

export interface BlogPost_blogPost_featuredImage {
  title: string | null;
  description: string | null;
  file: BlogPost_blogPost_featuredImage_file | null;
}

export interface BlogPost_blogPost {
  id: string;
  metaData: BlogPost_blogPost_metaData;
  category: (BlogPost_blogPost_category | null)[] | null;
  intro: string | null;
  body: string | null;
  featuredImage: BlogPost_blogPost_featuredImage | null;
}

export interface BlogPost {
  blogPost: BlogPost_blogPost | null;
}

export interface BlogPostVariables {
  slug: string;
}
