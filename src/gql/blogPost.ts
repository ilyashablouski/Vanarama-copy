import { gql, useQuery } from '@apollo/client';
import { BlogPost, BlogPostVariables } from '../../generated/BlogPost';

export const BLOG_POPST_PAGE = gql`
  query BlogPost($slug: String!) {
    blogPost(slug: $slug) {
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
      pageTitle
      articles {
        tags
        body
        featuredImage {
          file {
            url
          }
        }
        title
        category {
          pageTitle
        }
      }
    }
  }
`;

export function useBlogPostPage(slug: string) {
  return useQuery<BlogPost, BlogPostVariables>(BLOG_POPST_PAGE, {
    variables: {
      slug,
    },
  });
}
