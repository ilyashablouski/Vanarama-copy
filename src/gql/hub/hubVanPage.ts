import { gql } from '@apollo/client';
import { FeaturedHtml } from '../../containers/FeaturedAndTilesContainer/getFeaturedHtml';
import TilesContainer from '../../containers/TilesContainer/TilesContainer';

const HUB_VAN_CONTENT = gql`
  query HubVanPageData {
    hubVanPage {
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
        rowText {
          heading
          titleTag
          subHeading
          body
        }
        cards {
          name
          titleTag
          description
          cards {
            title
            titleTag
            body
            image {
              file {
                url
              }
            }
            link {
              url
              text
              legacyUrl
            }
          }
        }
        steps {
          heading
          titleTag
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
export { HUB_VAN_CONTENT };
