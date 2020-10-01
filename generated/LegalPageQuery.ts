/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: LegalPageQuery
// ====================================================

export interface LegalPageQuery_genericPage_metaData {
  name: string | null;
}

export interface LegalPageQuery_genericPage_sections_legalStatement {
  name: string | null;
  title: string | null;
  body: string | null;
}

export interface LegalPageQuery_genericPage_sections_legalStatement1 {
  name: string | null;
  title: string | null;
  body: string | null;
}

export interface LegalPageQuery_genericPage_sections_legalStatement2 {
  name: string | null;
  title: string | null;
  body: string | null;
}

export interface LegalPageQuery_genericPage_sections {
  legalStatement: LegalPageQuery_genericPage_sections_legalStatement | null;
  legalStatement1: LegalPageQuery_genericPage_sections_legalStatement1 | null;
  legalStatement2: LegalPageQuery_genericPage_sections_legalStatement2 | null;
}

export interface LegalPageQuery_genericPage {
  id: string;
  intro: string | null;
  body: string | null;
  metaData: LegalPageQuery_genericPage_metaData;
  sections: LegalPageQuery_genericPage_sections | null;
}

export interface LegalPageQuery {
  genericPage: LegalPageQuery_genericPage;
}

export interface LegalPageQueryVariables {
  slug: string;
}
