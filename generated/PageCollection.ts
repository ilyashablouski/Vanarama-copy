/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PageCollection
// ====================================================

export interface PageCollection_pageCollection_items {
  legacyUrl: string | null;
  slug: string | null;
}

export interface PageCollection_pageCollection {
  total: number;
  limit: number;
  skip: number;
  items: (PageCollection_pageCollection_items | null)[] | null;
}

export interface PageCollection {
  pageCollection: PageCollection_pageCollection | null;
}

export interface PageCollectionVariables {
  pageType: string;
  limit?: number | null;
  skip?: number | null;
}
