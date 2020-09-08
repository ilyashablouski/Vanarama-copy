/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: VanOffersPageData
// ====================================================

export interface VanOffersPageData_vanOffersPage_metaData {
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

export interface VanOffersPageData_vanOffersPage_featuredImage_file {
  url: string;
  fileName: string;
  contentType: string;
}

export interface VanOffersPageData_vanOffersPage_featuredImage {
  title: string | null;
  description: string | null;
  file: VanOffersPageData_vanOffersPage_featuredImage_file | null;
}

export interface VanOffersPageData_vanOffersPage_sections_featured {
  body: string | null;
}

export interface VanOffersPageData_vanOffersPage_sections_iconBullets_iconBullets {
  text: string | null;
}

export interface VanOffersPageData_vanOffersPage_sections_iconBullets {
  title: string | null;
  iconBullets: (VanOffersPageData_vanOffersPage_sections_iconBullets_iconBullets | null)[] | null;
}

export interface VanOffersPageData_vanOffersPage_sections {
  featured: VanOffersPageData_vanOffersPage_sections_featured | null;
  iconBullets: VanOffersPageData_vanOffersPage_sections_iconBullets | null;
}

export interface VanOffersPageData_vanOffersPage {
  id: string;
  body: string | null;
  metaData: VanOffersPageData_vanOffersPage_metaData;
  featuredImage: VanOffersPageData_vanOffersPage_featuredImage | null;
  sections: VanOffersPageData_vanOffersPage_sections | null;
}

export interface VanOffersPageData {
  vanOffersPage: VanOffersPageData_vanOffersPage;
}
