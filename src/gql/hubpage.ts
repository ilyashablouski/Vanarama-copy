import { gql } from '@apollo/client';

const HUB_VAN_CONTENT = gql`
  query HubPageData {
    homePage {
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
        }
        featured2 {
          title
          body
        }
        tiles {
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
export { HUB_VAN_CONTENT };
