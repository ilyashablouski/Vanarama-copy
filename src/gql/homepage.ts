import { gql } from '@apollo/client';
import { FeaturedHtml } from '../containers/FeaturedAndTilesContainer/getFeaturedHtml';
import TilesContainer from '../containers/TilesContainer/TilesContainer';

const ALL_HOME_CONTENT = gql`
  query HomePageData {
    homePage {
      id
      featuredImage {
        file {
          url
          details {
            image {
              width
              height
            }
          }
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
        breadcrumbs
        schema
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
          heroLabel {
            text
            link {
              text
              legacyUrl
              url
            }
          }
        }
        leadText {
          heading
          titleTag
          description
        }
        cards {
          name
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
              legacyUrl
              text
            }
          }
        }
        featured1 {
          ...GenericPageQueryFeatured
        }
        featured2 {
          ...GenericPageQueryFeatured
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
export { ALL_HOME_CONTENT };
