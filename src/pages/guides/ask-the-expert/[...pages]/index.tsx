import { GetStaticPropsContext, NextPage, NextPageContext } from 'next';
import React from 'react';
import { PreviewNextPageContext } from 'types/common';
import createApolloClient from '../../../../apolloClient';
import { PAGE_COLLECTION } from '../../../../gql/pageCollection';
import { getPathsFromPageCollection } from '../../../../utils/pageSlugs';
import SimplePageContainer from '../../../../containers/SimplePageContainer/SimplePageContainer';
import {
  PageCollection,
  PageCollectionVariables,
} from '../../../../../generated/PageCollection';
import { GENERIC_PAGE, IGenericPage } from '../../../../gql/genericPage';
import { GenericPageQuery } from '../../../../../generated/GenericPageQuery';

const AskTheExpertPage: NextPage<IGenericPage> = ({ data }) => {
  return <SimplePageContainer data={data} />;
};

export async function getStaticPaths(context: PreviewNextPageContext) {
  const client = createApolloClient({});
  const { data } = await client.query<PageCollection, PageCollectionVariables>({
    query: PAGE_COLLECTION,
    variables: {
      pageType: 'Ask The Expert',
      ...(context?.preview && { isPreview: context?.preview }),
    },
  });
  const items = data?.pageCollection?.items;

  return {
    paths: getPathsFromPageCollection(items, 'ask-the-expert'),
    fallback: false,
  };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  try {
    const client = createApolloClient({}, context as NextPageContext);
    const paths = context?.params?.pages as string[];

    const { data, errors } = await client.query<GenericPageQuery>({
      query: GENERIC_PAGE,
      variables: {
        slug: `guides/ask-the-expert/${paths?.join('/')}`,
        ...(context?.preview && { isPreview: context?.preview }),
      },
    });
    if (errors) {
      throw new Error(errors[0].message);
    }
    return {
      revalidate: context?.preview
        ? 1
        : Number(process.env.REVALIDATE_INTERVAL),
      props: {
        data,
      },
    };
  } catch (err) {
    throw new Error(err);
  }
}

export default AskTheExpertPage;
