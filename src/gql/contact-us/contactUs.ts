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
        legacyUrl
        pageType
        canonicalUrl
        slug
        schema
        publishedOn
        breadcrumbs
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
          layout
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
              legacyUrl
            }
          }
        }
      }
    }
  }
`;
