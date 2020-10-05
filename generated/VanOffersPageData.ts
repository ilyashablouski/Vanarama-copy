/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: VanOffersPageData
// ====================================================

export interface VanOffersPageData_vanOffersPage_metaData {
  name: string | null;
}

export interface VanOffersPageData_vanOffersPage_sections_featured {
  body: string | null;
  title: string | null;
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
  intro: string | null;
  metaData: VanOffersPageData_vanOffersPage_metaData;
  sections: VanOffersPageData_vanOffersPage_sections | null;
}

export interface VanOffersPageData {
  vanOffersPage: VanOffersPageData_vanOffersPage;
}
