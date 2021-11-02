import { ApolloError } from '@apollo/client';
import { GetStaticPropsContext, GetStaticPropsResult, NextPage } from 'next';
import SchemaJSON from 'core/atoms/schema-json';
import { PageTypeEnum, PreviewNextPageContext } from 'types/common';
import FinanceInformationExplainedContainer from '../../../containers/FinanceInformationExplainedContainer/FinanceInfromationExplainedContainer';
import { PAGE_COLLECTION } from '../../../gql/pageCollection';
import { getPathsFromPageCollection } from '../../../utils/pageSlugs';
import FinanceExplainedContainer from '../../../containers/FinanceExplainedContainer/FinanceExplainedContainer';
import {
  GENERIC_PAGE,
  IGenericPage,
  IGenericPageProps,
} from '../../../gql/genericPage';
import createApolloClient from '../../../apolloClient';
import BlogPostContainer from '../../../containers/BlogPostContainer/BlogPostContainer';
import { getSectionsData } from '../../../utils/getSectionsData';
import Breadcrumbs from '../../../core/atoms/breadcrumbs-v2';
import {
  PageCollection,
  PageCollectionVariables,
} from '../../../../generated/PageCollection';
import Head from '../../../components/Head/Head';
import { decodeData, encodeData } from '../../../utils/data';
import {
  GenericPageQuery,
  GenericPageQueryVariables,
} from '../../../../generated/GenericPageQuery';
import {
  DEFAULT_REVALIDATE_INTERVAL,
  DEFAULT_REVALIDATE_INTERVAL_ERROR,
} from '../../../utils/env';
import { convertErrorToProps } from '../../../utils/helpers';

const EligibilityChecker: NextPage<IGenericPage> = ({ data: encodedData }) => {
  const data = decodeData(encodedData);

  const title = getSectionsData(['metaData', 'name'], data?.genericPage);
  const sections = getSectionsData(['sections'], data?.genericPage);
  const metaData = getSectionsData(['metaData'], data?.genericPage);
  const featuredImage = getSectionsData(['featuredImage'], data?.genericPage);
  const image = getSectionsData(
    ['featuredImage', 'file', 'url'],
    data?.genericPage,
  );
  const cards = getSectionsData(
    ['sections', 'cards', 'cards'],
    data?.genericPage,
  );
  const featured1 = getSectionsData(
    ['sections', 'featured1'],
    data?.genericPage,
  );
  const breadcrumbsItems = metaData?.breadcrumbs?.map((el: any) => ({
    link: { href: el.href || '', label: el.label },
  }));

  const isIconBullets = !!sections?.iconBullets1 || !!sections?.iconBullets2;

  if (isIconBullets) {
    return (
      <>
        {breadcrumbsItems && (
          <div className="row:title">
            <Breadcrumbs items={breadcrumbsItems} />
          </div>
        )}
        <FinanceInformationExplainedContainer
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
  }

  if (cards || featured1) {
    return (
      <>
        {breadcrumbsItems && (
          <div className="row:title">
            <Breadcrumbs items={breadcrumbsItems} />
          </div>
        )}
        <FinanceExplainedContainer data={data} />
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
    <BlogPostContainer
      body={data.genericPage.body}
      name={metaData.name}
      image={image}
      breadcrumbsItems={breadcrumbsItems}
      metaData={metaData}
    />
  );
};

export async function getStaticPaths(context: PreviewNextPageContext) {
  const client = createApolloClient({});
  const { data } = await client.query<PageCollection, PageCollectionVariables>({
    query: PAGE_COLLECTION,
    variables: {
      pageType: 'Lease Finance',
      isPreview: !!context?.preview,
    },
  });
  const items = data?.pageCollection?.items;

  return {
    paths: getPathsFromPageCollection(items, 'lease-finance'),
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
        slug: `lease-finance/${paths?.join('/')}`,
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

export default EligibilityChecker;
