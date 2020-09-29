import { NextPage } from 'next';
import { getDataFromTree } from '@apollo/react-ssr';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import withApollo from '../../hocs/withApollo';
import LeasingExplainedContainer from '../../containers/LeasingExplainedContainer/LeasingExplainedContainer';
import Head from '../../components/Head/Head';
import { useGenericPage } from '../../gql/genericPage';

const FinanceInfo: NextPage = () => {
  const { data, loading, error } = useGenericPage(
    'guides/car-leasing-explained',
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
  const body = data.genericPage?.body;

  return (
    <>
      <LeasingExplainedContainer
        body={body}
        title={metaData?.name}
        sections={sections}
      />
      <Head
        metaData={metaData}
        featuredImage={data?.genericPage.featuredImage}
      />
    </>
  );
};

export default withApollo(FinanceInfo, { getDataFromTree });
