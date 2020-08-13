import { gql, useQuery } from '@apollo/client';
import {
  genericPageQuery,
  genericPageQueryVariables,
} from '../../generated/genericPageQuery';

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

export function useGenericPage(slug: string) {
  return useQuery<genericPageQuery, genericPageQueryVariables>(GENERIC_PAGE, {
    variables: {
      slug,
    },
  });
}
