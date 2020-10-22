import { gql, useQuery } from '@apollo/client';
import {
  GenericPageQuery,
  GenericPageQueryVariables,
} from '../../generated/GenericPageQuery';
import {
  GenericPageHeadQuery,
  GenericPageHeadQueryVariables,
} from '../../generated/GenericPageHeadQuery';
import {
  GenericPageBreadcrumbsQuery,
  GenericPageBreadcrumbsQueryVariables,
} from '../../generated/GenericPageBreadcrumbsQuery';
import TilesContainer from '../containers/TilesContainer/TilesContainer';
import { FeaturedHtml } from '../containers/FeaturedAndTilesContainer/getFeaturedHtml';

export const GENERIC_PAGE = gql`
  query GenericPageQuery($slug: String!) {
    genericPage(slug: $slug) {
      id
      metaData {
        name
      }
      featuredImage {
        file {
          url
        }
      }
      sections {
        leadText {
          titleTag
          heading
          description
          position
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
          title
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
        hero {
          position
          flag
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
          heroCard {
            title
            body
          }
        }
        rowText {
          position
          heading
          titleTag
          subHeading
          body
        }
        featured {
          ...GenericPageQueryFeatured
        }
        featured1 {
          ...GenericPageQueryFeatured
        }
        featured2 {
          ...GenericPageQueryFeatured
        }
        featured3 {
          ...GenericPageQueryFeatured
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
          ...GenericPageQueryTiles
        }
      }
      intro
      body
    }
  }
  ${TilesContainer.fragments.tiles}
  ${FeaturedHtml.fragments.featured}
`;

export function useGenericPage(slug: string) {
  return useQuery<GenericPageQuery, GenericPageQueryVariables>(GENERIC_PAGE, {
    variables: {
      slug,
    },
  });
}

export const GENERIC_PAGE_HEAD = gql`
  query GenericPageHeadQuery($slug: String!) {
    genericPage(slug: $slug) {
      id
      intro
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

export const GENERIC_PAGE_BREADCRUMBS = gql`
  query GenericPageBreadcrumbsQuery($slug: String!) {
    genericPage(slug: $slug) {
      id
      metaData {
        breadcrumbs
      }
    }
  }
`;

export function useGenericPageBreadcrumbs(slug: string) {
  return useQuery<
    GenericPageBreadcrumbsQuery,
    GenericPageBreadcrumbsQueryVariables
  >(GENERIC_PAGE_BREADCRUMBS, {
    variables: {
      slug,
    },
  });
}
