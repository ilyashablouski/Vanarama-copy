import { ApolloClient, gql, useQuery } from '@apollo/client';
import { GetStaticPropsContext } from 'next';
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

export const getReviewsHubCategoryStaticProps = async (
  client: ApolloClient<any>,
  slug: string,
  context: GetStaticPropsContext,
) => {
  try {
    const { data, errors } = await client.query<
      ReviewsHubCategoryQuery,
      ReviewsHubCategoryQueryVariables
    >({
      query: GENERIC_PAGE_QUESTION_HUB,
      variables: {
        slug,
        ...(context?.preview && { isPreview: context?.preview }),
      },
    });
    return {
      revalidate: context?.preview
        ? 1
        : Number(process.env.REVALIDATE_INTERVAL) ||
          Number(DEFAULT_REVALIDATE_INTERVAL),
      props: {
        data: encodeData(data),
        error: errors ? errors[0] : null,
        pageNumber:
          parseInt((context?.params?.pageNumber as string) || '', 10) || null,
      },
    };
  } catch {
    return {
      revalidate:
        Number(process.env.REVALIDATE_INTERVAL_ERROR) ||
        Number(DEFAULT_REVALIDATE_INTERVAL_ERROR),
      props: {
        error: true,
      },
      notFound: true,
    };
  }
};

export const getReviewsHubCategoryStaticPath = async (
  client: ApolloClient<any>,
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
      ...(context?.preview && { isPreview: context?.preview }),
    },
  });
  const cards = getSectionsData(
    ['sections', 'cards', 'cards'],
    data?.genericPage,
  );

  let paths = [] as { params: { pageNumber: string } }[];
  const countPages = Math.ceil((cards.length || 0) / 12);
  for (let i = 1; i <= countPages; i += 1) {
    paths = [...paths, { params: { pageNumber: i.toString() } }];
  }

  return {
    paths,
    fallback: 'blocking',
  };
};
