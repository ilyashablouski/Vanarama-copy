import { NextPage } from 'next';
import { useQuery } from '@apollo/client';
import { getDataFromTree } from '@apollo/react-ssr';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import withApollo from '../../../hocs/withApollo';
import FinanceExplainedContainer from '../../../containers/FinanceExplainedContainer/FinanceExplainedContainer';
import { VAN_LEASING_EXPLAINED_CONTENT } from '../../../gql/finance-options/financeOptions';
import { VanLeasingExplainedPage } from '../../../../generated/VanLeasingExplainedPage';
import Head from '../../../components/Head/Head';

const EligibilityChecker: NextPage = () => {
  const { data, loading, error } = useQuery<VanLeasingExplainedPage>(
    VAN_LEASING_EXPLAINED_CONTENT,
  );

  if (loading) {
    return <Loading size="large" />;
  }
  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!data?.genericPage) {
    return null;
  }

  const metaData = data?.genericPage?.metaData;
  const sections = data.genericPage?.sections;

  return (
    <>
      <Head
        title={metaData.title || ''}
        metaDescription={metaData.metaDescription}
        metaRobots={metaData.metaRobots}
        legacyUrl={metaData.legacyUrl}
        publishedOn={metaData.publishedOn}
        featuredImage={data?.genericPage.featuredImage}
      />
      <FinanceExplainedContainer
        title={metaData?.title}
        body={data?.genericPage?.body}
        sections={sections}
      />
    </>
  );
};

export default withApollo(EligibilityChecker, { getDataFromTree });
