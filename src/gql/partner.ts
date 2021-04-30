/* eslint-disable import/prefer-default-export */
import { gql, useQuery } from '@apollo/client';
import { Partner, PartnerVariables } from '../../generated/Partner';

export const PARTNER = gql`
  query Partner($slug: String!) {
    partner(slug: $slug) {
      logo {
        title
        file {
          url
        }
      }
      colourPrimary
      colourSecondary
    }
  }
`;

export function usePartner(slug: string) {
  return useQuery<Partner, PartnerVariables>(PARTNER, {
    variables: {
      slug,
    },
  });
}
