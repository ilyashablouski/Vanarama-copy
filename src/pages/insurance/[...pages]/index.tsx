import { GetStaticPropsContext, NextPage, NextPageContext } from 'next';
import DefaultErrorPage from 'next/error';
import { PAGE_COLLECTION } from '../../../gql/pageCollection';
import ThankYouContainer from '../../../containers/ThankYouContainer/ThankYouContainer';
import { IInsurancePage } from '../../../models/IInsuranceProps';
import FAQContainer from '../../../containers/FAQContainer/FAQContainer';
import {
  GENERIC_PAGE,
  GENERIC_PAGE_BREADCRUMBS,
} from '../../../gql/genericPage';
import FinanceGapInsuranceContainer from '../../../containers/FinanceGapInsuranceContainer/FinanceGapInsuranceContainer';
import createApolloClient from '../../../apolloClient';
import {
  PageCollection,
  PageCollectionVariables,
} from '../../../../generated/PageCollection';
import { getPathsFromPageCollection } from '../../../utils/pageSlugs';

const MultiYearInsurancePage: NextPage<IInsurancePage> = ({
  data,
  breadcrumbsData,
  error,
}) => {
  if (error) {
    return <DefaultErrorPage statusCode={404} />;
  }
  const genericPage = data?.genericPage;

  const sections = genericPage?.sections;
  const intro = genericPage?.intro;
  const breadcrumbsItems = breadcrumbsData?.genericPage.metaData.breadcrumbs;
  const title = genericPage?.metaData.title;

  if (title?.includes('Thank You')) {
    return <ThankYouContainer sections={sections} />;
  }

  if (title?.includes('FAQ')) {
    return (
      <FAQContainer
        title={data?.genericPage.metaData.name}
        sections={sections}
        intro={intro}
      />
    );
  }

  return (
    <FinanceGapInsuranceContainer
      sections={sections}
      breadcrumbsData={breadcrumbsItems}
    />
  );
};

export async function getStaticPaths() {
  const client = createApolloClient({});
  const { data } = await client.query<PageCollection, PageCollectionVariables>({
    query: PAGE_COLLECTION,
    variables: {
      pageType: 'Insurance',
    },
  });
  const items = data?.pageCollection?.items;

  return {
    paths: getPathsFromPageCollection(items),
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
        slug: `insurance/${paths?.join('/')}`,
      },
    });
    const { data: breadcrumbsData } = await client.query({
      query: GENERIC_PAGE_BREADCRUMBS,
      variables: {
        slug: `insurance/${paths?.join('/')}`,
      },
    });
    return {
      props: {
        data,
        breadcrumbsData,
        error: errors ? errors[0] : null,
      },
    };
  } catch {
    return {
      props: {
        error: true,
      },
    };
  }
}

export default MultiYearInsurancePage;
