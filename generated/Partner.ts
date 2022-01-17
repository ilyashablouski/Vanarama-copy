/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Partner
// ====================================================

export interface Partner_partner_logo_file_details_image {
  width: number;
  height: number;
}

export interface Partner_partner_logo_file_details {
  image: Partner_partner_logo_file_details_image;
}

export interface Partner_partner_logo_file {
  url: string;
  details: Partner_partner_logo_file_details;
}

export interface Partner_partner_logo {
  title: string | null;
  file: Partner_partner_logo_file | null;
}

export interface Partner_partner_hero_image_file {
  url: string;
}

export interface Partner_partner_hero_image {
  file: Partner_partner_hero_image_file | null;
}

export interface Partner_partner_hero {
  flag: string | null;
  body: string | null;
  image: Partner_partner_hero_image | null;
}

export interface Partner_partner_featured_iconList {
  text: string | null;
}

export interface Partner_partner_featured_link {
  url: string | null;
  text: string | null;
  legacyUrl: string | null;
}

export interface Partner_partner_featured_cards_image_file_details_image {
  width: number;
  height: number;
}

export interface Partner_partner_featured_cards_image_file_details {
  image: Partner_partner_featured_cards_image_file_details_image;
}

export interface Partner_partner_featured_cards_image_file {
  fileName: string;
  url: string;
  details: Partner_partner_featured_cards_image_file_details;
}

export interface Partner_partner_featured_cards_image {
  title: string | null;
  description: string | null;
  file: Partner_partner_featured_cards_image_file | null;
}

export interface Partner_partner_featured_cards_link {
  text: string | null;
  url: string | null;
  legacyUrl: string | null;
}

export interface Partner_partner_featured_cards {
  name: string | null;
  title: string | null;
  image: Partner_partner_featured_cards_image | null;
  body: string | null;
  link: Partner_partner_featured_cards_link | null;
}

export interface Partner_partner_featured_image_file_details_image {
  width: number;
  height: number;
}

export interface Partner_partner_featured_image_file_details {
  image: Partner_partner_featured_image_file_details_image;
}

export interface Partner_partner_featured_image_file {
  fileName: string;
  url: string;
  details: Partner_partner_featured_image_file_details;
}

export interface Partner_partner_featured_image {
  title: string | null;
  description: string | null;
  file: Partner_partner_featured_image_file | null;
}

export interface Partner_partner_featured_testimonials {
  customerName: string | null;
  summary: string | null;
  rating: string | null;
}

export interface Partner_partner_featured {
  layout: (string | null)[] | null;
  body: string | null;
  title: string | null;
  titleTag: string | null;
  video: string | null;
  targetId: string | null;
  defaultHeight: number | null;
  iconList: (Partner_partner_featured_iconList | null)[] | null;
  link: Partner_partner_featured_link | null;
  cards: (Partner_partner_featured_cards | null)[] | null;
  image: Partner_partner_featured_image | null;
  testimonials: (Partner_partner_featured_testimonials | null)[] | null;
}

export interface Partner_partner_featured1_iconList {
  text: string | null;
}

export interface Partner_partner_featured1_link {
  url: string | null;
  text: string | null;
  legacyUrl: string | null;
}

export interface Partner_partner_featured1_cards_image_file_details_image {
  width: number;
  height: number;
}

export interface Partner_partner_featured1_cards_image_file_details {
  image: Partner_partner_featured1_cards_image_file_details_image;
}

export interface Partner_partner_featured1_cards_image_file {
  fileName: string;
  url: string;
  details: Partner_partner_featured1_cards_image_file_details;
}

export interface Partner_partner_featured1_cards_image {
  title: string | null;
  description: string | null;
  file: Partner_partner_featured1_cards_image_file | null;
}

export interface Partner_partner_featured1_cards_link {
  text: string | null;
  url: string | null;
  legacyUrl: string | null;
}

export interface Partner_partner_featured1_cards {
  name: string | null;
  title: string | null;
  image: Partner_partner_featured1_cards_image | null;
  body: string | null;
  link: Partner_partner_featured1_cards_link | null;
}

export interface Partner_partner_featured1_image_file_details_image {
  width: number;
  height: number;
}

export interface Partner_partner_featured1_image_file_details {
  image: Partner_partner_featured1_image_file_details_image;
}

export interface Partner_partner_featured1_image_file {
  fileName: string;
  url: string;
  details: Partner_partner_featured1_image_file_details;
}

export interface Partner_partner_featured1_image {
  title: string | null;
  description: string | null;
  file: Partner_partner_featured1_image_file | null;
}

export interface Partner_partner_featured1_testimonials {
  customerName: string | null;
  summary: string | null;
  rating: string | null;
}

export interface Partner_partner_featured1 {
  layout: (string | null)[] | null;
  body: string | null;
  title: string | null;
  titleTag: string | null;
  video: string | null;
  targetId: string | null;
  defaultHeight: number | null;
  iconList: (Partner_partner_featured1_iconList | null)[] | null;
  link: Partner_partner_featured1_link | null;
  cards: (Partner_partner_featured1_cards | null)[] | null;
  image: Partner_partner_featured1_image | null;
  testimonials: (Partner_partner_featured1_testimonials | null)[] | null;
}

export interface Partner_partner_tiles_image_file {
  url: string;
}

export interface Partner_partner_tiles_image {
  file: Partner_partner_tiles_image_file | null;
}

export interface Partner_partner_tiles {
  body: string | null;
  title: string | null;
  image: Partner_partner_tiles_image | null;
}

export interface Partner_partner_footer_legalStatement {
  body: string | null;
  name: string | null;
  title: string | null;
}

export interface Partner_partner_footer_linkGroups_linkGroups_links {
  text: string | null;
  url: string | null;
}

export interface Partner_partner_footer_linkGroups_linkGroups {
  name: string | null;
  links: (Partner_partner_footer_linkGroups_linkGroups_links | null)[] | null;
}

export interface Partner_partner_footer_linkGroups_links {
  url: string | null;
  text: string | null;
}

export interface Partner_partner_footer_linkGroups {
  body: string | null;
  linkGroups: (Partner_partner_footer_linkGroups_linkGroups | null)[] | null;
  links: (Partner_partner_footer_linkGroups_links | null)[] | null;
  name: string | null;
}

export interface Partner_partner_footer {
  legalStatement: Partner_partner_footer_legalStatement | null;
  linkGroups: (Partner_partner_footer_linkGroups | null)[] | null;
}

export interface Partner_partner_searchPageText {
  carsTitle: string | null;
  carsDescription: string | null;
  vansTitle: string | null;
  vansDescription: string | null;
  pickupsTitle: string | null;
  pickupsDescription: string | null;
}

export interface Partner_partner {
  customerSovereignty: number | null;
  uuid: string | null;
  slug: string | null;
  showPartnerLogo: boolean | null;
  logo: Partner_partner_logo | null;
  fuelTypes: string[] | null;
  vehicleTypes: string[] | null;
  colourPrimary: string | null;
  colourSecondary: string | null;
  telephone: string | null;
  searchPageTitle: string;
  searchPageDescription: string;
  hero: Partner_partner_hero | null;
  featured: Partner_partner_featured | null;
  featured1: Partner_partner_featured1 | null;
  tiles: Partner_partner_tiles[] | null;
  footer: Partner_partner_footer | null;
  searchPageText: Partner_partner_searchPageText | null;
}

export interface Partner {
  partner: Partner_partner | null;
}

export interface PartnerVariables {
  slug: string;
  isPreview?: boolean | null;
}
