import React from 'react';
import dynamic from 'next/dynamic';
import { GetStaticPropsContext, NextPage, NextPageContext } from 'next';
import SchemaJSON from 'core/atoms/schema-json';
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

const PageNotFound: NextPage<IGenericPage> = ({ data }) => {
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
  const metaData = getSectionsData(['metaData'], data?.genericPage);

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
    if (errors) {
      throw new Error(errors[0].message);
    }
    return {
      revalidate: Number(process.env.REVALIDATE_INTERVAL),
      props: { data, loading },
    };
  } catch (err) {
    throw new Error(err);
  }
}

export default PageNotFound;
