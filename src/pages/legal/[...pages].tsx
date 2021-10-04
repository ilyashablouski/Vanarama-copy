import { GetStaticPropsContext, NextPage, NextPageContext } from 'next';
import SchemaJSON from 'core/atoms/schema-json';
import DefaultErrorPage from 'next/error';
import React from 'react';
import { PreviewNextPageContext } from 'types/common';
import {
  ILegalPage,
  LEGAL_PAGE_QUERY,
} from '../../containers/LegalArticleContainer/gql';
import createApolloClient from '../../apolloClient';
import { PAGE_COLLECTION } from '../../gql/pageCollection';
import { getPathsFromPageCollection } from '../../utils/pageSlugs';
import LegalArticleContainer from '../../containers/LegalArticleContainer/LegalArticleContainer';
import {
  PageCollection,
  PageCollectionVariables,
} from '../../../generated/PageCollection';
import { getSectionsData } from '../../utils/getSectionsData';
import Breadcrumb from '../../core/atoms/breadcrumb-v2';
import Head from '../../components/Head/Head';
import {
  DEFAULT_REVALIDATE_INTERVAL,
  DEFAULT_REVALIDATE_INTERVAL_ERROR,
} from '../../utils/env';
import {
  LegalPageQuery,
  LegalPageQueryVariables,
} from '../../../generated/LegalPageQuery';

const BlogPost: NextPage<ILegalPage> = ({ data, error }) => {
  if (error || !data) {
    return <DefaultErrorPage statusCode={404} />;
  }

  const metaData = getSectionsData(['metaData'], data?.genericPage);
  const body = getSectionsData(['body'], data?.genericPage);
  const sections = getSectionsData(['sections'], data?.genericPage);
  const image = getSectionsData(
    ['featuredImage', 'file', 'url'],
    data?.genericPage,
  );
  const featuredImage = getSectionsData(['featuredImage'], data?.genericPage);
  const breadcrumbsItems = metaData?.breadcrumbs?.map((el: any) => ({
    link: { href: el.href || '', label: el.label },
  }));

  return (
    <>
      {breadcrumbsItems && (
        <div className="row:title">
          <Breadcrumb items={breadcrumbsItems} />
        </div>
      )}
      <LegalArticleContainer
        body={body}
        name={metaData.name}
        image={image}
        sections={sections}
      />
      {metaData && (
        <>
          <Head metaData={metaData} featuredImage={featuredImage} />
          <SchemaJSON json={JSON.stringify(metaData.schema)} />
        </>
      )}
    </>
  );
};

export async function getStaticPaths(context: PreviewNextPageContext) {
  const client = createApolloClient({});
  const { data } = await client.query<PageCollection, PageCollectionVariables>({
    query: PAGE_COLLECTION,
    variables: {
      pageType: 'Legal',
      ...(context?.preview && { isPreview: context?.preview }),
    },
  });
  const items = data?.pageCollection?.items;

  return {
    paths: getPathsFromPageCollection(items, 'legal'),
    fallback: 'blocking',
  };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  try {
    const client = createApolloClient({}, context as NextPageContext);
    const paths = context?.params?.pages as string[];

    const { data, errors } = await client.query<
      LegalPageQuery,
      LegalPageQueryVariables
    >({
      query: LEGAL_PAGE_QUERY,
      variables: {
        slug: `legal/${paths?.join('/')}`,
        ...(context?.preview && { isPreview: context?.preview }),
      },
    });

    return {
      revalidate: context?.preview
        ? 1
        : Number(process.env.REVALIDATE_INTERVAL) ||
          Number(DEFAULT_REVALIDATE_INTERVAL),
      props: {
        data,
        error: errors ? errors[0] : null,
      },
    };
  } catch {
    return {
      revalidate:
        Number(process.env.REVALIDATE_INTERVAL_ERROR) ||
        Number(DEFAULT_REVALIDATE_INTERVAL_ERROR),
      props: {
        error: true,
      },
      notFound: true,
    };
  }
}

export default BlogPost;
