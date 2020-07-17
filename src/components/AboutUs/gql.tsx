import { gql, useQuery } from "@apollo/client";
import {
    GetAboutUsPageData as Query
} from '../../../generated/GetAboutUsPageData';

export const GET_ABOUT_US_PAGE_DATA = gql`
query GetAboutUsPageData {
  aboutUsLandingPage {
    metaData {
      name
      body
    }
    sections {
      cards {
        name
        cards {
          name
          title
          body
        }
      }
      carousel {
        name
        cards {
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