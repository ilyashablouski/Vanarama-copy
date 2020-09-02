import { gql } from '@apollo/client';

// eslint-disable-next-line import/prefer-default-export
export const CONTACT_US_CONTENT = gql`
  query ContactUsPageData {
    contactUsLandingPage {
      id
      sections {
        featured1 {
          title
          body
          layout
        }
        cards {
          cards {
            title
            titleTag
            body
          }
        }
        featured2 {
          title
          body
          cards {
            title
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
      }
    }
  }
`;

export const LOCATIONS_PAGE_CONTENT = gql`
  query LocationsPageData {
    regionalOfficesPage {
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
      body
      intro
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
        cards {
          position
          name
          titleTag
          description
          title
          cards {
            title
            name
            image {
              title
              description
              file {
                url
                fileName
              }
            }
            body
            titleTag
            link {
              text
              url
            }
          }
        }
      }
    }
  }
`;
