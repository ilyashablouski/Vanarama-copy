import { gql } from '@apollo/client';

// eslint-disable-next-line import/prefer-default-export
export const CONTACT_US_CONTENT = gql`
  query ContactUsPageData {
    contactUsLandingPage {
      id
      sections {
        featured1 {
          title
          body
        }
        cards {
          titleTag
          cards {
            title
            titleTag
            body
          }
        }
        featured2 {
          title
          body
        }
      }
    }
  }
`;

export const LOCATIONS_PAGE_CONTENT = gql`
  query LocationsPageData {
    regionalOfficesPage {
      id
      metaData {
        title
      }
      body
    }
  }
`;
