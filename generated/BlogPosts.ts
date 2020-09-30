/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: BlogPosts
// ====================================================

export interface BlogPosts_blogPosts_metaData {
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

export interface BlogPosts_blogPosts_sections_leadText {
  titleTag: string | null;
  heading: string | null;
  description: string | null;
  position: number | null;
}

export interface BlogPosts_blogPosts_sections_cards_cards_image_file {
  url: string;
  fileName: string;
}

export interface BlogPosts_blogPosts_sections_cards_cards_image {
  title: string | null;
  description: string | null;
  file: BlogPosts_blogPosts_sections_cards_cards_image_file | null;
}

export interface BlogPosts_blogPosts_sections_cards_cards_link {
  text: string | null;
  url: string | null;
}

export interface BlogPosts_blogPosts_sections_cards_cards {
  title: string | null;
  name: string | null;
  image: BlogPosts_blogPosts_sections_cards_cards_image | null;
  body: string | null;
  titleTag: string | null;
  link: BlogPosts_blogPosts_sections_cards_cards_link | null;
}

export interface BlogPosts_blogPosts_sections_cards {
  position: number | null;
  name: string | null;
  titleTag: string | null;
  description: string | null;
  title: string | null;
  cards: BlogPosts_blogPosts_sections_cards_cards[] | null;
}

export interface BlogPosts_blogPosts_sections_hero_image_file {
  url: string;
  fileName: string;
  contentType: string;
}

export interface BlogPosts_blogPosts_sections_hero_image {
  title: string | null;
  description: string | null;
  file: BlogPosts_blogPosts_sections_hero_image_file | null;
}

export interface BlogPosts_blogPosts_sections_hero_heroCard {
  title: string | null;
  body: string | null;
}

export interface BlogPosts_blogPosts_sections_hero {
  position: number | null;
  flag: string | null;
  title: string | null;
  titleTag: string | null;
  body: string | null;
  image: BlogPosts_blogPosts_sections_hero_image | null;
  heroCard: (BlogPosts_blogPosts_sections_hero_heroCard | null)[] | null;
}

export interface BlogPosts_blogPosts_sections_featured_link {
  text: string | null;
  url: string | null;
}

export interface BlogPosts_blogPosts_sections_featured_image_file_details_image {
  width: number;
  height: number;
}

export interface BlogPosts_blogPosts_sections_featured_image_file_details {
  size: number;
  image: BlogPosts_blogPosts_sections_featured_image_file_details_image;
}

export interface BlogPosts_blogPosts_sections_featured_image_file {
  url: string;
  fileName: string;
  contentType: string;
  details: BlogPosts_blogPosts_sections_featured_image_file_details;
}

export interface BlogPosts_blogPosts_sections_featured_image {
  title: string | null;
  description: string | null;
  file: BlogPosts_blogPosts_sections_featured_image_file | null;
}

export interface BlogPosts_blogPosts_sections_featured {
  layout: (string | null)[] | null;
  body: string | null;
  title: string | null;
  titleTag: string | null;
  video: string | null;
  link: BlogPosts_blogPosts_sections_featured_link | null;
  image: BlogPosts_blogPosts_sections_featured_image | null;
}

export interface BlogPosts_blogPosts_sections_carousel_cards_image_file {
  url: string;
  fileName: string;
}

export interface BlogPosts_blogPosts_sections_carousel_cards_image {
  title: string | null;
  description: string | null;
  file: BlogPosts_blogPosts_sections_carousel_cards_image_file | null;
}

export interface BlogPosts_blogPosts_sections_carousel_cards_link {
  text: string | null;
  url: string | null;
}

export interface BlogPosts_blogPosts_sections_carousel_cards {
  name: string | null;
  title: string | null;
  image: BlogPosts_blogPosts_sections_carousel_cards_image | null;
  body: string | null;
  link: BlogPosts_blogPosts_sections_carousel_cards_link | null;
}

export interface BlogPosts_blogPosts_sections_carousel {
  title: string | null;
  name: string | null;
  cards: (BlogPosts_blogPosts_sections_carousel_cards | null)[] | null;
}

export interface BlogPosts_blogPosts_sections_tiles_tiles_image_file {
  url: string;
  fileName: string;
  contentType: string;
}

export interface BlogPosts_blogPosts_sections_tiles_tiles_image {
  title: string | null;
  description: string | null;
  file: BlogPosts_blogPosts_sections_tiles_tiles_image_file | null;
}

export interface BlogPosts_blogPosts_sections_tiles_tiles {
  body: string | null;
  title: string | null;
  link: string | null;
  image: BlogPosts_blogPosts_sections_tiles_tiles_image | null;
}

export interface BlogPosts_blogPosts_sections_tiles {
  position: number | null;
  name: string | null;
  tilesTitle: string | null;
  titleTag: string | null;
  tiles: BlogPosts_blogPosts_sections_tiles_tiles[] | null;
}

export interface BlogPosts_blogPosts_sections {
  leadText: BlogPosts_blogPosts_sections_leadText | null;
  cards: BlogPosts_blogPosts_sections_cards | null;
  hero: BlogPosts_blogPosts_sections_hero | null;
  featured: BlogPosts_blogPosts_sections_featured | null;
  carousel: BlogPosts_blogPosts_sections_carousel | null;
  tiles: BlogPosts_blogPosts_sections_tiles | null;
}

export interface BlogPosts_blogPosts_articles {
  intro: string | null;
  tags: (string | null)[] | null;
  slug: string | null;
  body: string | null;
}

export interface BlogPosts_blogPosts {
  metaData: BlogPosts_blogPosts_metaData;
  sections: BlogPosts_blogPosts_sections | null;
  pageTitle: string | null;
  articles: (BlogPosts_blogPosts_articles | null)[] | null;
}

export interface BlogPosts {
  blogPosts: BlogPosts_blogPosts;
}

export interface BlogPostsVariables {
  slug: string;
}
