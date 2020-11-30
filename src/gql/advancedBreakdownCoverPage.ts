import { gql, useQuery } from '@apollo/client';
import { advancedBreakdownCoverPage } from '../../generated/advancedBreakdownCoverPage';

export const ADVANCED_BREAKDOWN_COVER_PAGE = gql`
  query advancedBreakdownCoverPage {
    advancedBreakdownCoverPage {
      id
      intro
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
          layout
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
          layout
        }
        featured3 {
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
          layout
        }
        tiles {
          name
          tilesTitle
          titleTag
          position
          tiles {
            title
            body
            link {
              text
              url
              legacyUrl
            }
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
