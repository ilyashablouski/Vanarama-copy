import { gql } from '@apollo/client';

const TESTIMONIALS_DATA = gql`
  query TestimonialsData($size: Int, $page: Int) {
    testimonials(pageSize: $size, page: $page) {
      date
      name
      whyLease
      comments
      overallRating
    }
  }
`;

// eslint-disable-next-line import/prefer-default-export
export { TESTIMONIALS_DATA };
