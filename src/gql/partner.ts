/* eslint-disable import/prefer-default-export */
import { gql, useQuery } from '@apollo/client';

export const PARTNER = gql`
  query Partner($slug: String!) {
    partner(slug: $slug) {
      logo {
        title
        file {
          url
        }
      }
    }
  }
`;

export function usePartner(slug: string) {
  return useQuery<any>(PARTNER, {
    variables: {
      slug,
    },
  });
}
