/* eslint-disable import/prefer-default-export */
import { gql, useQuery } from '@apollo/client';
import { Partner, PartnerVariables } from '../../generated/Partner';
import FeaturedSection from '../components/FeaturedSection';

export const PARTNER = gql`
  query Partner($slug: String!) {
    partner(slug: $slug) {
      customerSovereignty
      uuid
      slug
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
      telephone
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
      featured1 {
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
      footer {
        legalStatement {
          body
          name
          title
        }
        linkGroups {
          body
          linkGroups {
            name
            links {
              text
              url
            }
          }
          links {
            url
            text
          }
          name
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
