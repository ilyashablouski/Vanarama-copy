import { ApolloError } from '@apollo/client';
import { GetStaticPropsContext, GetStaticPropsResult, NextPage } from 'next';

import {
  DEFAULT_REVALIDATE_INTERVAL,
  DEFAULT_REVALIDATE_INTERVAL_ERROR,
} from '../../utils/env';
import {
  GENERIC_PAGE,
  IGenericPage,
  IGenericPageProps,
} from '../../gql/genericPage';
import createApolloClient from '../../apolloClient';

import CareersPageContainer from '../../containers/CareersPageContainer';
import {
  GenericPageQuery,
  GenericPageQueryVariables,
} from '../../../generated/GenericPageQuery';
import { convertErrorToProps } from '../../utils/helpers';
import { PageTypeEnum } from '../../types/common';

const CareersLandingPage: NextPage<IGenericPage> = ({ data }) => (
  <CareersPageContainer data={data} />
);

export async function getStaticProps(
  context: GetStaticPropsContext,
): Promise<GetStaticPropsResult<IGenericPageProps>> {
  try {
    const client = createApolloClient({});

    const { data } = await client.query<
      GenericPageQuery,
      GenericPageQueryVariables
    >({
      query: GENERIC_PAGE,
      variables: {
        slug: 'careers-at-vanarama',
        sectionsAsArray: true,
        isPreview: !!context?.preview,
      },
    });

    return {
      revalidate: context?.preview ? 1 : DEFAULT_REVALIDATE_INTERVAL,
      props: {
        pageType: PageTypeEnum.DEFAULT,
        data,
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
        pageType: PageTypeEnum.ERROR,
        error: convertErrorToProps(error),
      },
    };
  }
}

export default CareersLandingPage;
