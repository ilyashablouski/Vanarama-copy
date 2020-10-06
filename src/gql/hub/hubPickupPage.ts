import { gql } from '@apollo/client';
import { FeaturedHtml } from '../../containers/FeaturedAndTilesContainer/getFeaturedHtml';
import TilesContainer from '../../containers/TilesContainer/TilesContainer';

const HUB_PICKUP_CONTENT = gql`
  query HubPickupPageData {
    hubPickupPage {
      id
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
        rowText {
          heading
          titleTag
          subHeading
          body
        }
        steps {
          heading
          titleTag
          steps {
            title
            body
          }
        }
        tiles1 {
          ...GenericPageQueryTiles
        }
        tiles2 {
          ...GenericPageQueryTiles
        }
      }
    }
  }
  ${TilesContainer.fragments.tiles}
  ${FeaturedHtml.fragments.featured}
`;

// eslint-disable-next-line import/prefer-default-export
export { HUB_PICKUP_CONTENT };
