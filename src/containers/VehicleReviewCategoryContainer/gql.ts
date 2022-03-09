import {
  ApolloClient,
  ApolloError,
  gql,
  NormalizedCacheObject,
  useQuery,
} from '@apollo/client';
import { GetStaticPropsContext, GetStaticPropsResult } from 'next';
import {
  ReviewsHubCategoryQuery,
  ReviewsHubCategoryQueryVariables,
} from '../../../generated/ReviewsHubCategoryQuery';
import {
  DEFAULT_REVALIDATE_INTERVAL,
  DEFAULT_REVALIDATE_INTERVAL_ERROR,
} from '../../utils/env';
import { encodeData } from '../../utils/data';
import { getSectionsData } from '../../utils/getSectionsData';
import { convertErrorToProps } from '../../utils/helpers';
import {
  IPageWithData,
  IPageWithError,
  Nullable,
  PageTypeEnum,
} from '../../types/common';

export const GENERIC_PAGE_QUESTION_HUB = gql`
  query ReviewsHubCategoryQuery($slug: String!, $isPreview: Boolean) {
    genericPage(slug: $slug, isPreview: $isPreview) {
      id
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
        breadcrumbs
      }
      sections {
        cards {
          name
          description
          cards {
            titleTag
            name
            title
            body
            reviewRating
            link {
              text
              url
              legacyUrl
            }
            image {
              title
              file {
                url
              }
            }
          }
        }
      }
    }
  }
`;

export function useReviewsHubCategoryQuery(slug: string) {
  return useQuery<ReviewsHubCategoryQuery, ReviewsHubCategoryQueryVariables>(
    GENERIC_PAGE_QUESTION_HUB,
    {
      variables: {
        slug,
      },
    },
  );
}

export type IReviewHubPage = IPageWithData<{
  data: ReviewsHubCategoryQuery;
  pageNumber?: Nullable<number>;
}>;

export const getReviewsHubCategoryStaticProps = async (
  client: ApolloClient<NormalizedCacheObject | object>,
  slug: string,
  context: GetStaticPropsContext,
): Promise<GetStaticPropsResult<IReviewHubPage | IPageWithError>> => {
  try {
    const { data } = await client.query<
      ReviewsHubCategoryQuery,
      ReviewsHubCategoryQueryVariables
    >({
      query: GENERIC_PAGE_QUESTION_HUB,
      variables: {
        slug,
        isPreview: !!context?.preview,
      },
    });

    return {
      revalidate: context?.preview ? 1 : DEFAULT_REVALIDATE_INTERVAL,
      props: {
        pageType: PageTypeEnum.DEFAULT,
        data: encodeData(data),
        pageNumber:
          parseInt((context?.params?.pageNumber as string) || '', 10) || null,
      },
    };
  } catch (error) {
    const apolloError = error as ApolloError;
    const revalidate = DEFAULT_REVALIDATE_INTERVAL_ERROR;

    // handle graphQLErrors as 404
    // Next will render our custom pages/404
    if (apolloError?.graphQLErrors?.length) {
      return {
        notFound: true,
        revalidate,
      };
    }

    return {
      revalidate,
      props: {
        pageType: PageTypeEnum.ERROR,
        error: convertErrorToProps(error),
      },
    };
  }
};

export const getReviewsHubCategoryStaticPath = async (
  client: ApolloClient<NormalizedCacheObject | object>,
  slug: string,
  context: GetStaticPropsContext,
) => {
  const { data } = await client.query<
    ReviewsHubCategoryQuery,
    ReviewsHubCategoryQueryVariables
  >({
    query: GENERIC_PAGE_QUESTION_HUB,
    variables: {
      slug,
      isPreview: !!context?.preview,
    },
  });
  const cards = getSectionsData(
    ['sections', 'cards', 'cards'],
    data?.genericPage,
  );

  let paths = [] as { params: { pageNumber: string } }[];
  const countPages = Math.ceil((cards.length || 0) / 12);
  for (let index = 1; index <= countPages; index += 1) {
    paths = [...paths, { params: { pageNumber: index.toString() } }];
  }

  return {
    paths,
    fallback: 'blocking',
  };
};
