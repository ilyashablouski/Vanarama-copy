import { NextPage } from 'next';
import { getDataFromTree } from '@apollo/react-ssr';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import withApollo from '../../../../hocs/withApollo';
import FinanceInformationExplainedContainer from '../../../../containers/FinanceInformationExplainedContainer/FinanceInfromationExplainedContainer';
import Head from '../../../../components/Head/Head';
import { useGenericPage } from '../../../../gql/genericPage';

const FinanceInfo: NextPage = () => {
  const { data, loading, error } = useGenericPage(
    '/finance-info/van-finance-options/business-contract-hire',
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
      <FinanceInformationExplainedContainer
        title={metaData?.title}
        sections={sections}
      />
    </>
  );
};

export default withApollo(FinanceInfo, { getDataFromTree });
