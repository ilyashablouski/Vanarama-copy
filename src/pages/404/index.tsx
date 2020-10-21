import React, { ReactNode } from 'react';
import Loading from '@vanarama/uibook/lib/components/atoms/loading/Loading';
import { NextPageContext } from 'next';
import { ApolloError } from '@apollo/client';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { GENERIC_PAGE } from '../../gql/genericPage';
import PageNotFoundContainer from '../../containers/PageNotFoundContainer/PageNotFoundContainer';
import { getSectionsData } from '../../utils/getSectionsData';
import createApolloClient from '../../apolloClient';
import { GenericPageQuery } from '../../../generated/GenericPageQuery';

export interface IPageNotFoundProps {
  error: ApolloError | undefined;
  loading: boolean;
  data: GenericPageQuery;
  children?: ReactNode;
}

const PageNotFound = ({ data, loading, error }: IPageNotFoundProps) => {
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

  return (
    <PageNotFoundContainer featured={featured} name={name} cards={cards} />
  );
};

export async function getStaticProps(context: NextPageContext) {
  const client = createApolloClient({}, context);
  const { data, loading, errors } = await client.query({
    query: GENERIC_PAGE,
    variables: {
      slug: context.pathname,
    },
  });
  return { props: { data, loading, error: errors || null } };
}

export default PageNotFound;
