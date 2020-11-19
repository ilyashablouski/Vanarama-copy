import { gql } from '@apollo/client';
import { FeaturedHtml } from '../FeaturedAndTilesContainer/getFeaturedHtml';

const GET_INSURANCE_LANDING_PAGE = gql`
  query GetInsuranceLandingPage {
    insuranceLandingPage {
      id
      body
      sections {
        featured1 {
          ...GenericPageQueryFeatured
        }

        featured2 {
          ...GenericPageQueryFeatured
        }

        cards {
          name
          description
          cards {
            titleTag
            name
            title
            body
            link {
              text
              url
              legacyUrl
            }
            image {
              title
              file {
                url
              }
            }
          }
        }

        carousel {
          name
          cards {
            titleTag
            name
            title
            body
            link {
              text
              url
              legacyUrl
            }
            image {
              file {
                url
              }
            }
          }
        }

        leadText {
          heading
          titleTag
          description
        }

        hero {
          title
          body
          image {
            file {
              url
            }
          }
          heroCard {
            title
            body
          }
        }
      }
    }
  }
  ${FeaturedHtml.fragments.featured}
`;

export default GET_INSURANCE_LANDING_PAGE;
