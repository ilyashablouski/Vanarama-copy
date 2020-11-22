import dynamic from 'next/dynamic';
import DefaultErrorPage from 'next/error';
import { GetStaticPropsContext, NextPage, NextPageContext } from 'next';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import { GENERIC_PAGE, IGenericPage } from '../../../gql/genericPage';
import createApolloClient from '../../../apolloClient';
import { PAGE_COLLECTION } from '../../../gql/pageCollection';
import { getPathsFromPageCollection } from '../../../utils/pageSlugs';
import {
  PageCollection,
  PageCollectionVariables,
} from '../../../../generated/PageCollection';
import FeaturedAndTilesContainer from '../../../containers/FeaturedAndTilesContainer/FeaturedAndTilesContainer';
import { getSectionsData } from '../../../utils/getSectionsData';

const Breadcrumb = dynamic(() =>
  import('../../../components/Breadcrumb/Breadcrumb'),
);

const MaintenancePage: NextPage<IGenericPage> = ({ data, error, loading }) => {
  if (error || !data?.genericPage) {
    return <DefaultErrorPage statusCode={404} />;
  }

  if (loading) {
    return <Loading size="large" />;
  }

  const metaData = getSectionsData(['metaData'], data?.genericPage);

  const breadcrumbsItems = metaData?.breadcrumbs?.map((el: any) => ({
    link: { href: el.href || '', label: el.label },
  }));

  return (
    <>
      <div className="row:title">
        <Breadcrumb items={breadcrumbsItems} />
      </div>
      <FeaturedAndTilesContainer data={data} />
    </>
  );
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
    fallback: false,
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

export default MaintenancePage;
