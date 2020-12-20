import React from 'react';
import dynamic from 'next/dynamic';
import { GetStaticPropsContext, NextPage, NextPageContext } from 'next';
import DefaultErrorPage from 'next/error';
import SchemaJSON from '@vanarama/uibook/lib/components/atoms/schema-json';
import createApolloClient from '../../apolloClient';
import { GENERIC_PAGE, IGenericPage } from '../../gql/genericPage';
// import PageNotFoundContainer from '../../containers/PageNotFoundContainer/PageNotFoundContainer';
import { getSectionsData } from '../../utils/getSectionsData';
import Head from '../../components/Head/Head';
import Skeleton from '../../components/Skeleton';

const PageNotFoundContainer = dynamic(
  () => import('../../containers/PageNotFoundContainer/PageNotFoundContainer'),
  {
    loading: () => <Skeleton count={30} />,
  },
);

const PageNotFound: NextPage<IGenericPage> = ({ error, data }) => {
  if (error || !data) {
    return <DefaultErrorPage statusCode={404} />;
  }

  const name = getSectionsData(['metaData', 'name'], data?.genericPage);
  const cards = getSectionsData(
    ['sections', 'cards', 'cards'],
    data?.genericPage,
  );
  const featured = getSectionsData(['sections', 'featured'], data?.genericPage);
  const breadcrumbs = getSectionsData(
    ['metaData', 'breadcrumbs'],
    data?.genericPage,
  );
  const featuredImage = getSectionsData(['featuredImage'], data?.genericPage);
  const schema = getSectionsData(['metaData', 'schema'], data?.genericPage);
  const metaData = getSectionsData(['metaData'], data.genericPage);

  return (
    <>
      <PageNotFoundContainer
        featured={featured}
        name={name}
        cards={cards}
        breadcrumbsItems={breadcrumbs}
      />
      {metaData && (
        <>
          <Head metaData={metaData} featuredImage={featuredImage} />
          <SchemaJSON json={JSON.stringify(schema)} />
        </>
      )}
    </>
  );
};

export async function getStaticProps(context: GetStaticPropsContext) {
  try {
    const client = createApolloClient({}, context as NextPageContext);
    const { data, loading, errors } = await client.query({
      query: GENERIC_PAGE,
      variables: {
        slug: '404',
      },
    });

    return { props: { data, loading, error: errors ? errors[0] : null } };
  } catch {
    return {
      props: {
        error: true,
      },
    };
  }
}

export default PageNotFound;
