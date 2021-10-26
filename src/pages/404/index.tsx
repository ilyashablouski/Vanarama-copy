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
import {
  GenericPageQuery,
  GenericPageQueryVariables,
} from '../../../generated/GenericPageQuery';
import {
  DEFAULT_REVALIDATE_INTERVAL,
  DEFAULT_REVALIDATE_INTERVAL_ERROR,
} from '../../utils/env';
import { convertErrorToProps } from '../../utils/helpers';
import ErrorPage from '../_error';

const PageNotFoundContainer = dynamic(
  () => import('../../containers/PageNotFoundContainer/PageNotFoundContainer'),
  {
    loading: () => <Skeleton count={30} />,
  },
);

const PageNotFound: NextPage<IGenericPage> = ({ data, error }) => {
  if (error || !data) {
    return <ErrorPage errorData={error} />;
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
    const { data } = await client.query<
      GenericPageQuery,
      GenericPageQueryVariables
    >({
      query: GENERIC_PAGE,
      variables: {
        slug: '404',
        isPreview: !!context?.preview,
      },
    });

    return {
      revalidate: context?.preview ? 1 : DEFAULT_REVALIDATE_INTERVAL,
      props: {
        data,
      },
    };
  } catch (error) {
    const revalidate = DEFAULT_REVALIDATE_INTERVAL_ERROR;

    return {
      revalidate,
      props: {
        error: convertErrorToProps(error),
      },
    };
  }
}

export default PageNotFound;
