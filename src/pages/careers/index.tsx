import React from 'react';
import DefaultErrorPage from 'next/error';
import { GetStaticPropsContext, NextPage, NextPageContext } from 'next';

import {
  DEFAULT_REVALIDATE_INTERVAL,
  DEFAULT_REVALIDATE_INTERVAL_ERROR,
} from '../../utils/env';
import { GENERIC_PAGE, IGenericPage } from '../../gql/genericPage';
import createApolloClient from '../../apolloClient';

import CareersPageContainer from '../../containers/CareersPageContainer';

const CareersLandingPage: NextPage<IGenericPage> = ({ data, error }) => {
  if (error || !data) {
    return <DefaultErrorPage statusCode={404} />;
  }

  return <CareersPageContainer data={data} />;
};

export async function getStaticProps(context: GetStaticPropsContext) {
  try {
    const client = createApolloClient({}, context as NextPageContext);

    const { data, errors } = await client.query({
      query: GENERIC_PAGE,
      variables: {
        slug: 'careers-at-vanarama',
        sectionsAsArray: true,
        ...(context?.preview && { isPreview: context?.preview }),
      },
    });

    return {
      revalidate: context?.preview
        ? 1
        : Number(process.env.REVALIDATE_INTERVAL) ||
          Number(DEFAULT_REVALIDATE_INTERVAL),
      props: {
        data,
        error: errors ? errors[0] : null,
      },
    };
  } catch {
    return {
      revalidate:
        Number(process.env.REVALIDATE_INTERVAL_ERROR) ||
        Number(DEFAULT_REVALIDATE_INTERVAL_ERROR),
      props: {
        error: true,
      },
    };
  }
}

export default CareersLandingPage;
