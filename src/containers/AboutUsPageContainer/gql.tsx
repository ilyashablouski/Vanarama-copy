import { gql, useQuery } from '@apollo/client';
import { GetAboutUsPageData as Query } from '../../../generated/GetAboutUsPageData';
import { IMAGE_FILE_FRAGMENT } from '../../gql/image';

export const GET_ABOUT_US_PAGE_DATA = gql`
  ${IMAGE_FILE_FRAGMENT}
  query GetAboutUsPageData($isPreview: Boolean) {
    aboutUsLandingPage(isPreview: $isPreview) {
      id
      body
      metaData {
        title
        name
        metaRobots
        metaDescription
        legacyUrl
        pageType
        canonicalUrl
        slug
        schema
        publishedOn
        breadcrumbs
      }
      featuredImage {
        file {
          ...imageFile
        }
      }
      sections {
        rowText {
          heading
          subHeading
          body
          rowTextLink {
            text
            url
          }
          link {
            text
            url
          }
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
