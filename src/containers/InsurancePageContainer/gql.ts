import { gql } from '@apollo/client';
import FeaturedSection from '../../components/FeaturedSection';

const GET_INSURANCE_LANDING_PAGE = gql`
  query GetInsuranceLandingPage {
    insuranceLandingPage {
      id
      body
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
      }
    }
  }
  ${FeaturedSection.fragments.featured}
`;

export default GET_INSURANCE_LANDING_PAGE;
