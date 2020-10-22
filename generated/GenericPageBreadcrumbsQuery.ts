/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GenericPageBreadcrumbsQuery
// ====================================================

export interface GenericPageBreadcrumbsQuery_genericPage_metaData {
  breadcrumbs: any | null;
}

export interface GenericPageBreadcrumbsQuery_genericPage {
  id: string;
  metaData: GenericPageBreadcrumbsQuery_genericPage_metaData;
}

export interface GenericPageBreadcrumbsQuery {
  genericPage: GenericPageBreadcrumbsQuery_genericPage;
}

export interface GenericPageBreadcrumbsQueryVariables {
  slug: string;
}
