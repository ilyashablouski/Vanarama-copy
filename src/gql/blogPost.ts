import { gql, useQuery } from '@apollo/client';
import { BlogPost, BlogPostVariables } from '../../generated/BlogPost';

export const BLOG_POPST_PAGE = gql`
  query BlogPost($slug: String!, $category: Boolean) {
    blogPost(slug: $slug, category: $category) {
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
      sections {
        carousel {
          title
          name
          cards {
            name
            title
            image {
              title
              description
              file {
                url
                fileName
              }
            }
            body
            link {
              text
              url
            }
          }
        }
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

export function useBlogPostPage(slug: string, category?: boolean) {
  return useQuery<BlogPost, BlogPostVariables>(BLOG_POPST_PAGE, {
    variables: {
      slug,
      category,
    },
  });
}
