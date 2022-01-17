import { gql } from '@apollo/client';
import FeaturedSection from '../../components/FeaturedSection';
import TilesContainer from '../../containers/TilesContainer/TilesContainer';
import { IMAGE_FILE_FRAGMENT } from '../image';

const HUB_VAN_CONTENT = gql`
  ${IMAGE_FILE_FRAGMENT}
  query HubVanPageData($isPreview: Boolean) {
    hubVanPage(isPreview: $isPreview) {
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
  ${FeaturedSection.fragments.featured}
`;

// eslint-disable-next-line import/prefer-default-export
export { HUB_VAN_CONTENT };
