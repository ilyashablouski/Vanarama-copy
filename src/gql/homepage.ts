import { gql } from '@apollo/client';

const ALL_CONTENT = gql`
  query HomePageData {
    homePage {
      sections {
        hero {
          title
          flag
          body
          image {
            title
            file {
              url
            }
          }
        }
        cards {
          name
          cards {
            title
            image {
              file {
                url
              }
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
export { ALL_CONTENT };
