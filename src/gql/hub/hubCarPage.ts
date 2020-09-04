import { gql } from '@apollo/client';

const HUB_CAR_CONTENT = gql`
  query HubCarPageData {
    hubCarPage {
      id
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
          title
          titleTag
          body
          layout
          image {
            file {
              url
            }
          }
        }
        featured2 {
          title
          titleTag
          body
          layout
          image {
            file {
              url
            }
          }
        }
        steps {
          heading
          steps {
            title
            body
          }
        }
        tiles {
          name
          titleTag
          tilesTitle
          tiles {
            title
            link
            body
            image {
              file {
                url
              }
              title
            }
          }
        }
      }
    }
  }
`;

// eslint-disable-next-line import/prefer-default-export
export { HUB_CAR_CONTENT };
