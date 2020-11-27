import { ApolloError, gql, useQuery } from '@apollo/client';
import {
  LegalPageQuery,
  LegalPageQueryVariables,
} from '../../../generated/LegalPageQuery';

export interface ILegalPage {
  data?: LegalPageQuery | undefined;
  loading?: boolean | undefined;
  error?: ApolloError;
}

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
        legacyUrl
        pageType
        canonicalUrl
        slug
        schema
        publishedOn
        breadcrumbs
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
      featuredImage {
        file {
          url
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
