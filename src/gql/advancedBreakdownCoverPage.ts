import { gql, useQuery } from '@apollo/client';
import { advancedBreakdownCoverPage } from '../../generated/advancedBreakdownCoverPage';

export const ADVANCED_BREAKDOWN_COVER_PAGE = gql`
  query advancedBreakdownCoverPage {
    advancedBreakdownCoverPage {
      id
      intro
      body
      title
      metaData {
        pageType
        title
        legacyUrl
        canonicalUrl
        metaRobots
        metaDescription
        schema
        publishedOn
      }
      featuredImage {
        title
        description
        file {
          url
          fileName
          contentType
        }
      }
      sections {
        featured1 {
          title
          titleTag
          body
          image {
            title
            description
            file {
              url
              fileName
              contentType
            }
          }
        }
        featured2 {
          title
          titleTag
          body
          image {
            title
            description
            file {
              url
              fileName
              contentType
            }
          }
        }
        tiles {
          name
          tilesTitle
          titleTag
          tiles {
            title
            body
            link
            image {
              title
              description
              file {
                url
                fileName
                contentType
              }
            }
          }
        }
      }
    }
  }
`;

export function useAdvancedBreakdownCoverPage() {
  return useQuery<advancedBreakdownCoverPage>(ADVANCED_BREAKDOWN_COVER_PAGE);
}
