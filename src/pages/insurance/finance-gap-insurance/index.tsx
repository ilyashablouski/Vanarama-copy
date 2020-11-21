import { GetStaticPropsContext, NextPage, NextPageContext } from 'next';
import DefaultErrorPage from 'next/error';
import { IInsurancePage } from '../../../models/IInsuranceProps';
import { GENERIC_PAGE } from '../../../gql/genericPage';
import FinanceGapInsuranceContainer from '../../../containers/FinanceGapInsuranceContainer/FinanceGapInsuranceContainer';
import createApolloClient from '../../../apolloClient';
import { getSectionsData } from '../../../utils/getSectionsData';

const MultiYearInsurancePage: NextPage<IInsurancePage> = ({ data, error }) => {
  if (error) {
    return <DefaultErrorPage statusCode={404} />;
  }

  const sections = getSectionsData(['sections'], data?.genericPage);
  const breadcrumbsItems = getSectionsData(
    ['metaData', 'breadcrumbs'],
    data?.genericPage,
  );

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
        slug: 'insurance/finance-gap-insurance',
      },
    });
    return {
      props: {
        data,
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
