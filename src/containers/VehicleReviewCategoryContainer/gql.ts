import { gql, useQuery } from '@apollo/client';
import {
  ReviewsHubCategoryQuery,
  ReviewsHubCategoryQueryVariables,
} from '../../../generated/ReviewsHubCategoryQuery';

export const GENERIC_PAGE_QUESTION = gql`
  query ReviewsHubCategoryQuery($slug: String!) {
    genericPage(slug: $slug) {
      id
      intro
      body
      featuredImage {
        title
        description
        file {
          url
          fileName
          contentType
        }
      }
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
      sections {
        cards {
          name
          description
          cards {
            titleTag
            name
            title
            body
            reviewRating
            link {
              text
              url
            }
            image {
              title
              file {
                url
              }
            }
          }
        }
      }
    }
  }
`;

export function useReviewsHubCategoryQuery(slug: string) {
  return useQuery<ReviewsHubCategoryQuery, ReviewsHubCategoryQueryVariables>(
    GENERIC_PAGE_QUESTION,
    {
      variables: {
        slug,
      },
    },
  );
}
