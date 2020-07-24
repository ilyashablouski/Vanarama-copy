import { gql } from '@apollo/client';

const HUB_PICKUP_CONTENT = gql`
  query HubPickupPageData {
    hubPickupPage {
      id
      sections {
        hero {
          title
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
          description
        }
        featured1 {
          title
          body
          image {
            file {
              url
            }
          }
        }
        featured2 {
          title
          body
          image {
            file {
              url
            }
          }
        }
        rowText {
          heading
          subHeading
          body
        }
        steps {
          heading
          steps {
            title
            body
          }
        }
        tiles1 {
          name
          tiles {
            title
            body
            image {
              file {
                url
              }
            }
          }
        }
        tiles2 {
          name
          tiles {
            title
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
export { HUB_PICKUP_CONTENT };
