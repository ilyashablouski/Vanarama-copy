import { GetStaticPropsContext, NextPage, NextPageContext } from 'next';
import DefaultErrorPage from 'next/error';
import { IInsurancePage } from '../../../models/IInsuranceProps';
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
  const breadcrumbsItems = breadcrumbsData?.genericPage.metaData.breadcrumbs;

  return (
    <FinanceGapInsuranceContainer
      sections={sections}
      breadcrumbsData={breadcrumbsItems}
    />
  );
};

export async function getStaticProps(context: GetStaticPropsContext) {
  try {
    const client = createApolloClient({}, context as NextPageContext);
    const { data, errors } = await client.query({
      query: GENERIC_PAGE,
      variables: {
        slug: 'insurance/multi-year-insurance',
      },
    });
    const { data: breadcrumbsData } = await client.query({
      query: GENERIC_PAGE_BREADCRUMBS,
      variables: {
        slug: 'insurance/multi-year-insurance',
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
