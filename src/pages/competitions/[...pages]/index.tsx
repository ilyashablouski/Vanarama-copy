import { GetStaticPropsContext, NextPage, NextPageContext } from 'next';
import SchemaJSON from 'core/atoms/schema-json';
import { PAGE_COLLECTION } from '../../../gql/pageCollection';
import { IInsurancePage } from '../../../models/IInsuranceProps';
import { GENERIC_PAGE } from '../../../gql/genericPage';
import CompetitionPageContainer from '../../../containers/CompetitionPageContainer/CompetitionPageContainer';
import createApolloClient from '../../../apolloClient';
import {
  PageCollection,
  PageCollectionVariables,
} from '../../../../generated/PageCollection';
import { getPathsFromPageCollection } from '../../../utils/pageSlugs';
import { getSectionsData } from '../../../utils/getSectionsData';
import Head from '../../../components/Head/Head';

const CompetitionPage: NextPage<IInsurancePage> = ({ data }) => {
  const metaData = getSectionsData(['metaData'], data?.genericPage);
  const featuredImage = getSectionsData(['featuredImage'], data?.genericPage);
  const sections = getSectionsData(['sections'], data?.genericPage);
  const breadcrumbsItems = getSectionsData(
    ['metaData', 'breadcrumbs'],
    data?.genericPage,
  );

  return (
    <>
      <CompetitionPageContainer
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

export async function getStaticPaths() {
  const client = createApolloClient({});
  const { data } = await client.query<PageCollection, PageCollectionVariables>({
    query: PAGE_COLLECTION,
    variables: {
      pageType: 'Competition',
    },
  });
  const items = data?.pageCollection?.items;

  return {
    paths: getPathsFromPageCollection(items, 'competitions'),
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
        slug: `competitions/${paths?.join('/')}`,
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

export default CompetitionPage;
