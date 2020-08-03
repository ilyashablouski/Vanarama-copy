import { gql } from '@apollo/client';

const HUB_PICKUP_CONTENT = gql`
  query HubPickupPageData {
    hubPickupPage {
      id
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
        featured1 {
          title
          titleTag
          body
          image {
            file {
              url
            }
          }
        }
        featured2 {
          title
          titleTag
          body
          image {
            file {
              url
            }
          }
        }
        rowText {
          heading
          titleTag
          subHeading
          body
        }
        steps {
          heading
          titleTag
          steps {
            title
            body
          }
        }
        tiles1 {
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
            }
          }
        }
        tiles2 {
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
export { HUB_PICKUP_CONTENT };
