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

const MultiYearInsurancePage: NextPage<IInsurancePage> = ({
  data,
  breadcrumbsData,
  error,
}) => {
  if (error) {
    return <DefaultErrorPage statusCode={404} />;
  }

  const sections = data?.genericPage?.sections;
  const intro = data?.genericPage?.intro;
  const breadcrumbsItems = breadcrumbsData?.genericPage.metaData.breadcrumbs;

  if (data?.genericPage.metaData.title?.includes('Thank You')) {
    return <ThankYouContainer sections={sections} />;
  }

  if (data?.genericPage.metaData.title?.includes('FAQ')) {
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
  const { data } = await client.query({
    query: PAGE_COLLECTION,
    variables: {
      pageType: 'Insurance',
    },
  });
  const paths = data.pageCollection.items
    .filter(item => item.slug.split('/').length > 1)
    .map(item => `/${item.slug}`);

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  try {
    const client = createApolloClient({}, context as NextPageContext);
    const insurances = context?.params?.insurances as string[];

    const { data, errors } = await client.query({
      query: GENERIC_PAGE,
      variables: {
        slug: `insurance/${insurances?.join('/')}`,
      },
    });
    const { data: breadcrumbsData } = await client.query({
      query: GENERIC_PAGE_BREADCRUMBS,
      variables: {
        slug: `insurance/${insurances?.join('/')}`,
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
