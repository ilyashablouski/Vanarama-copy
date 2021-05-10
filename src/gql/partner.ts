/* eslint-disable import/prefer-default-export */
import { gql, useQuery } from '@apollo/client';
import { Partner, PartnerVariables } from '../../generated/Partner';
import FeaturedSection from '../components/FeaturedSection';

export const PARTNER = gql`
  query Partner($slug: String!) {
    partner(slug: $slug) {
      logo {
        title
        file {
          url
        }
      }
      fuelTypes
      vehicleTypes
      colourPrimary
      colourSecondary
      hero {
        flag
        body
        image {
          file {
            url
          }
        }
      }
      featured {
        ...GenericPageQueryFeatured
      }
      tiles {
        body
        title
        image {
          file {
            url
          }
        }
      }
    }
  }
  ${FeaturedSection.fragments.featured}
`;

export function usePartner(slug: string) {
  return useQuery<Partner, PartnerVariables>(PARTNER, {
    variables: {
      slug,
    },
  });
}
