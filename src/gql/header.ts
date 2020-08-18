import { gql } from '@apollo/client';

export const PRIMARY_HEADER = gql`
  query PrimaryHeader {
    primaryHeader {
      id
      links {
        text
        url
      }
      linkGroups {
        name
        body
        links {
          text
          url
        }
        linkGroups {
          name
          links {
            text
            url
          }
        }
      }
    }
  }
`;

export default PRIMARY_HEADER;
