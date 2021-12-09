import { ApolloError } from '@apollo/client';
import { GetStaticPropsContext, GetStaticPropsResult, NextPage } from 'next';
import SchemaJSON from 'core/atoms/schema-json';
import VehicleReviewCategoryContainer from '../../../../containers/VehicleReviewCategoryContainer/VehicleReviewCategoryContainer';
import { GENERIC_PAGE_QUESTION } from '../../../../containers/VehicleReviewContainer/gql';
import createApolloClient from '../../../../apolloClient';
import { PAGE_COLLECTION } from '../../../../gql/pageCollection';
import { getPathsFromPageCollection } from '../../../../utils/pageSlugs';
import {
  PageCollection,
  PageCollection_pageCollection_items,
  PageCollectionVariables,
} from '../../../../../generated/PageCollection';
import VehicleReviewContainer from '../../../../containers/VehicleReviewContainer/VehicleReviewContainer';
import { getSectionsData } from '../../../../utils/getSectionsData';
import Head from '../../../../components/Head/Head';
import { GENERIC_PAGE_QUESTION_HUB } from '../../../../containers/VehicleReviewCategoryContainer/gql';
import { decodeData, encodeData } from '../../../../utils/data';
import {
  DEFAULT_REVALIDATE_INTERVAL,
  DEFAULT_REVALIDATE_INTERVAL_ERROR,
} from '../../../../utils/env';
import {
  ReviewsHubCategoryQuery,
  ReviewsHubCategoryQueryVariables,
} from '../../../../../generated/ReviewsHubCategoryQuery';
import {
  ReviewsPageQuery,
  ReviewsPageQueryVariables,
} from '../../../../../generated/ReviewsPageQuery';
import {
  IPageWithData,
  IPageWithError,
  PageTypeEnum,
} from '../../../../types/common';
import { convertErrorToProps } from '../../../../utils/helpers';
import { getBreadCrumbsItems } from '../../../../utils/breadcrumbs';

type IProps = IPageWithData<{
  data: ReviewsHubCategoryQuery | ReviewsPageQuery;
}>;

const ReviewHub: NextPage<IProps> = ({ data: encodedData }) => {
  const data = decodeData(encodedData);

  if ('reviewsPage' in data) {
    const title = getSectionsData(['metaData', 'name'], data?.reviewsPage);
    const body = getSectionsData(['body'], data?.reviewsPage);
    const sections = getSectionsData(['sections'], data?.reviewsPage);
    const metaData = getSectionsData(['metaData'], data.reviewsPage);
    const featuredImage = getSectionsData(['featuredImage'], data?.reviewsPage);
    const breadcrumbsItems = getBreadCrumbsItems(metaData);

    return (
      <>
        <VehicleReviewContainer
          body={body}
          title={title}
          sections={sections}
          breadcrumbsItems={breadcrumbsItems}
        />
        {metaData && (
          <>
            <Head metaData={metaData} featuredImage={featuredImage} />
            <SchemaJSON json={JSON.stringify(metaData.schema)} />
          </>
        )}
      </>
    );
  }

  const metaData = getSectionsData(['metaData'], data.genericPage);
  const breadcrumbsItems = metaData?.breadcrumbs?.map((el: any) => ({
    link: { href: el.href || '', label: el.label },
  }));

  return (
    <VehicleReviewCategoryContainer
      data={data}
      breadcrumbsItems={breadcrumbsItems}
    />
  );
};

export async function getStaticPaths(context: GetStaticPropsContext) {
  const client = createApolloClient({});
  const { data } = await client.query<PageCollection, PageCollectionVariables>({
    query: PAGE_COLLECTION,
    variables: {
      pageType: 'Van Reviews',
      isPreview: !!context?.preview,
    },
  });
  const items: (PageCollection_pageCollection_items | null)[] =
    data?.pageCollection?.items || [];

  const { data: vehicleData } = await client.query<
    PageCollection,
    PageCollectionVariables
  >({
    query: PAGE_COLLECTION,
    variables: {
      pageType: 'Vehicle Review',
    },
  });
  const itemsVehicle: (PageCollection_pageCollection_items | null)[] =
    vehicleData?.pageCollection?.items || [];
  const pathCollection = [...items, ...itemsVehicle].filter(
    el => el?.slug !== 'reviews/vans',
  );

  return {
    paths: getPathsFromPageCollection(pathCollection, 'reviews', ['/page/']),
    fallback: 'blocking',
  };
}

export async function getStaticProps(
  context: GetStaticPropsContext,
): Promise<GetStaticPropsResult<IProps | IPageWithError>> {
  try {
    const client = createApolloClient({});
    const hub = context?.params?.hub as string[];

    const { data } = await client.query<
      ReviewsHubCategoryQuery | ReviewsPageQuery,
      ReviewsHubCategoryQueryVariables | ReviewsPageQueryVariables
    >({
      query:
        hub.length === 1 ? GENERIC_PAGE_QUESTION_HUB : GENERIC_PAGE_QUESTION,
      variables: {
        slug: `reviews/vans/${hub?.join('/')}`,
        isPreview: !!context?.preview,
      },
    });

    return {
      revalidate: context?.preview ? 1 : DEFAULT_REVALIDATE_INTERVAL,
      props: {
        pageType: PageTypeEnum.DEFAULT,
        data: encodeData(data),
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
}

export default ReviewHub;
