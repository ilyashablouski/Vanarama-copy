import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextPage,
} from 'next';
import { ApolloError } from '@apollo/client';
import React from 'react';
import { isRedesignCarHubFeatureFlagEnabled } from '../../utils/helpers';
import {
  GenericPageQuery,
  GenericPageQueryVariables,
} from '../../../generated/GenericPageQuery';
import { GENERIC_PAGE } from '../../gql/genericPage';
import createApolloClient from '../../apolloClient';
import CarHubPageContainer from '../../containers/CarHubPageContainer';
import { PageTypeEnum } from '../../types/common';

interface IProps {
  data: GenericPageQuery;
}

export const CarsPage: NextPage<IProps> = ({ data }) => {
  return <CarHubPageContainer data={data} pageType={PageTypeEnum.DEFAULT} />;
};

export async function getServerSideProps(
  context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<IProps>> {
  const client = createApolloClient({});
  try {
    const isFeatureFlagEnabled = isRedesignCarHubFeatureFlagEnabled(
      context.req.headers.cookie,
    );
    if (!isFeatureFlagEnabled) {
      return { notFound: true };
    }
    const { data } = await client.query<
      GenericPageQuery,
      GenericPageQueryVariables
    >({
      query: GENERIC_PAGE,
      variables: {
        slug: 'car-leasing-dummy',
        sectionsAsArray: true,
        isPreview: !!context?.preview,
      },
    });

    return {
      props: {
        data: data || null,
      },
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
