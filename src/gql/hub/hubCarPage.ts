import { gql } from '@apollo/client';

const HUB_CAR_CONTENT = gql`
  query HubCarPageData {
    hubCarPage {
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
          layout
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
          layout
          image {
            file {
              url
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
export { HUB_CAR_CONTENT };
