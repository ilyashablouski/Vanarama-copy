import { ApolloError } from '@apollo/client';
import { GetStaticPropsContext, GetStaticPropsResult, NextPage } from 'next';
import {
  GENERIC_PAGE,
  IGenericPage,
  IGenericPageProps,
} from '../../gql/genericPage';
import SimplePageContainer from '../../containers/SimplePageContainer/SimplePageContainer';
import createApolloClient from '../../apolloClient';
import { decodeData, encodeData } from '../../utils/data';
import {
  GenericPageQuery,
  GenericPageQueryVariables,
} from '../../../generated/GenericPageQuery';
import {
  DEFAULT_REVALIDATE_INTERVAL,
  DEFAULT_REVALIDATE_INTERVAL_ERROR,
} from '../../utils/env';
import { PageTypeEnum } from '../../types/common';
import { convertErrorToProps } from '../../utils/helpers';

const SitemapPage: NextPage<IGenericPage> = ({ data: encodedData }) => {
  const data = decodeData(encodedData);

  return <SimplePageContainer data={data} />;
};

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
        slug: 'sitemap',
        isPreview: !!context?.preview,
      },
    });

    return {
      revalidate: context?.preview ? 1 : DEFAULT_REVALIDATE_INTERVAL,
      props: {
        pageType: PageTypeEnum.DEFAULT,
        data: encodeData(data),
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

export default SitemapPage;
