import { gql } from '@apollo/client';

// eslint-disable-next-line import/prefer-default-export
export const VAN_OFFERS_CONTENT = gql`
  query VanOffersPageData($slug: String!, $isPreview: Boolean) {
    genericPage(slug: $slug, isPreview: $isPreview) {
      id
      body
      intro
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
