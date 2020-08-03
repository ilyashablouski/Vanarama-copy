import { gql } from '@apollo/client';

// eslint-disable-next-line import/prefer-default-export
export const VAN_OFFERS_CONTENT = gql`
  query VanOffersPageData {
    vanOffersPage {
      id
      body
      sections {
        featured {
          body
        }
        iconBullets {
          title
          iconBullets {
            text
          }
        }
      }
    }
  }
`;
