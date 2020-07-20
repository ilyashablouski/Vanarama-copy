/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: TestimonialsData
// ====================================================

export interface TestimonialsData_testimonials {
  date: any;
  name: string;
  whyLease: string | null;
  comments: string | null;
  overallRating: number;
}

export interface TestimonialsData {
  testimonials: (TestimonialsData_testimonials | null)[] | null;
}

export interface TestimonialsDataVariables {
  size?: number | null;
  page?: number | null;
}
