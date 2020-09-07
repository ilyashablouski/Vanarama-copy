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

export const PRIMARY_FOOTER = gql`
  query PrimaryFooter {
    primaryFooter {
      id
      linkGroups {
        name
        body
        links {
          url
          text
        }
        linkGroups {
          name
          links {
            text
            url
          }
        }
      }
      legalStatement {
        name
        title
        body
      }
    }
  }
`;
