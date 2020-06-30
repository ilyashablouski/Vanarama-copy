import { gql } from '@apollo/client';

const ALL_HOME_CONTENT = gql`
  query HomePageData {
    homePage {
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
        cards {
          name
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
            }
          }
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
export { ALL_HOME_CONTENT };
