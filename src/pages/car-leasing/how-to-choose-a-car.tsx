import { ApolloError } from '@apollo/client';
import { GetStaticPropsContext, GetStaticPropsResult, NextPage } from 'next';
import {
  GENERIC_PAGE,
  IGenericPage,
  IGenericPageProps,
} from '../../gql/genericPage';
import createApolloClient from '../../apolloClient';
import LandingPageContainer from '../../containers/LandingPageContainer';
import {
  GenericPageQuery,
  GenericPageQueryVariables,
} from '../../../generated/GenericPageQuery';
import {
  DEFAULT_REVALIDATE_INTERVAL,
  DEFAULT_REVALIDATE_INTERVAL_ERROR,
} from '../../utils/env';
import { convertErrorToProps } from '../../utils/helpers';
import { PageTypeEnum } from '../../types/common';

const HowToChoosePage: NextPage<IGenericPage> = ({ data }) => (
  <LandingPageContainer data={data} title="How Can We Help You Choose?" />
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
        slug: 'car-leasing/how-to-choose-a-car',
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

export default HowToChoosePage;
