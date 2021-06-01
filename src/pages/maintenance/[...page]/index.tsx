import dynamic from 'next/dynamic';
import { GetStaticPropsContext, NextPage, NextPageContext } from 'next';
import DefaultErrorPage from 'next/error';
import { GENERIC_PAGE, IGenericPage } from '../../../gql/genericPage';
import createApolloClient from '../../../apolloClient';
import { PAGE_COLLECTION } from '../../../gql/pageCollection';
import { getPathsFromPageCollection } from '../../../utils/pageSlugs';
import {
  PageCollection,
  PageCollectionVariables,
} from '../../../../generated/PageCollection';
import FeaturedAndTilesContainer from '../../../containers/FeaturedAndTilesContainer/FeaturedAndTilesContainer';
import Skeleton from '../../../components/Skeleton';
import {
  DEFAULT_REVALIDATE_INTERVAL,
  DEFAULT_REVALIDATE_INTERVAL_ERROR,
} from '../../../utils/env';

const Loading = dynamic(() => import('core/atoms/loading'), {
  loading: () => <Skeleton count={1} />,
});

const MaintenancePage: NextPage<IGenericPage> = ({ data, loading, error }) => {
  if (error || !data) {
    return <DefaultErrorPage statusCode={404} />;
  }

  if (!data?.genericPage) {
    return <></>;
  }

  if (loading) {
    return <Loading size="large" />;
  }

  return <FeaturedAndTilesContainer data={data} />;
};

export async function getStaticPaths() {
  const client = createApolloClient({});
  const { data } = await client.query<PageCollection, PageCollectionVariables>({
    query: PAGE_COLLECTION,
    variables: {
      pageType: 'Maintenance',
    },
  });
  const items = data?.pageCollection?.items;

  return {
    paths: getPathsFromPageCollection(items, 'maintenance'),
    fallback: 'blocking',
  };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  try {
    const client = createApolloClient({}, context as NextPageContext);
    const paths = context?.params?.page as string[];

    const { data, errors } = await client.query({
      query: GENERIC_PAGE,
      variables: {
        slug: `maintenance/${paths?.join('/')}`,
      },
    });

    return {
      revalidate:
        Number(process.env.REVALIDATE_INTERVAL) ||
        Number(DEFAULT_REVALIDATE_INTERVAL),
      props: {
        data,
        error: errors ? errors[0] : null,
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
}

export default MaintenancePage;
