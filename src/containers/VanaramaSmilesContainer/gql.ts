import { gql, useQuery } from '@apollo/client';
import {
  vanaramaSmilesPageQuery,
  vanaramaSmilesPageQueryVariables,
} from '../../../generated/vanaramaSmilesPageQuery';

export const VANARAMA_SMILES_PAGE = gql`
  query vanaramaSmilesPageQuery($slug: String!) {
    genericPage(slug: $slug) {
      id
      intro
      body
      metaData {
        title
        name
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

export function useVanaramaSmilesPage(slug: string) {
  return useQuery<vanaramaSmilesPageQuery, vanaramaSmilesPageQueryVariables>(
    VANARAMA_SMILES_PAGE,
    {
      variables: {
        slug,
      },
    },
  );
}
