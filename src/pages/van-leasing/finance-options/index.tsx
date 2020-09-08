import { NextPage } from 'next';
import { getDataFromTree } from '@apollo/react-ssr';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import withApollo from '../../../hocs/withApollo';
import FinanceExplainedContainer from '../../../containers/FinanceExplainedContainer/FinanceExplainedContainer';
import Head from '../../../components/Head/Head';
import { useGenericPage } from '../../../gql/genericPage';

const EligibilityChecker: NextPage = () => {
  const { data, loading, error } = useGenericPage(
    '/finance-info/van-finance-options',
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
        metaData={metaData}
        featuredImage={data?.genericPage.featuredImage}
      />
      <FinanceExplainedContainer
        title={metaData.name}
        body={data?.genericPage?.body}
        sections={sections}
      />
    </>
  );
};

export default withApollo(EligibilityChecker, { getDataFromTree });
