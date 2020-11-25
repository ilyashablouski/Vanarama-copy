import { gql } from '@apollo/client';
import { FeaturedHtml } from '../../containers/FeaturedAndTilesContainer/getFeaturedHtml';
import TilesContainer from '../../containers/TilesContainer/TilesContainer';

const HUB_CAR_CONTENT = gql`
  query HubCarPageData {
    hubCarPage {
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
      featuredImage {
        file {
          url
        }
      }
      sections {
        hero {
          title
          titleTag
          body
          image {
            title
            file {
              url
            }
          }
        }
        leadText {
          heading
          titleTag
          description
        }
        featured1 {
          ...GenericPageQueryFeatured
        }
        featured2 {
          ...GenericPageQueryFeatured
        }
        steps {
          heading
          steps {
            title
            body
          }
        }
        tiles {
          ...GenericPageQueryTiles
        }
      }
    }
  }
  ${TilesContainer.fragments.tiles}
  ${FeaturedHtml.fragments.featured}
`;

// eslint-disable-next-line import/prefer-default-export
export { HUB_CAR_CONTENT };
