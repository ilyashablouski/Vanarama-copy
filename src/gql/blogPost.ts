import { gql, useQuery } from '@apollo/client';
import {
  GenericPageQuery,
  GenericPageQueryVariables,
} from '../../generated/GenericPageQuery';
import {
  GenericPageHeadQuery,
  GenericPageHeadQueryVariables,
} from '../../generated/GenericPageHeadQuery';

export const BLOG_POPST_PAGE = gql`
  query BlogPost($slug: String!) {
    blogPost(slug: $slug) {
      id
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
      category {
        pageTitle
        title
        slug
        metaDescription
        canonicalUrl
        legacyUrl
      }
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
    }
  }
`;

export function useBlogPostPage(slug: string) {
  return useQuery<GenericPageQuery, GenericPageQueryVariables>(
    BLOG_POPST_PAGE,
    {
      variables: {
        slug,
      },
    },
  );
}
