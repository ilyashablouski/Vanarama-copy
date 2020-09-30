import { gql } from '@apollo/client';

// eslint-disable-next-line import/prefer-default-export
export const VAN_OFFERS_CONTENT = gql`
  query VanOffersPageData {
    vanOffersPage {
      id
      body
      intro
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
        featured {
          body
          title
        }
        iconBullets {
          title
          iconBullets {
            text
          }
        }
      }
    }
  }
`;
