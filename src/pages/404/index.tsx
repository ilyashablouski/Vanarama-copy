import React from 'react';
import Loading from '@vanarama/uibook/lib/components/atoms/loading/Loading';
import { GetStaticPropsContext, NextPage, NextPageContext } from 'next';
import createApolloClient from '../../apolloClient';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { GENERIC_PAGE, IGenericPage } from '../../gql/genericPage';
import PageNotFoundContainer from '../../containers/PageNotFoundContainer/PageNotFoundContainer';
import { getSectionsData } from '../../utils/getSectionsData';

const PageNotFound: NextPage<IGenericPage> = ({ error, loading, data }) => {
  if (loading) {
    return <Loading size="large" />;
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
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

  return (
    <PageNotFoundContainer
      featured={featured}
      name={name}
      cards={cards}
      breadcrumbsItems={breadcrumbs}
    />
  );
};

export async function getStaticProps(context: GetStaticPropsContext) {
  const client = createApolloClient({}, context as NextPageContext);
  const { data, loading, errors } = await client.query({
    query: GENERIC_PAGE,
    variables: {
      slug: '404',
    },
  });

  return { props: { data, loading, error: errors ? errors[0] : null } };
}

export default PageNotFound;
