import React from 'react';
import { GetStaticPropsContext, NextPage, NextPageContext } from 'next';
import DefaultErrorPage from 'next/error';
import createApolloClient from '../../apolloClient';
import { GENERIC_PAGE, IGenericPage } from '../../gql/genericPage';
import PageNotFoundContainer from '../../containers/PageNotFoundContainer/PageNotFoundContainer';
import { getSectionsData } from '../../utils/getSectionsData';

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
