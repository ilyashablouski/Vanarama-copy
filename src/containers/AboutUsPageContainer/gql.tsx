import { gql, useQuery } from '@apollo/client';
import { GetAboutUsPageData as Query } from '../../../generated/GetAboutUsPageData';

export const GET_ABOUT_US_PAGE_DATA = gql`
  query GetAboutUsPageData {
    aboutUsLandingPage {
      id
      body
      metaData {
        name
      }
      featuredImage {
        file {
          url
        }
      }
      sections {
        rowText {
          heading
          subHeading
          body
        }
        cards {
          name
          cards {
            titleTag
            name
            title
            body
          }
        }
        carousel {
          name
          cards {
            titleTag
            name
            title
            body
          }
        }
      }
    }
  }
`;

export function useAboutUsPageData() {
  return useQuery<Query>(GET_ABOUT_US_PAGE_DATA);
}
