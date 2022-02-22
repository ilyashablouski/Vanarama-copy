import React from 'react';
import dynamic from 'next/dynamic';
import { GetStaticPropsContext, GetStaticPropsResult, NextPage } from 'next';
import SchemaJSON from 'core/atoms/schema-json';
import createApolloClient from '../../apolloClient';
import {
  GENERIC_PAGE,
  IGenericPage,
  IGenericPageProps,
} from '../../gql/genericPage';
import { getSectionsData } from '../../utils/getSectionsData';
import Head from '../../components/Head/Head';
import Skeleton from '../../components/Skeleton';
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
import { getServiceBannerData } from '../../utils/serviceBannerHelper';

const PageNotFoundContainer = dynamic(
  () => import('../../containers/PageNotFoundContainer/PageNotFoundContainer'),
  {
    loading: () => <Skeleton count={30} />,
  },
);

const PageNotFound: NextPage<IGenericPage> = ({ data, serviceBanner }) => {
  const name = getSectionsData(['metaData', 'name'], data?.genericPage);
  const cards = getSectionsData(
    ['sections', 'cards', 'cards'],
    data?.genericPage,
  );
  const featured = getSectionsData(['sections', 'featured'], data?.genericPage);
  const breadcrumbs = getSectionsData(
    ['metaData', 'breadcrumbs'],
    data?.genericPage,
  );
  const featuredImage = getSectionsData(['featuredImage'], data?.genericPage);
  const schema = getSectionsData(['metaData', 'schema'], data?.genericPage);
  const metaData = getSectionsData(['metaData'], data?.genericPage);

  return (
    <>
      <PageNotFoundContainer
        featured={featured}
        name={name}
        cards={cards}
        breadcrumbsItems={breadcrumbs}
        serviceBanner={serviceBanner}
      />
      {metaData && (
        <>
          <Head metaData={metaData} featuredImage={featuredImage} />
          <SchemaJSON json={JSON.stringify(schema)} />
        </>
      )}
    </>
  );
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
        slug: '404',
        isPreview: !!context?.preview,
      },
    });

    const { serviceBanner } = await getServiceBannerData(client);

    return {
      revalidate: context?.preview ? 1 : DEFAULT_REVALIDATE_INTERVAL,
      props: {
        pageType: PageTypeEnum.DEFAULT,
        data,
        serviceBanner: serviceBanner || null,
      },
    };
  } catch (error) {
    const revalidate = DEFAULT_REVALIDATE_INTERVAL_ERROR;

    return {
      revalidate,
      props: {
        pageType: PageTypeEnum.ERROR,
        error: convertErrorToProps(error),
      },
    };
  }
}

export default PageNotFound;
