import { GetStaticPropsContext, NextPage, NextPageContext } from 'next';
import dynamic from 'next/dynamic';
import { PAGE_COLLECTION } from '../../../gql/pageCollection';
import { IInsurancePage } from '../../../models/IInsuranceProps';
import { GENERIC_PAGE_QUESTION } from '../../../containers/LeasingQuestionContainer/gql';
import createApolloClient from '../../../apolloClient';
import {
  PageCollection,
  PageCollectionVariables,
} from '../../../../generated/PageCollection';
import { getPathsFromPageCollection } from '../../../utils/pageSlugs';
import { getSectionsData } from '../../../utils/getSectionsData';
import Skeleton from '../../../components/Skeleton';

const SchemaJSON = dynamic(() => import('core/atoms/schema-json'), {
  loading: () => <Skeleton count={1} />,
});
const Head = dynamic(() => import('../../../components/Head/Head'), {
  loading: () => <Skeleton count={1} />,
});
const Breadcrumb = dynamic(
  () => import('../../../components/Breadcrumb/Breadcrumb'),
  {
    loading: () => <Skeleton count={1} />,
  },
);
const LeasingQuestionContainer = dynamic(
  () =>
    import(
      '../../../containers/LeasingQuestionContainer/LeasingQuestionContainer'
    ),
  {
    loading: () => <Skeleton count={1} />,
  },
);

const MultiYearInsurancePage: NextPage<IInsurancePage> = ({ data }) => {
  const metaData = getSectionsData(['metaData'], data?.genericPage);
  const featuredImage = getSectionsData(['featuredImage'], data?.genericPage);
  const body = getSectionsData(['intro', 'body'], data?.genericPage);
  const sections = getSectionsData(['sections'], data?.genericPage);
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
      <LeasingQuestionContainer
        body={body}
        title={metaData?.name}
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

export async function getStaticPaths() {
  const client = createApolloClient({});
  const { data } = await client.query<PageCollection, PageCollectionVariables>({
    query: PAGE_COLLECTION,
    variables: {
      pageType: 'Leasing Question',
    },
  });
  const items = data?.pageCollection?.items;

  return {
    paths: getPathsFromPageCollection(items, 'leasing-questions'),
    fallback: false,
  };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  try {
    const client = createApolloClient({}, context as NextPageContext);
    const paths = context?.params?.question as string[];

    const { data, errors } = await client.query({
      query: GENERIC_PAGE_QUESTION,
      variables: {
        slug: `leasing-questions/${paths?.join('/')}`,
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

export default MultiYearInsurancePage;
