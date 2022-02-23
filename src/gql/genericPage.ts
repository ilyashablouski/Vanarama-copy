import { gql, useQuery, useLazyQuery } from '@apollo/client';
import createApolloClient from '../apolloClient';
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
import {
  GenericPageCarouselData,
  GenericPageCarouselDataVariables,
} from '../../generated/GenericPageCarouselData';
import TilesContainer from '../containers/TilesContainer/TilesContainer';
import FeaturedSection from '../components/FeaturedSection';
import {
  SearchPageSlug,
  SearchPageSlugVariables,
} from '../../generated/SearchPageSlug';
import { IErrorProps, IPageWithData, IPageWithError } from '../types/common';
import { IMAGE_FILE_FRAGMENT } from './image';

export interface IGenericPage {
  data: GenericPageQuery;
  pageHead?: GenericPageHeadQuery;
  error?: IErrorProps;
  articleUrl?: string;
}

export type IGenericPageProps = IPageWithData<IGenericPage> | IPageWithError;

export const GENERIC_PAGE = gql`
  ${IMAGE_FILE_FRAGMENT}
  query GenericPageQuery(
    $slug: String!
    $sectionsAsArray: Boolean
    $isPreview: Boolean
    $pageType: String
  ) {
    genericPage(
      slug: $slug
      sectionsAsArray: $sectionsAsArray
      isPreview: $isPreview
      pageType: $pageType
    ) {
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
      colourPrimary
      featuredImage {
        title
        description
        file {
          fileName
          contentType
          ...imageFile
        }
      }
      sections {
        leadText {
          titleTag
          heading
          description
          position
          link {
            legacyUrl
            text
            url
          }
        }
        iconBullets {
          title
          iconBullets {
            text
          }
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
                fileName
                ...imageFile
              }
            }
            body
            titleTag
            link {
              text
              url
              legacyUrl
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
              fileName
              contentType
              ...imageFile
            }
          }
          heroCard {
            title
            body
          }
          heroLabel {
            text
            visible
            link {
              text
              url
              visible
            }
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
        featured4 {
          ...GenericPageQueryFeatured
        }
        carousel {
          title
          subtitle
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
              legacyUrl
            }
          }
        }
        tiles {
          ...GenericPageQueryTiles
        }
        steps {
          heading
          titleTag
          steps {
            title
            body
          }
        }
      }
      sectionsAsArray {
        reviews {
          rangeId
          reviewsTitle
          reviews {
            reviewType
            summary
            rating
            customerName
          }
        }
        accordion {
          name
          title
          accordionEntries {
            name
            category
            entryTitle
            entryBody
          }
        }
        carousel {
          subtitle
          title
          name
          cards {
            name
            title
            image {
              title
              description
              file {
                fileName
                ...imageFile
              }
            }
            body
            link {
              text
              url
              legacyUrl
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
                fileName
                ...imageFile
              }
            }
            body
            titleTag
            link {
              text
              url
              legacyUrl
            }
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
        featured {
          ...GenericPageQueryFeatured
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
              fileName
              contentType
              ...imageFile
            }
          }
          mobileImage {
            title
            description
            file {
              fileName
              contentType
              ...imageFile
            }
          }
          logo {
            title
            description
            file {
              fileName
              contentType
              ...imageFile
            }
          }
          heroCard {
            title
            body
          }
          heroLabel {
            text
            visible
            link {
              text
              url
              visible
            }
          }
          heroTerms
          heroCta {
            url
            text
            legacyUrl
            image {
              title
              description
              file {
                fileName
                contentType
                ...imageFile
              }
            }
            label
            visible
          }
        }
        iconBullets {
          title
          iconBullets {
            text
          }
        }
        jumpMenu {
          position
          title
          links {
            label
            url
            text
          }
        }
        leadText {
          titleTag
          heading
          description
          position
          link {
            legacyUrl
            text
            url
          }
        }
        rowText {
          position
          heading
          titleTag
          subHeading
          body
        }
        steps {
          position
          heading
          titleTag
          steps {
            title
            body
          }
        }
        tiles {
          ...GenericPageQueryTiles
        }
        questionSet {
          title
          questionAnswers {
            question
            answer
          }
        }
      }
      intro
      body
      bodyLower
    }
  }
  ${TilesContainer.fragments.tiles}
  ${FeaturedSection.fragments.featured}
`;

export function useGenericPage(slug: string) {
  return useQuery<GenericPageQuery, GenericPageQueryVariables>(GENERIC_PAGE, {
    variables: {
      slug,
    },
  });
}

export const GENERIC_PAGE_HEAD = gql`
  query GenericPageHeadQuery($slug: String!, $isPreview: Boolean) {
    genericPage(slug: $slug, isPreview: $isPreview) {
      id
      intro
      redirectTo
      redirectStatusCode
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

export const GENERIC_SEARCH_PAGE_SLUG = gql`
  query SearchPageSlug($slug: String!) {
    genericPage(slug: $slug) {
      metaData {
        legacyUrl
      }
    }
  }
`;

export function useGenericSearchPageSlug(slug: string) {
  return useQuery<SearchPageSlug, SearchPageSlugVariables>(
    GENERIC_SEARCH_PAGE_SLUG,
    {
      variables: {
        slug,
      },
    },
  );
}

export function getGenericSearchPageSlug(newUrl: string) {
  const client = createApolloClient({});
  return client.query<SearchPageSlug, SearchPageSlugVariables>({
    query: GENERIC_SEARCH_PAGE_SLUG,
    variables: {
      slug: newUrl,
    },
  });
}

export const GENERIC_PAGE_CAROUSEL_DATA = gql`
  query GenericPageCarouselData($slug: String!) {
    genericPage(slug: $slug) {
      carouselPosition
      productFilter {
        title
        manufacturer
        vehicleType
        range
        bodyType
        fuelType
        transmission
      }
    }
  }
`;

export const useGenericPageCarouselData = () => {
  return useLazyQuery<
    GenericPageCarouselData,
    GenericPageCarouselDataVariables
  >(GENERIC_PAGE_CAROUSEL_DATA);
};
