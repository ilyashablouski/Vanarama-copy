import { gql, useQuery } from '@apollo/client';
import { GetPrimaryHeaderData as Query } from '../../../generated/GetPrimaryHeaderData';

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
        promotionalImage {
          url
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

export function usePrimaryHeaderData() {
  return useQuery<Query>(GET_PRIMARY_HEADER_DATA);
}
