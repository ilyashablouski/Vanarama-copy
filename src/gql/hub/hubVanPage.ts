import { gql } from '@apollo/client';

const HUB_VAN_CONTENT = gql`
  query HubVanPageData {
    hubVanPage {
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
          video
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
          video
          image {
            file {
              url
            }
          }
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
export { HUB_VAN_CONTENT };
