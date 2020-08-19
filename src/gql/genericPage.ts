import { gql, useQuery } from '@apollo/client';
import {
  genericPageQuery,
  genericPageQueryVariables,
} from '../../generated/genericPageQuery';
import {
  GenericPageHeadQuery,
  GenericPageHeadQueryVariables,
} from '../../generated/GenericPageHeadQuery';

export const GENERIC_PAGE = gql`
  query genericPageQuery($slug: String!) {
    genericPage(slug: $slug) {
      id
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
      sections {
        tiles {
          position
          name
          tilesTitle
          titleTag
        }
        iconBullets1 {
          title
          iconBullets {
            text
          }
        }
        iconBullets2 {
          title
          iconBullets {
            text
          }
        }
        faqs {
          title
          body
          questionSets {
            title
            questionAnswers {
              question
              answer
            }
          }
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
        featured {
          layout
          body
          title
          image {
            title
            description
            file {
              url
              fileName
            }
          }
        }
        featured1 {
          layout
          body
          titleTag
          title
          image {
            title
            description
            file {
              url
              fileName
            }
          }
        }
        featured2 {
          layout
          body
          titleTag
          image {
            title
            description
            file {
              url
              fileName
            }
          }
          title
          cards {
            name
            title
            image {
              title
              description
              file {
                url
                fileName
              }
            }
            body
            link {
              text
              url
            }
          }
        }
        carousel {
          title
          name
          cards {
            name
            title
            image {
              title
              description
              file {
                url
                fileName
              }
            }
            body
            link {
              text
              url
            }
          }
        }
        tiles {
          position
          name
          tilesTitle
          titleTag
          tiles {
            body
            title
            image {
              title
              description
              file {
                url
                fileName
              }
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

export const GENERIC_PAGE_HEAD = gql`
  query GenericPageHeadQuery($slug: String!) {
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
        name
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
    }
  }
`;

export function useGenericPageHead(slug: string) {
  return useQuery<GenericPageHeadQuery, GenericPageHeadQueryVariables>(
    GENERIC_PAGE_HEAD,
    {
      variables: {
        slug,
      },
    },
  );
}
