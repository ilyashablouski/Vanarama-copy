import { ApolloError } from '@apollo/client';
import { GetStaticPropsContext, GetStaticPropsResult, NextPage } from 'next';
import SchemaJSON from 'core/atoms/schema-json';
import { IPageWithError, PageTypeEnum } from 'types/common';
import React from 'react';
import { PAGE_COLLECTION } from '../../../gql/pageCollection';
import ThankYouContainer from '../../../containers/ThankYouContainer/ThankYouContainer';
import { IInsurancePage } from '../../../models/IInsuranceProps';
import FAQContainer from '../../../containers/FAQContainer/FAQContainer';
import { GENERIC_PAGE } from '../../../gql/genericPage';
import FinanceGapInsuranceContainer from '../../../containers/FinanceGapInsuranceContainer/FinanceGapInsuranceContainer';
import createApolloClient from '../../../apolloClient';
import {
  PageCollection,
  PageCollectionVariables,
} from '../../../../generated/PageCollection';
import { getPathsFromPageCollection } from '../../../utils/pageSlugs';
import { getSectionsData } from '../../../utils/getSectionsData';
import Head from '../../../components/Head/Head';
import {
  GenericPageQuery,
  GenericPageQueryVariables,
} from '../../../../generated/GenericPageQuery';
import {
  DEFAULT_REVALIDATE_INTERVAL,
  DEFAULT_REVALIDATE_INTERVAL_ERROR,
} from '../../../utils/env';
import { convertErrorToProps } from '../../../utils/helpers';
import { getBreadCrumbsItems } from '../../../utils/breadcrumbs';
import { getServiceBannerData } from '../../../utils/serviceBannerHelper';

const MultiYearInsurancePage: NextPage<IInsurancePage> = ({ data }) => {
  const metaData = getSectionsData(['metaData'], data?.genericPage);
  const featuredImage = getSectionsData(['featuredImage'], data?.genericPage);
  const sections = getSectionsData(['sections'], data?.genericPage);
  const intro = getSectionsData(['intro'], data?.genericPage);
  const breadcrumbsItems = getBreadCrumbsItems(metaData);

  if (metaData.title?.includes('Thank You')) {
    return (
      <>
        <ThankYouContainer sections={sections} />
        {metaData && (
          <>
            <Head metaData={metaData} featuredImage={featuredImage} />
            <SchemaJSON json={JSON.stringify(metaData.schema)} />
          </>
        )}
      </>
    );
  }

  if (metaData.title?.includes('FAQ')) {
    return (
      <>
        <FAQContainer
          title={metaData.name}
          sections={sections}
          intro={intro}
          breadcrumbsItems={breadcrumbsItems}
        />
        {metaData && (
          <>
            <Head metaData={metaData} featuredImage={featuredImage} />
            <SchemaJSON json={JSON.stringify(metaData.schema)} />
          </>
        )}
      </>
    );
  }

  return (
    <>
      <FinanceGapInsuranceContainer
        sections={sections}
        breadcrumbsItems={breadcrumbsItems}
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
  const { data } = await client.query<PageCollection, PageCollectionVariables>({
    query: PAGE_COLLECTION,
    variables: {
      pageType: 'Insurance',
      isPreview: !!context?.preview,
    },
  });
  const items = data?.pageCollection?.items;

  return {
    paths: getPathsFromPageCollection(items, 'insurance'),
    fallback: false,
  };
}

export async function getStaticProps(
  context: GetStaticPropsContext,
): Promise<GetStaticPropsResult<IInsurancePage | IPageWithError>> {
  try {
    const client = createApolloClient({});
    const paths = context?.params?.pages as string[];

    const [{ data }, { serviceBanner }] = await Promise.all([
      await client.query<GenericPageQuery, GenericPageQueryVariables>({
        query: GENERIC_PAGE,
        variables: {
          slug: `insurance/${paths?.join('/')}`,
          isPreview: !!context?.preview,
        },
      }),
      getServiceBannerData(client),
    ]);

    return {
      revalidate: context?.preview ? 1 : DEFAULT_REVALIDATE_INTERVAL,
      props: {
        pageType: PageTypeEnum.DEFAULT,
        data,
        serviceBanner: serviceBanner || null,
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

export default MultiYearInsurancePage;
