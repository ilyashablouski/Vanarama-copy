import { gql, useQuery } from '@apollo/client';
import { FeaturedHtml } from '../containers/FeaturedAndTilesContainer/getFeaturedHtml';
import TilesContainer from '../containers/TilesContainer/TilesContainer';
import { BlogPost, BlogPostVariables } from '../../generated/BlogPost';

export const BLOG_POST_PAGE = gql`
  query BlogPost($slug: String!) {
    blogPost(slug: $slug) {
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
      featuredImage {
        file {
          url
        }
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
            }
          }
        }
        hero {
          position
          flag
          title
          titleTag
          body
          image {
            title
            description
            file {
              url
              fileName
              contentType
            }
          }
          heroCard {
            title
            body
          }
        }
        featured {
          ...GenericPageQueryFeatured
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
            }
          }
        }
        tiles {
          ...GenericPageQueryTiles
        }
      }
      body
      isFeatured
      pinned
      tags
    }
  }
  ${TilesContainer.fragments.tiles}
  ${FeaturedHtml.fragments.featured}
`;

export function useBlogPostPage(slug: string) {
  return useQuery<BlogPost, BlogPostVariables>(BLOG_POST_PAGE, {
    variables: {
      slug,
    },
  });
}
