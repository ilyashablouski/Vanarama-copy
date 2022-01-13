import { gql } from '@apollo/client';

import { IMAGE_FILE_FRAGMENT } from '../../gql/image';

// eslint-disable-next-line import/prefer-default-export
export const GET_PRIMARY_HEADER_DATA = gql`
  ${IMAGE_FILE_FRAGMENT}
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
              fileName
              ...imageFile
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
                fileName
                ...imageFile
              }
            }
          }
        }
      }
    }
  }
`;
