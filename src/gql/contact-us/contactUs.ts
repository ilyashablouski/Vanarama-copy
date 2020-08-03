import { gql } from '@apollo/client';

// eslint-disable-next-line import/prefer-default-export
export const CONTACT_US_CONTENT = gql`
  query ContactUsPageData {
    contactUsPage {
      id
      sections {
        featured1 {
          body
        }
        featured2 {
          body
        }
        cards {
          title
          cards {
            title
            titleTag
            body
          }
        }
      }
    }
  }
`;
