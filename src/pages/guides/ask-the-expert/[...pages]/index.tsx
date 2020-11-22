import { GetStaticPropsContext, NextPage, NextPageContext } from 'next';
import DefaultErrorPage from 'next/error';
import React from 'react';
import dynamic from 'next/dynamic';
import createApolloClient from '../../../../apolloClient';
import { PAGE_COLLECTION } from '../../../../gql/pageCollection';
import { getPathsFromPageCollection } from '../../../../utils/pageSlugs';
import SimplePageContainer from '../../../../containers/SipmlePageContainer/SipmlePageContainer';
import {
  PageCollection,
  PageCollectionVariables,
} from '../../../../../generated/PageCollection';
import { GENERIC_PAGE, IGenericPage } from '../../../../gql/genericPage';
import { getSectionsData } from '../../../../utils/getSectionsData';

const Breadcrumb = dynamic(() =>
  import('../../../../components/Breadcrumb/Breadcrumb'),
);

const AskTheExpertPage: NextPage<IGenericPage> = ({ data, error }) => {
  if (error || !data) {
    return <DefaultErrorPage statusCode={404} />;
  }
  const metaData = getSectionsData(['metaData'], data?.genericPage);
  const breadcrumbsItems = metaData?.breadcrumbs?.map((el: any) => ({
    link: { href: el.href || '', label: el.label },
  }));

  return (
    <>
      <div className="row:title">
        <Breadcrumb items={breadcrumbsItems} />
      </div>
      <SimplePageContainer data={data} />
    </>
  );
};

export async function getStaticPaths() {
  const client = createApolloClient({});
  const { data } = await client.query<PageCollection, PageCollectionVariables>({
    query: PAGE_COLLECTION,
    variables: {
      pageType: 'Ask The Expert',
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

    const { data, errors } = await client.query({
      query: GENERIC_PAGE,
      variables: {
        slug: `guides/ask-the-expert/${paths?.join('/')}`,
      },
    });
    return {
      props: {
        data,
        error: errors ? errors[0] : null,
      },
    };
  } catch {
    return {
      props: {
        error: true,
      },
    };
  }
}

export default AskTheExpertPage;
