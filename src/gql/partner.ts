/* eslint-disable import/prefer-default-export */
import { gql, useQuery } from '@apollo/client';
import { Partner, PartnerVariables } from '../../generated/Partner';
import FeaturedSection from '../components/FeaturedSection';

export const PARTNER = gql`
  query Partner($slug: String!, $isPreview: Boolean) {
    partner(slug: $slug, isPreview: $isPreview) {
      customerSovereignty
      uuid
      slug
      showPartnerLogo
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
      searchPageTitle
      searchPageDescription
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
      searchPageText {
        carsTitle
        carsDescription
        vansTitle
        vansDescription
        pickupsTitle
        pickupsDescription
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
