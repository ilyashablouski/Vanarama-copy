/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: VanOffersPageData
// ====================================================

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
  sections: VanOffersPageData_vanOffersPage_sections;
}

export interface VanOffersPageData {
  vanOffersPage: VanOffersPageData_vanOffersPage;
}
