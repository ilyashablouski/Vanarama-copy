import { GetStaticPropsContext, NextPage, NextPageContext } from 'next';
import SchemaJSON from 'core/atoms/schema-json';
import FinanceInformationExplainedContainer from '../../../containers/FinanceInformationExplainedContainer/FinanceInfromationExplainedContainer';
import { PAGE_COLLECTION } from '../../../gql/pageCollection';
import { getPathsFromPageCollection } from '../../../utils/pageSlugs';
import FinanceExplainedContainer from '../../../containers/FinanceExplainedContainer/FinanceExplainedContainer';
import { GENERIC_PAGE, IGenericPage } from '../../../gql/genericPage';
import createApolloClient from '../../../apolloClient';
import BlogPostContainer from '../../../containers/BlogPostContainer/BlogPostContainer';
import { getSectionsData } from '../../../utils/getSectionsData';
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb';
import {
  PageCollection,
  PageCollectionVariables,
} from '../../../../generated/PageCollection';
import Head from '../../../components/Head/Head';

const EligibilityChecker: NextPage<IGenericPage> = ({ data }) => {
  if (!data?.genericPage) {
    return <></>;
  }

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
            <Breadcrumb items={breadcrumbsItems} />
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
            <Breadcrumb items={breadcrumbsItems} />
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

export async function getStaticPaths() {
  const client = createApolloClient({});
  const { data } = await client.query<PageCollection, PageCollectionVariables>({
    query: PAGE_COLLECTION,
    variables: {
      pageType: 'Lease Finance',
    },
  });
  const items = data?.pageCollection?.items;

  return {
    paths: getPathsFromPageCollection(items, 'lease-finance'),
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
        slug: `lease-finance/${paths?.join('/')}`,
      },
    });
    if (errors) {
      throw new Error(errors[0].message);
    }
    return {
      revalidate: Number(process.env.REVALIDATE_INTERVAL),
      props: {
        data,
      },
    };
  } catch (err) {
    throw new Error(err);
  }
}

export default EligibilityChecker;
