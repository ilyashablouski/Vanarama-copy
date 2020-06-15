import { gql } from '@apollo/client';

const HUB_CAR_CONTENT = gql`
  query HubCarPageData {
    hubCarPage {
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
        steps {
          steps {
            title
            body
          }
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
export { HUB_CAR_CONTENT };
