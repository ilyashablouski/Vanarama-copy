import React from 'react';
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextPage,
} from 'next';
import { ApolloError } from '@apollo/client';

import {
  GenericPageQuery,
  GenericPageQueryVariables,
  GenericPageQuery_genericPage as IGenericPage,
} from '../../../generated/GenericPageQuery';
import createApolloClient from '../../apolloClient';
import { GENERIC_PAGE } from '../../gql/genericPage';
import { decodeData, encodeData } from '../../utils/data';

import LevcPageContainer from '../../containers/LevcPageContainer';

interface ILevcPage {
  data: IGenericPage;
}

const LevcPage: NextPage<ILevcPage> = ({ data }) => (
  <LevcPageContainer genericPage={decodeData(data)} />
);

export async function getServerSideProps(
  context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<ILevcPage>> {
  try {
    const client = createApolloClient({}, context);

    const {
      data: { genericPage },
    } = await client.query<GenericPageQuery, GenericPageQueryVariables>({
      query: GENERIC_PAGE,
      variables: {
        slug: 'van-leasing/levc',
        isPreview: !!context?.preview,
      },
    });

    return {
      props: {
        data: encodeData(genericPage),
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

export default LevcPage;
