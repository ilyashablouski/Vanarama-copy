import { gql, useQuery } from '@apollo/client';
import {
  ReviewsPageQuery,
  ReviewsPageQueryVariables,
} from '../../../generated/ReviewsPageQuery';
import { IMAGE_FILE_FRAGMENT } from '../../gql/image';

export const GENERIC_PAGE_QUESTION = gql`
  ${IMAGE_FILE_FRAGMENT}
  query ReviewsPageQuery($slug: String!, $isPreview: Boolean) {
    reviewsPage(slug: $slug, isPreview: $isPreview) {
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
        breadcrumbs
      }
      featuredImage {
        title
        description
        file {
          url
          fileName
          contentType
        }
      }
      body
      bodyLower
      sections {
        link {
          text
          url
          legacyUrl
        }
        rowText {
          heading
          titleTag
          rowTextLink {
            text
            url
            legacyUrl
          }
          link {
            text
            url
            legacyUrl
          }
        }
        vehicleReviewMedia {
          reviewVideo
          reviewPhoto {
            file {
              ...imageFile
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
