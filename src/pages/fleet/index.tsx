import { GetStaticPropsContext, NextPage, NextPageContext } from 'next';
import React from 'react';
import { ApolloError } from '@apollo/client';
import FleetLandingPage from '../../containers/FleetPageContainer';
import createApolloClient from '../../apolloClient';
import { GENERIC_PAGE, IGenericPage } from '../../gql/genericPage';
import {
  DEFAULT_REVALIDATE_INTERVAL,
  DEFAULT_REVALIDATE_INTERVAL_ERROR,
} from '../../utils/env';
import { decodeData, encodeData } from '../../utils/data';
import { convertErrorToProps } from '../../utils/helpers';
import {
  GenericPageQuery,
  GenericPageQueryVariables,
} from '../../../generated/GenericPageQuery';
import ErrorPage from '../_error';

const FleetPage: NextPage<IGenericPage> = ({ data, error }) => {
  if (error || !data) {
    return <ErrorPage errorData={error} />;
  }

  return <FleetLandingPage genericPage={decodeData(data)} />;
};

export async function getStaticProps(context: GetStaticPropsContext) {
  try {
    const client = createApolloClient({}, context as NextPageContext);
    const {
      data: { genericPage },
    } = await client.query<GenericPageQuery, GenericPageQueryVariables>({
      query: GENERIC_PAGE,
      variables: {
        slug: 'fleet',
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

export default FleetPage;
