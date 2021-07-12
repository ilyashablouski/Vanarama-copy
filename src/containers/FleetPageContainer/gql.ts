import { gql } from '@apollo/client';

const GET_FLEET_PAGE_CONTENT = gql`
  query GetFleetLandingPage($isPreview: Boolean) {
    fleetLandingPage(isPreview: $isPreview) {
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
        file {
          url
        }
      }
      sections {
        featured1 {
          title
          titleTag
          body
          layout
          testimonials {
            customerName
            summary
            rating
          }
        }

        featured2 {
          title
          titleTag
          body
          image {
            title
            file {
              url
            }
          }
          layout
        }

        featured3 {
          title
          titleTag
          body
          image {
            title
            file {
              url
            }
          }
          layout
        }

        featured4 {
          title
          titleTag
          body
          image {
            title
            file {
              url
            }
          }
          layout
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
            title
            description
            file {
              url
            }
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

        tiles {
          name
          tiles {
            body
            title
            image {
              title
              file {
                url
              }
            }
          }
        }
      }
    }
  }
`;

export default GET_FLEET_PAGE_CONTENT;
