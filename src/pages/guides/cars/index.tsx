import { ApolloError } from '@apollo/client';
import { GetStaticPropsContext, GetStaticPropsResult, NextPage } from 'next';
import SchemaJSON from 'core/atoms/schema-json';
import LeasingExplainedContainer from '../../../containers/LeasingExplainedContainer/LeasingExplainedContainer';
import {
  GENERIC_PAGE,
  IGenericPage,
  IGenericPageProps,
} from '../../../gql/genericPage';
import { getSectionsData } from '../../../utils/getSectionsData';
import createApolloClient from '../../../apolloClient';
import Breadcrumbs from '../../../core/atoms/breadcrumbs-v2';
import Head from '../../../components/Head/Head';
import { decodeData, encodeData } from '../../../utils/data';
import {
  DEFAULT_REVALIDATE_INTERVAL,
  DEFAULT_REVALIDATE_INTERVAL_ERROR,
} from '../../../utils/env';
import {
  GenericPageQuery,
  GenericPageQueryVariables,
} from '../../../../generated/GenericPageQuery';
import { convertErrorToProps } from '../../../utils/helpers';
import { PageTypeEnum } from '../../../types/common';
import { getBreadCrumbsItems } from '../../../utils/breadcrumbs';

const GuidesCars: NextPage<IGenericPage> = ({ data: encodedData }) => {
  const data = decodeData(encodedData);

  const metaData = getSectionsData(['metaData'], data?.genericPage);
  const featuredImage = getSectionsData(['featuredImage'], data?.genericPage);
  const title = metaData.name;
  const sections = getSectionsData(['sections'], data?.genericPage);
  const body = getSectionsData(['body'], data?.genericPage);
  const breadcrumbsItems =
    Array.isArray(metaData?.breadcrumbs) && getBreadCrumbsItems(metaData);

  return (
    <>
      {breadcrumbsItems && (
        <div className="row:title">
          <Breadcrumbs items={breadcrumbsItems} />
        </div>
      )}
      <LeasingExplainedContainer
        body={body}
        title={title}
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
        slug: `guides/cars`,
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

export default GuidesCars;
