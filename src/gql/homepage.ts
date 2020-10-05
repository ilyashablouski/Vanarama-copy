import { gql } from '@apollo/client';

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
        publishedOn
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
              text
            }
          }
        }
        featured1 {
          title
          titleTag
          body
          image {
            file {
              url
            }
          }
          iconList {
            text
          }
          layout
          video
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
export { ALL_HOME_CONTENT };
