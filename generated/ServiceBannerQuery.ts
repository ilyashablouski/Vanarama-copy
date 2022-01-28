/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ServiceBannerQuery
// ====================================================

export interface ServiceBannerQuery_serviceBanner_link {
  text: string | null;
  url: string | null;
}

export interface ServiceBannerQuery_serviceBanner {
  link: ServiceBannerQuery_serviceBanner_link | null;
  message: string | null;
  enable: boolean | null;
}

export interface ServiceBannerQuery {
  serviceBanner: ServiceBannerQuery_serviceBanner;
}

export interface ServiceBannerQueryVariables {
  slug?: string | null;
  isPreview?: boolean | null;
}
