import { gql, useQuery } from '@apollo/client';
import {
  GenericPageTestimonialsQuery,
  GenericPageTestimonialsQueryVariables,
} from '../../../generated/GenericPageTestimonialsQuery';
import TilesContainer from '../TilesContainer/TilesContainer';
import FeaturedSection from '../../components/FeaturedSection';

export const GENERIC_PAGE_TESTIMONIALS = gql`
  query GenericPageTestimonialsQuery($slug: String!, $isPreview: Boolean) {
    genericPage(slug: $slug, isPreview: $isPreview) {
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
      featuredImage {
        title
        description
        file {
          url
          fileName
          contentType
        }
      }
      sections {
        tiles1 {
          ...GenericPageQueryTiles
        }
        tiles2 {
          ...GenericPageQueryTiles
        }
        featured {
          ...GenericPageQueryFeatured
        }
      }
    }
  }
  ${FeaturedSection.fragments.featured}
  ${TilesContainer.fragments.tiles}
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
