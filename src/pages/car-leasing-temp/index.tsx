import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextPage,
} from 'next';
import { ApolloError } from '@apollo/client';
import React from 'react';
import { isRedesignCarHubFeatureFlagEnabled } from '../../utils/helpers';

interface IProps {}

export const CarsPage: NextPage<IProps> = () => {
  return <></>;
};

export async function getServerSideProps(
  context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<IProps>> {
  try {
    const isFeatureFlagEnabled = isRedesignCarHubFeatureFlagEnabled(
      context.req.headers.cookie,
    );
    if (!isFeatureFlagEnabled) {
      return { notFound: true };
    }

    return {
      props: {},
    };
  } catch (error) {
    const apolloError = error as ApolloError;

    // handle graphQLErrors as 404
    // Next will render our custom pages/404
    if (apolloError?.graphQLErrors?.length) {
      return { notFound: true };
    }

    // throw any other errors
    // Next will render our custom pages/_error
    throw error;
  }
}

export default CarsPage;
