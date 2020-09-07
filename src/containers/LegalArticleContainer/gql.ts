import { gql, useQuery } from '@apollo/client';
import {
  LegalPageQuery,
  LegalPageQueryVariables,
} from '../../../generated/LegalPageQuery';

export const LEGAL_PAGE_QUERY = gql`
  query LegalPageQuery($slug: String!) {
    genericPage(slug: $slug) {
      id
      intro
      body
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
      featuredImage {
        file {
          url
          details {
            image {
              width
              height
            }
          }
        }
      }
      sections {
        legalStatement {
          name
          title
          body
        }
        legalStatement1 {
          name
          title
          body
        }
        legalStatement2 {
          name
          title
          body
        }
      }
    }
  }
`;

export function useLegalPageQuery(slug: string) {
  return useQuery<LegalPageQuery, LegalPageQueryVariables>(LEGAL_PAGE_QUERY, {
    variables: {
      slug,
    },
  });
}
