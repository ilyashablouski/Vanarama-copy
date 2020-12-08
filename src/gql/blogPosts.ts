import { gql, useQuery } from '@apollo/client';
import { BlogPosts, BlogPostsVariables } from '../../generated/BlogPosts';

export const BLOG_POSTS_PAGE = gql`
  query BlogPosts($slug: String!) {
    blogPosts(slug: $slug) {
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
        leadText {
          titleTag
          heading
          description
          position
        }
        cards {
          position
          name
          titleTag
          description
          title
          cards {
            title
            name
            image {
              title
              description
              file {
                url
                fileName
              }
            }
            body
            titleTag
            link {
              text
              url
              legacyUrl
            }
          }
        }
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
              legacyUrl
            }
          }
        }
        tiles {
          position
          name
          tilesTitle
          titleTag
          tiles {
            body
            title
            link {
              text
              url
              legacyUrl
            }
            image {
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
      }
      pageTitle
      articles {
        intro
        name
        excerpt
        publishedOn
        featuredImage {
          file {
            url
          }
        }
        isFeatured
        title
        tags
        slug
        legacyUrl
      }
    }
  }
`;

export function useBlogPostsPage(slug: string) {
  return useQuery<BlogPosts, BlogPostsVariables>(BLOG_POSTS_PAGE, {
    variables: {
      slug,
    },
  });
}
