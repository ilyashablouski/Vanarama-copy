import { NextPage } from 'next';
import { getDataFromTree } from '@apollo/react-ssr';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import withApollo from '../../hocs/withApollo';
import Head from '../../components/Head/Head';
import { useGenericPage } from '../../gql/genericPage';
import FinanceGapInsurancePageContainer from '../../containers/FinanceGapInsurancePageContainer/FinanceGapInsurancePageContainer';

const FinanceGapInsurancePage: NextPage = () => {
  const { data, loading, error } = useGenericPage(
    '/van-insurance/finance-gap-insurance',
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
  const intro = data.genericPage?.intro;

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
      <FinanceGapInsurancePageContainer
        title={metaData.name}
        sections={sections}
        intro={intro}
      />
    </>
  );
};

export default withApollo(FinanceGapInsurancePage, { getDataFromTree });
