import { gql, useQuery } from '@apollo/client';
import { genericPageQuery } from '../../generated/genericPageQuery';

export const GENERIC_PAGE = gql`
  query genericPageQuery($slug: String!) {
    genericPage(slug: $slug) {
      id
      metaData {
        title
        metaRobots
        metaDescription
        publishedOn
        legacyUrl
        pageType
        canonicalUrl
        slug
        publishedOn
        schema
      }
      sections {
        carousel {
          title
          name
        }
        tiles {
          position
          name
          tilesTitle
          titleTag
        }
        cards {
          position
          name
          titleTag
          description
          cards {
            title
            name
            image {
              title
              description
              file {
                url
                fileName
                contentType
              }
            }
            body
            titleTag
            link {
              text
              url
            }
          }
        }
      }
      intro
      body
      featuredImage {
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
`;

export function useGenericPage() {
  return useQuery<genericPageQuery>(GENERIC_PAGE, {
    variables: {
      slug: '/car-leasing-explained/business-vs-personal-car-leasing',
    },
  });
}
