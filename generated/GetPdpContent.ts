/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PdpVehicleType } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetPdpContent
// ====================================================

export interface GetPdpContent_pdpContent_content_questionAnswers {
  question: string | null;
  answer: string | null;
}

export interface GetPdpContent_pdpContent_content {
  title: string | null;
  questionAnswers: (GetPdpContent_pdpContent_content_questionAnswers | null)[] | null;
}

export interface GetPdpContent_pdpContent_banners_image_file_details_image {
  width: number;
  height: number;
}

export interface GetPdpContent_pdpContent_banners_image_file_details {
  image: GetPdpContent_pdpContent_banners_image_file_details_image;
}

export interface GetPdpContent_pdpContent_banners_image_file {
  url: string;
  details: GetPdpContent_pdpContent_banners_image_file_details;
}

export interface GetPdpContent_pdpContent_banners_image {
  title: string | null;
  file: GetPdpContent_pdpContent_banners_image_file | null;
}

export interface GetPdpContent_pdpContent_banners_link {
  text: string | null;
  url: string | null;
}

export interface GetPdpContent_pdpContent_banners {
  name: string | null;
  title: string | null;
  slug: string;
  description: string | null;
  image: GetPdpContent_pdpContent_banners_image | null;
  link: GetPdpContent_pdpContent_banners_link | null;
  startDate: CustomDateTime | null;
  endDate: CustomDateTime | null;
}

export interface GetPdpContent_pdpContent {
  title: string | null;
  vehicleType: (string | null)[] | null;
  content: (GetPdpContent_pdpContent_content | null)[] | null;
  banners: (GetPdpContent_pdpContent_banners | null)[] | null;
}

export interface GetPdpContent {
  pdpContent: GetPdpContent_pdpContent;
}

export interface GetPdpContentVariables {
  vehicleType: PdpVehicleType;
  isPreview?: boolean | null;
  derivativeId?: number | null;
}
