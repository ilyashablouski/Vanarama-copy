import { gql } from '@apollo/client';

const HUB_VAN_CONTENT = gql`
  query HubVanPageData {
    hubVanPage {
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
        cards {
          name
          description
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
        steps {
          heading
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
export { HUB_VAN_CONTENT };
