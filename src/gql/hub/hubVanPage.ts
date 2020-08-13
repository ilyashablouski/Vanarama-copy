import { gql } from '@apollo/client';

const HUB_VAN_CONTENT = gql`
  query HubVanPageData {
    hubVanPage {
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
        rowText {
          heading
          titleTag
          subHeading
          body
        }
        cards {
          name
          titleTag
          description
          cards {
            title
            titleTag
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
          titleTag
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
export { HUB_VAN_CONTENT };
