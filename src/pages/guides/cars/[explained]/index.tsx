import { ApolloError } from '@apollo/client';
import { GetStaticPropsContext, GetStaticPropsResult, NextPage } from 'next';
import SchemaJSON from 'core/atoms/schema-json';
import React from 'react';
import { PageTypeEnum } from 'types/common';
import LeasingArticleContainer from '../../../../containers/LeasingArticleContainer/LeasingArticleContainer';
import {
  GENERIC_PAGE,
  IGenericPage,
  IGenericPageProps,
} from '../../../../gql/genericPage';
import { getSectionsData } from '../../../../utils/getSectionsData';
import createApolloClient from '../../../../apolloClient';
import {
  GenericPageQuery,
  GenericPageQueryVariables,
} from '../../../../../generated/GenericPageQuery';
import { getLeasingPaths } from '../../../../utils/pageSlugs';
import Breadcrumbs from '../../../../core/atoms/breadcrumbs-v2';
import Head from '../../../../components/Head/Head';
import { decodeData, encodeData } from '../../../../utils/data';
import {
  DEFAULT_REVALIDATE_INTERVAL,
  DEFAULT_REVALIDATE_INTERVAL_ERROR,
} from '../../../../utils/env';
import { convertErrorToProps } from '../../../../utils/helpers';
import { getBreadCrumbsItems } from '../../../../utils/breadcrumbs';

const GuidesCarsExplained: NextPage<IGenericPage> = ({
  data: encodedData,
  articleUrl,
}) => {
  const data = decodeData(encodedData);

  const metaData = getSectionsData(['metaData'], data?.genericPage);
  const featuredImage = getSectionsData(['featuredImage'], data?.genericPage);
  const title = metaData.name;
  const sections = getSectionsData(['sections'], data?.genericPage);
  const body = getSectionsData(['body'], data?.genericPage);
  const featuredImageUrl = getSectionsData(
    ['featuredImage', 'file', 'url'],
    data?.genericPage,
  );
  const breadcrumbsItems =
    Array.isArray(metaData?.breadcrumbs) && getBreadCrumbsItems(metaData);
  const bodyLower = getSectionsData(['bodyLower'], data?.genericPage);

  return (
    <>
      {breadcrumbsItems && (
        <div className="row:title">
          <Breadcrumbs items={breadcrumbsItems} />
        </div>
      )}
      <LeasingArticleContainer
        body={body}
        title={title}
        sections={sections}
        image={featuredImageUrl}
        articleUrl={articleUrl}
        bodyLower={bodyLower}
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

export async function getStaticPaths(context: GetStaticPropsContext) {
  const client = createApolloClient({});
  const { data } = await client.query<
    GenericPageQuery,
    GenericPageQueryVariables
  >({
    query: GENERIC_PAGE,
    variables: {
      slug: 'guides/cars',
      isPreview: !!context?.preview,
    },
  });

  return {
    paths: getLeasingPaths(data?.genericPage),
    fallback: 'blocking',
  };
}

export async function getStaticProps(
  context: GetStaticPropsContext,
): Promise<GetStaticPropsResult<IGenericPageProps>> {
  try {
    const articleUrl = `guides/cars/${context?.params?.explained}`;
    const client = createApolloClient({});
    const { data } = await client.query<
      GenericPageQuery,
      GenericPageQueryVariables
    >({
      query: GENERIC_PAGE,
      variables: {
        slug: articleUrl,
        isPreview: !!context?.preview,
      },
    });

    return {
      revalidate: context?.preview ? 1 : DEFAULT_REVALIDATE_INTERVAL,
      props: {
        pageType: PageTypeEnum.DEFAULT,
        data: encodeData(data),
        articleUrl,
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

export default GuidesCarsExplained;
