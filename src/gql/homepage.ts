import { gql } from '@apollo/client';
import FeaturedSection from '../components/FeaturedSection';
import TilesContainer from '../containers/TilesContainer/TilesContainer';
import { IMAGE_FILE_FRAGMENT } from './image';

const ALL_HOME_CONTENT = gql`
  ${IMAGE_FILE_FRAGMENT}
  query HomePageData($isPreview: Boolean) {
    homePage(isPreview: $isPreview) {
      id
      featuredImage {
        file {
          ...imageFile
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
              ...imageFile
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
                ...imageFile
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
  ${FeaturedSection.fragments.featured}
`;

// eslint-disable-next-line import/prefer-default-export
export { ALL_HOME_CONTENT };
