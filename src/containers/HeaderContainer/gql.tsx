import { gql } from '@apollo/client';

// eslint-disable-next-line import/prefer-default-export
export const GET_PRIMARY_HEADER_DATA = gql`
  query GetPrimaryHeaderData {
    primaryHeader {
      id
      links {
        text
        url
      }
      linkGroups {
        name
        body
        promotionalImages {
          url
          legacyUrl
          image {
            file {
              url
              fileName
            }
          }
        }
        links {
          text
          url
          label
        }
        linkGroups {
          name
          links {
            text
            url
            label
          }
          promotionalImage {
            url
            legacyUrl
            image {
              file {
                url
                fileName
              }
            }
          }
        }
      }
    }
  }
`;
