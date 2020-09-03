import { gql } from '@apollo/client';

// eslint-disable-next-line import/prefer-default-export
export const CONTACT_US_CONTENT = gql`
  query ContactUsPageData {
    contactUsLandingPage {
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
      }
      body
      intro
    }
  }
`;
