/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: genericPagesQuery
// ====================================================

export interface genericPagesQuery_genericPages_items {
  slug: string | null;
  legacyUrl: string | null;
}

export interface genericPagesQuery_genericPages {
  items: (genericPagesQuery_genericPages_items | null)[] | null;
}

export interface genericPagesQuery {
  genericPages: genericPagesQuery_genericPages | null;
}

export interface genericPagesQueryVariables {
  slugs: string[];
}
