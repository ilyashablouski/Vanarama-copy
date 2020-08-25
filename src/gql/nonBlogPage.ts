import { gql, useQuery } from '@apollo/client';
import {
  GenericPageQuery,
  GenericPageQueryVariables,
} from '../../generated/GenericPageQuery';
import {
  GenericPageHeadQuery,
  GenericPageHeadQueryVariables,
} from '../../generated/GenericPageHeadQuery';

export const NON_BLOG_PAGE = gql`
  query NonBlogPageQuery($slug: String!) {
    genericPage(slug: $slug) {
      id
    intro
    body
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
    metaData {
      pageType
      slug
      title
      metaRobots
      metaDescription
      legacyUrl
      publishedOn
    }
  }
}
`;

export function useNonBlogPage(slug: string) {
  return useQuery<GenericPageQuery, GenericPageQueryVariables>(NON_BLOG_PAGE, {
    variables: {
      slug,
    },
  });
}

