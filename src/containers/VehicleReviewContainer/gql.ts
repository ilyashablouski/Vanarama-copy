import { gql, useQuery } from '@apollo/client';
import {
  ReviewsPageQuery,
  ReviewsPageQueryVariables,
} from '../../../generated/ReviewsPageQuery';

export const GENERIC_PAGE_QUESTION = gql`
  query ReviewsPageQuery($slug: String!) {
    reviewsPage(slug: $slug) {
      metaData {
        title
        name
        metaRobots
        metaDescription
        publishedOn
        legacyUrl
        pageType
        canonicalUrl
        slug
        publishedOn
        schema
      }
      body
      sections {
        link {
          text
          url
        }
        rowText {
          heading
          titleTag
          # link {
          #   text
          #   url
          # }
        }
        vehicleReviewMedia {
          reviewVideo
          reviewPhoto {
            file {
              url
            }
          }
        }
        vehicleReview {
          reviewType
          rating
          summary
          author {
            name
            avatar {
              file {
                url
              }
            }
          }
        }
        reviews {
          reviews {
            reviewType
            rating
            summary
            customerName
          }
        }
      }
    }
  }
`;

export function useReviewsPageQuery(slug: string) {
  return useQuery<ReviewsPageQuery, ReviewsPageQueryVariables>(
    GENERIC_PAGE_QUESTION,
    {
      variables: {
        slug,
      },
    },
  );
}
