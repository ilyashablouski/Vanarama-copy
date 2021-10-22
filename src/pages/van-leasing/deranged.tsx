import React from 'react';
import { ApolloError } from '@apollo/client';

import Head from 'components/Head';

import { PreviewNextPageContext } from 'types/common';
import SchemaJSON from 'core/atoms/schema-json';
import createApolloClient from '../../apolloClient';
import { decodeData, encodeData } from '../../utils/data';
import { getSectionsData } from '../../utils/getSectionsData';
import { GENERIC_PAGE, IGenericPage } from '../../gql/genericPage';
import {
  DEFAULT_REVALIDATE_INTERVAL,
  DEFAULT_REVALIDATE_INTERVAL_ERROR,
} from '../../utils/env';

import {
  GenericPageQuery,
  GenericPageQueryVariables,
} from '../../../generated/GenericPageQuery';
import DerangedPageContainer from '../../containers/DerangedPageContainer/DerangedPageContainer';
import {
  convertErrorToProps,
  isDerangedHubFeatureEnabled,
} from '../../utils/helpers';
import ErrorPage from '../_error';

function DerangedPage({ data: encodedData, error }: IGenericPage) {
  if (error || !encodedData || !isDerangedHubFeatureEnabled()) {
    return <ErrorPage errorData={error} />;
  }

  // De-obfuscate data for user
  const data = decodeData(encodedData);

  const metaData = getSectionsData(['metaData'], data.genericPage);
  const schema = getSectionsData(
    ['metaData', 'schema'],
    data.genericPage.metaData,
  );

  return (
    <>
      {metaData && <Head metaData={metaData} />}
      {schema && <SchemaJSON json={JSON.stringify(schema)} />}
      <DerangedPageContainer data={data} />
    </>
  );
}

export async function getStaticProps(context: PreviewNextPageContext) {
  try {
    const client = createApolloClient({}, context);
    const { data: genericPage } = await client.query<
      GenericPageQuery,
      GenericPageQueryVariables
    >({
      query: GENERIC_PAGE,
      variables: {
        slug: 'van-leasing/deranged',
        isPreview: !!context.preview,
      },
    });

    return {
      revalidate: context?.preview ? 1 : DEFAULT_REVALIDATE_INTERVAL,
      props: {
        data: encodeData(genericPage),
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
        error: convertErrorToProps(error),
      },
    };
  }
}

export default DerangedPage;
