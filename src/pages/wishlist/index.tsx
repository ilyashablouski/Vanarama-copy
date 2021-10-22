import React from 'react';
import { ApolloError } from '@apollo/client';

import Head from 'components/Head';
import WishlistPageContainer from 'containers/WishlistPageContainer';

import { PreviewNextPageContext } from 'types/common';
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
import ErrorPage from '../_error';
import { convertErrorToProps } from '../../utils/helpers';

function WishlistPage({ data: encodedData, error }: IGenericPage) {
  if (error || !encodedData) {
    return <ErrorPage errorData={error} />;
  }

  // De-obfuscate data for user
  const data = decodeData(encodedData);

  const metaData = getSectionsData(['metaData'], data.genericPage);
  const breadcrumbsList = metaData?.breadcrumbs?.map((el: any) => ({
    link: { href: el.href ?? '', label: el.label },
  }));

  return (
    <>
      <Head metaData={metaData} />
      <WishlistPageContainer
        pageTitle={metaData.title}
        breadcrumbsList={breadcrumbsList}
      />
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
        slug: 'wishlist',
        isPreview: !!context?.preview,
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

export default WishlistPage;
