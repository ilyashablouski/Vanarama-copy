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

export interface BlogPost_blogPost_featuredImage_file {
  url: string;
  fileName: string;
  contentType: string;
}

export interface BlogPost_blogPost_featuredImage {
  title: string | null;
  file: BlogPost_blogPost_featuredImage_file | null;
}

export interface BlogPost_blogPost_sections_leadText {
  titleTag: string | null;
  heading: string | null;
  description: string | null;
  position: number | null;
}

export interface BlogPost_blogPost_sections_cards_cards_image_file {
  url: string;
  fileName: string;
}

export interface BlogPost_blogPost_sections_cards_cards_image {
  title: string | null;
  description: string | null;
  file: BlogPost_blogPost_sections_cards_cards_image_file | null;
}

export interface BlogPost_blogPost_sections_cards_cards_link {
  text: string | null;
  url: string | null;
}

export interface BlogPost_blogPost_sections_cards_cards {
  title: string | null;
  name: string | null;
  image: BlogPost_blogPost_sections_cards_cards_image | null;
  body: string | null;
  titleTag: string | null;
  link: BlogPost_blogPost_sections_cards_cards_link | null;
}

export interface BlogPost_blogPost_sections_cards {
  position: number | null;
  name: string | null;
  titleTag: string | null;
  description: string | null;
  title: string | null;
  cards: BlogPost_blogPost_sections_cards_cards[] | null;
}

export interface BlogPost_blogPost_sections_hero_image_file {
  url: string;
  fileName: string;
  contentType: string;
}

export interface BlogPost_blogPost_sections_hero_image {
  title: string | null;
  description: string | null;
  file: BlogPost_blogPost_sections_hero_image_file | null;
}

export interface BlogPost_blogPost_sections_hero_heroCard {
  title: string | null;
  body: string | null;
}

export interface BlogPost_blogPost_sections_hero {
  position: number | null;
  flag: string | null;
  title: string | null;
  titleTag: string | null;
  body: string | null;
  image: BlogPost_blogPost_sections_hero_image | null;
  heroCard: (BlogPost_blogPost_sections_hero_heroCard | null)[] | null;
}

export interface BlogPost_blogPost_sections_featured_link {
  text: string | null;
  url: string | null;
}

export interface BlogPost_blogPost_sections_featured_image_file_details_image {
  width: number;
  height: number;
}

export interface BlogPost_blogPost_sections_featured_image_file_details {
  size: number;
  image: BlogPost_blogPost_sections_featured_image_file_details_image;
}

export interface BlogPost_blogPost_sections_featured_image_file {
  url: string;
  fileName: string;
  contentType: string;
  details: BlogPost_blogPost_sections_featured_image_file_details;
}

export interface BlogPost_blogPost_sections_featured_image {
  title: string | null;
  description: string | null;
  file: BlogPost_blogPost_sections_featured_image_file | null;
}

export interface BlogPost_blogPost_sections_featured {
  layout: (string | null)[] | null;
  body: string | null;
  title: string | null;
  titleTag: string | null;
  video: string | null;
  link: BlogPost_blogPost_sections_featured_link | null;
  image: BlogPost_blogPost_sections_featured_image | null;
}

export interface BlogPost_blogPost_sections_carousel_cards_image_file {
  url: string;
  fileName: string;
}

export interface BlogPost_blogPost_sections_carousel_cards_image {
  title: string | null;
  description: string | null;
  file: BlogPost_blogPost_sections_carousel_cards_image_file | null;
}

export interface BlogPost_blogPost_sections_carousel_cards_link {
  text: string | null;
  url: string | null;
}

export interface BlogPost_blogPost_sections_carousel_cards {
  name: string | null;
  title: string | null;
  image: BlogPost_blogPost_sections_carousel_cards_image | null;
  body: string | null;
  link: BlogPost_blogPost_sections_carousel_cards_link | null;
}

export interface BlogPost_blogPost_sections_carousel {
  title: string | null;
  name: string | null;
  cards: (BlogPost_blogPost_sections_carousel_cards | null)[] | null;
}

export interface BlogPost_blogPost_sections_tiles_tiles_image_file {
  url: string;
  fileName: string;
  contentType: string;
}

export interface BlogPost_blogPost_sections_tiles_tiles_image {
  title: string | null;
  description: string | null;
  file: BlogPost_blogPost_sections_tiles_tiles_image_file | null;
}

export interface BlogPost_blogPost_sections_tiles_tiles {
  body: string | null;
  title: string | null;
  link: string | null;
  image: BlogPost_blogPost_sections_tiles_tiles_image | null;
}

export interface BlogPost_blogPost_sections_tiles {
  position: number | null;
  name: string | null;
  tilesTitle: string | null;
  titleTag: string | null;
  tiles: BlogPost_blogPost_sections_tiles_tiles[] | null;
}

export interface BlogPost_blogPost_sections {
  leadText: BlogPost_blogPost_sections_leadText | null;
  cards: BlogPost_blogPost_sections_cards | null;
  hero: BlogPost_blogPost_sections_hero | null;
  featured: BlogPost_blogPost_sections_featured | null;
  carousel: BlogPost_blogPost_sections_carousel | null;
  tiles: BlogPost_blogPost_sections_tiles | null;
}

export interface BlogPost_blogPost {
  metaData: BlogPost_blogPost_metaData;
  featuredImage: BlogPost_blogPost_featuredImage | null;
  sections: BlogPost_blogPost_sections | null;
  body: string | null;
  isFeatured: boolean | null;
  pinned: boolean | null;
  tags: (string | null)[] | null;
}

export interface BlogPost {
  blogPost: BlogPost_blogPost;
}

export interface BlogPostVariables {
  slug: string;
}
