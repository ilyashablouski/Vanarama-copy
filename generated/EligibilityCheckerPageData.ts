/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: EligibilityCheckerPageData
// ====================================================

export interface EligibilityCheckerPageData_eligibilityCheckerLandingPage_sections_leadText {
  heading: string | null;
  description: string | null;
}

export interface EligibilityCheckerPageData_eligibilityCheckerLandingPage_sections_featured1 {
  body: string | null;
  title: string | null;
  video: string | null;
  layout: string[] | null;
}

export interface EligibilityCheckerPageData_eligibilityCheckerLandingPage_sections_featured2_image_file_details_image {
  width: number;
  height: number;
}

export interface EligibilityCheckerPageData_eligibilityCheckerLandingPage_sections_featured2_image_file_details {
  size: number;
  image: EligibilityCheckerPageData_eligibilityCheckerLandingPage_sections_featured2_image_file_details_image;
}

export interface EligibilityCheckerPageData_eligibilityCheckerLandingPage_sections_featured2_image_file {
  url: string;
  fileName: string;
  contentType: string;
  details: EligibilityCheckerPageData_eligibilityCheckerLandingPage_sections_featured2_image_file_details;
}

export interface EligibilityCheckerPageData_eligibilityCheckerLandingPage_sections_featured2_image {
  title: string | null;
  description: string | null;
  file: EligibilityCheckerPageData_eligibilityCheckerLandingPage_sections_featured2_image_file | null;
}

export interface EligibilityCheckerPageData_eligibilityCheckerLandingPage_sections_featured2 {
  body: string | null;
  image: EligibilityCheckerPageData_eligibilityCheckerLandingPage_sections_featured2_image | null;
  title: string | null;
  layout: string[] | null;
}

export interface EligibilityCheckerPageData_eligibilityCheckerLandingPage_sections_faqs_questionSets_questionAnswers {
  question: string | null;
  answer: string | null;
}

export interface EligibilityCheckerPageData_eligibilityCheckerLandingPage_sections_faqs_questionSets {
  title: string | null;
  questionAnswers: (EligibilityCheckerPageData_eligibilityCheckerLandingPage_sections_faqs_questionSets_questionAnswers | null)[] | null;
}

export interface EligibilityCheckerPageData_eligibilityCheckerLandingPage_sections_faqs {
  title: string | null;
  questionSets: (EligibilityCheckerPageData_eligibilityCheckerLandingPage_sections_faqs_questionSets | null)[] | null;
}

export interface EligibilityCheckerPageData_eligibilityCheckerLandingPage_sections_carousel_cards {
  name: string | null;
  title: string | null;
  body: string | null;
}

export interface EligibilityCheckerPageData_eligibilityCheckerLandingPage_sections_carousel_cardTestimonials {
  email: string | null;
  date: string | null;
  customerName: string | null;
  companyName: string | null;
  summary: string | null;
  rating: string | null;
}

export interface EligibilityCheckerPageData_eligibilityCheckerLandingPage_sections_carousel {
  title: string | null;
  name: string | null;
  cards: (EligibilityCheckerPageData_eligibilityCheckerLandingPage_sections_carousel_cards | null)[] | null;
  cardTestimonials: (EligibilityCheckerPageData_eligibilityCheckerLandingPage_sections_carousel_cardTestimonials | null)[] | null;
}

export interface EligibilityCheckerPageData_eligibilityCheckerLandingPage_sections {
  leadText: EligibilityCheckerPageData_eligibilityCheckerLandingPage_sections_leadText | null;
  featured1: EligibilityCheckerPageData_eligibilityCheckerLandingPage_sections_featured1 | null;
  featured2: EligibilityCheckerPageData_eligibilityCheckerLandingPage_sections_featured2 | null;
  faqs: EligibilityCheckerPageData_eligibilityCheckerLandingPage_sections_faqs | null;
  carousel: EligibilityCheckerPageData_eligibilityCheckerLandingPage_sections_carousel | null;
}

export interface EligibilityCheckerPageData_eligibilityCheckerLandingPage {
  id: string;
  sections: EligibilityCheckerPageData_eligibilityCheckerLandingPage_sections | null;
}

export interface EligibilityCheckerPageData {
  eligibilityCheckerLandingPage: EligibilityCheckerPageData_eligibilityCheckerLandingPage;
}
