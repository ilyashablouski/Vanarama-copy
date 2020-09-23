import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { getDataFromTree } from '@apollo/react-ssr';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import withApollo from '../../../hocs/withApollo';
import Head from '../../../components/Head/Head';
import { useGenericPage } from '../../../gql/genericPage';
import FinanceGapInsuranceContainer from '../../../containers/FinanceGapInsuranceContainer/FinanceGapInsuranceContainer';

const MultiYearInsurancePage: NextPage = () => {
  const path = useRouter();
  const { data, loading, error } = useGenericPage(path.asPath);

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
      <FinanceGapInsuranceContainer sections={sections} />
      <Head
        metaData={metaData}
        featuredImage={data?.genericPage.featuredImage}
      />
    </>
  );
};

export default withApollo(MultiYearInsurancePage, { getDataFromTree });
