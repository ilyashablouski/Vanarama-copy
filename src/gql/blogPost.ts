import { gql, useLazyQuery, useQuery } from '@apollo/client';
import FeaturedSection from '../components/FeaturedSection';
import TilesContainer from '../containers/TilesContainer/TilesContainer';
import { BlogPost, BlogPostVariables } from '../../generated/BlogPost';
import {
  BlogPostCarouselData,
  BlogPostCarouselDataVariables,
} from '../../generated/BlogPostCarouselData';

export const BLOG_POST_PAGE = gql`
  query BlogPost($slug: String!, $isPreview: Boolean) {
    blogPost(slug: $slug, isPreview: $isPreview) {
      carouselPosition
      productFilter {
        title
        manufacturer
        range
        bodyType
        fuelType
        transmission
      }
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
              legacyUrl
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
              legacyUrl
            }
          }
        }
        tiles {
          ...GenericPageQueryTiles
        }
      }
      body
      bodyLower
      isFeatured
      pinned
      tags
    }
  }
  ${TilesContainer.fragments.tiles}
  ${FeaturedSection.fragments.featured}
`;

export const BLOG_POST_CAROUSEL_DATA = gql`
  query BlogPostCarouselData($slug: String!, $isPreview: Boolean) {
    blogPost(slug: $slug, isPreview: $isPreview) {
      carouselPosition
      productFilter {
        title
        manufacturer
        vehicleType
        range
        bodyType
        fuelType
        transmission
      }
    }
  }
`;

export function useBlogPostPage(slug: string) {
  return useQuery<BlogPost, BlogPostVariables>(BLOG_POST_PAGE, {
    variables: {
      slug,
    },
  });
}

export function useBlogPostCarouselData() {
  return useLazyQuery<BlogPostCarouselData, BlogPostCarouselDataVariables>(
    BLOG_POST_CAROUSEL_DATA,
  );
}
