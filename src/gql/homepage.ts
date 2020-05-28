import { gql } from 'apollo-boost';

const ALL_CONTENT = gql`
  query getHomePageData($id: ID!) {
    homePage(id: $id) {
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
