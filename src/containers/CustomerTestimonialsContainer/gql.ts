import { gql, useQuery } from '@apollo/client';
import {
  GenericPageTestimonialsQuery,
  GenericPageTestimonialsQueryVariables,
} from '../../../generated/GenericPageTestimonialsQuery';

export const GENERIC_PAGE_TESTIMONIALS = gql`
  query GenericPageTestimonialsQuery($slug: String!) {
    genericPage(slug: $slug) {
      id
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
      sections {
        tiles1 {
          name
          titleTag
          tiles {
            title
            body
            image {
              title
              description
              file {
                url
                contentType
              }
            }
            link
          }
        }
        tiles2 {
          name
          titleTag
          tiles {
            title
            body
            image {
              title
              description
              file {
                url
                contentType
              }
            }
            link
          }
        }
        featured {
          layout
          body
          title
          titleTag
          video
          link {
            text
            url
          }
          image {
            title
            description
            file {
              url
              fileName
              contentType
              details {
                size
                image {
                  width
                  height
                }
              }
            }
          }
        }
      }
    }
  }
`;

export function useGenericPageTestimonials(slug: string) {
  return useQuery<
    GenericPageTestimonialsQuery,
    GenericPageTestimonialsQueryVariables
  >(GENERIC_PAGE_TESTIMONIALS, {
    variables: {
      slug,
    },
  });
}
