import { GetStaticPropsContext, NextPage, NextPageContext } from 'next';
import { ApolloError } from '@apollo/client';
import DefaultErrorPage from 'next/error';
import SchemaJSON from 'core/atoms/schema-json';
import dynamic from 'next/dynamic';
import Skeleton from '../../../../components/Skeleton';
import VehicleReviewCategoryContainer from '../../../../containers/VehicleReviewCategoryContainer/VehicleReviewCategoryContainer';
import { GENERIC_PAGE_QUESTION } from '../../../../containers/VehicleReviewContainer/gql';
import createApolloClient from '../../../../apolloClient';
import { PAGE_COLLECTION } from '../../../../gql/pageCollection';
import { getPathsFromPageCollection } from '../../../../utils/pageSlugs';
import {
  PageCollection,
  PageCollectionVariables,
} from '../../../../../generated/PageCollection';
import VehicleReviewContainer from '../../../../containers/VehicleReviewContainer/VehicleReviewContainer';
import { getSectionsData } from '../../../../utils/getSectionsData';
import Head from '../../../../components/Head/Head';
import { GENERIC_PAGE_QUESTION_HUB } from '../../../../containers/VehicleReviewCategoryContainer/gql';

const Loading = dynamic(() => import('core/atoms/loading'), {
  loading: () => <Skeleton count={1} />,
});

interface IReviewPage {
  data: any;
  loading: boolean;
  error: ApolloError | undefined;
}

const ReviewHub: NextPage<IReviewPage> = ({ data, loading, error }) => {
  if (loading) {
    return <Loading size="large" />;
  }

  if (error || !data) {
    return <DefaultErrorPage statusCode={404} />;
  }

  if (data?.reviewsPage) {
    const title = getSectionsData(['metaData', 'name'], data?.reviewsPage);
    const body = getSectionsData(['body'], data?.reviewsPage);
    const sections = getSectionsData(['sections'], data?.reviewsPage);
    const metaData = getSectionsData(['metaData'], data.reviewsPage);
    const featuredImage = getSectionsData(['featuredImage'], data?.reviewsPage);
    const breadcrumbsItems = metaData?.breadcrumbs?.map((el: any) => ({
      link: { href: el.href || '', label: el.label },
    }));

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

export async function getStaticPaths() {
  const client = createApolloClient({});
  const { data } = await client.query<PageCollection, PageCollectionVariables>({
    query: PAGE_COLLECTION,
    variables: {
      pageType: 'Van Reviews',
    },
  });
  const items = data?.pageCollection?.items;

  const { data: vehicleData } = await client.query<
    PageCollection,
    PageCollectionVariables
  >({
    query: PAGE_COLLECTION,
    variables: {
      pageType: 'Vehicle Review',
    },
  });
  const itemsVehicle = vehicleData?.pageCollection?.items;
  const pathCollection = [...items, ...itemsVehicle].filter(
    el => el?.slug !== 'reviews/vans',
  );

  return {
    paths: getPathsFromPageCollection(pathCollection, 'reviews', ['/page/']),
    fallback: false,
  };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  try {
    const client = createApolloClient({}, context as NextPageContext);
    const hub = context?.params?.hub as string[];

    const { data, errors } = await client.query({
      query:
        hub.length === 1 ? GENERIC_PAGE_QUESTION_HUB : GENERIC_PAGE_QUESTION,
      variables: {
        slug: `reviews/vans/${hub?.join('/')}`,
      },
    });
    return {
      props: {
        data,
        error: errors ? errors[0] : null,
      },
    };
  } catch {
    return {
      props: {
        error: true,
      },
    };
  }
}

export default ReviewHub;
