import { ApolloError, gql } from '@apollo/client';
import { GenericPageQuery } from '../../../generated/GenericPageQuery';
import { GenericPageHeadQuery } from '../../../generated/GenericPageHeadQuery';
import TilesContainer from '../TilesContainer/TilesContainer';
import FeaturedSection from '../../components/FeaturedSection';

export interface IGenericPage {
  data?: GenericPageQuery | undefined;
  loading?: boolean | undefined;
  error?: ApolloError;
  pageHead?: GenericPageHeadQuery;
}

export const GENERIC_PAGE_DERANGED = gql`
  query GenericPageQuery($slug: String!, $isPreview: Boolean) {
    genericPage(slug: $slug, isPreview: $isPreview) {
      id
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
          link {
            legacyUrl
            text
            url
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
          heroLabel {
            text
            visible
            link {
              text
              url
              visible
            }
          }
        }
        featured1 {
          ...GenericPageQueryFeatured
        }
        featured2 {
          ...GenericPageQueryFeatured
        }
        featured3 {
          ...GenericPageQueryFeatured
        }
        featured4 {
          ...GenericPageQueryFeatured
        }
        tiles {
          ...GenericPageQueryTiles
        }
      }
    }
  }
  ${TilesContainer.fragments.tiles}
  ${FeaturedSection.fragments.featured}
`;
