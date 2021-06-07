import React from 'react';
import DefaultErrorPage from 'next/error';
import { NextPageContext } from 'next';

import WishlistPageContainer from 'containers/WishlistPageContainer';

import createApolloClient from '../../apolloClient';
import { decodeData, encodeData } from '../../utils/data';
import { getSectionsData } from '../../utils/getSectionsData';
import { GENERIC_PAGE, IGenericPage } from '../../gql/genericPage';
import {
  DEFAULT_REVALIDATE_INTERVAL,
  DEFAULT_REVALIDATE_INTERVAL_ERROR,
} from '../../utils/env';

function WishlistPage({ data: encodedData, error }: IGenericPage) {
  // De-obfuscate data for user
  const data = decodeData(encodedData);

  if (error || !data) {
    return <DefaultErrorPage statusCode={404} />;
  }

  const metaData = getSectionsData(['metaData'], data.genericPage);
  const breadcrumbsList = metaData?.breadcrumbs?.map((el: any) => ({
    link: { href: el.href ?? '', label: el.label },
  }));

  return (
    <WishlistPageContainer
      pageTitle={metaData.title}
      breadcrumbsList={breadcrumbsList}
    />
  );
}

export async function getStaticProps(context: NextPageContext) {
  try {
    const client = createApolloClient({}, context);
    const { data: genericPage, errors } = await client.query({
      query: GENERIC_PAGE,
      variables: {
        slug: 'wishlist',
      },
    });

    return {
      revalidate:
        Number(process.env.REVALIDATE_INTERVAL) ||
        Number(DEFAULT_REVALIDATE_INTERVAL),
      props: {
        data: encodeData(genericPage),
        error: errors ? errors[0] : null,
      },
    };
  } catch (error) {
    return {
      revalidate:
        Number(process.env.REVALIDATE_INTERVAL_ERROR) ||
        Number(DEFAULT_REVALIDATE_INTERVAL_ERROR),
      props: {
        error,
      },
    };
  }
}

export default WishlistPage;
