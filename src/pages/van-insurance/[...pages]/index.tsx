import { GetStaticPropsContext, NextPage, NextPageContext } from 'next';
import SchemaJSON from 'core/atoms/schema-json';
import { PreviewNextPageContext } from 'types/common';
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

const MultiYearInsurancePage: NextPage<IInsurancePage> = ({ data }) => {
  const metaData = getSectionsData(['metaData'], data?.genericPage);
  const featuredImage = getSectionsData(['featuredImage'], data?.genericPage);
  const sections = getSectionsData(['sections'], data?.genericPage);
  const intro = getSectionsData(['intro'], data?.genericPage);
  const breadcrumbsItems = getSectionsData(
    ['metaData', 'breadcrumbs'],
    data?.genericPage,
  );

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
          breadcrumbsData={breadcrumbsItems}
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
        breadcrumbsData={breadcrumbsItems}
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
      pageType: 'Insurance',
      ...(context?.preview && { isPreview: context?.preview }),
    },
  });
  const items = data?.pageCollection?.items;

  return {
    paths: getPathsFromPageCollection(items, 'van-insurance'),
    fallback: false,
  };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  try {
    const client = createApolloClient({}, context as NextPageContext);
    const paths = context?.params?.pages as string[];

    const { data, errors } = await client.query<
      GenericPageQuery,
      GenericPageQueryVariables
    >({
      query: GENERIC_PAGE,
      variables: {
        slug: `van-insurance/${paths?.join('/')}`,
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

export default MultiYearInsurancePage;
