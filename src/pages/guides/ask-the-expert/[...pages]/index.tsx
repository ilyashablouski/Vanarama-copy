import { ApolloError } from '@apollo/client';
import { GetStaticPropsContext, GetStaticPropsResult, NextPage } from 'next';
import { PageTypeEnum } from 'types/common';
import createApolloClient from '../../../../apolloClient';
import { PAGE_COLLECTION } from '../../../../gql/pageCollection';
import { getPathsFromPageCollection } from '../../../../utils/pageSlugs';
import SimplePageContainer from '../../../../containers/SimplePageContainer/SimplePageContainer';
import {
  PageCollection,
  PageCollectionVariables,
} from '../../../../../generated/PageCollection';
import {
  GENERIC_PAGE,
  IGenericPage,
  IGenericPageProps,
} from '../../../../gql/genericPage';
import {
  GenericPageQuery,
  GenericPageQueryVariables,
} from '../../../../../generated/GenericPageQuery';
import {
  DEFAULT_REVALIDATE_INTERVAL,
  DEFAULT_REVALIDATE_INTERVAL_ERROR,
} from '../../../../utils/env';
import { convertErrorToProps } from '../../../../utils/helpers';

const AskTheExpertPage: NextPage<IGenericPage> = ({ data }) => (
  <SimplePageContainer data={data} />
);

export async function getStaticPaths(context: GetStaticPropsContext) {
  const client = createApolloClient({});
  const { data } = await client.query<PageCollection, PageCollectionVariables>({
    query: PAGE_COLLECTION,
    variables: {
      pageType: 'Ask The Expert',
      isPreview: !!context?.preview,
    },
  });
  const items = data?.pageCollection?.items;

  return {
    paths: getPathsFromPageCollection(items, 'ask-the-expert'),
    fallback: false,
  };
}

export async function getStaticProps(
  context: GetStaticPropsContext,
): Promise<GetStaticPropsResult<IGenericPageProps>> {
  try {
    const client = createApolloClient({});
    const paths = context?.params?.pages as string[];

    const { data } = await client.query<
      GenericPageQuery,
      GenericPageQueryVariables
    >({
      query: GENERIC_PAGE,
      variables: {
        slug: `guides/ask-the-expert/${paths?.join('/')}`,
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

export default AskTheExpertPage;
