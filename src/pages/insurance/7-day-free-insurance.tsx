import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { getDataFromTree } from '@apollo/react-ssr';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import withApollo from '../../hocs/withApollo';
import { useGenericPage } from '../../gql/genericPage';
import FinanceGapInsuranceContainer from '../../containers/FinanceGapInsuranceContainer/FinanceGapInsuranceContainer';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

const MultiYearInsurancePage: NextPage = () => {
  const router = useRouter();
  const { data, loading, error } = useGenericPage(router.asPath.slice(1));

  if (loading) {
    return <Loading size="large" />;
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  if (!data?.genericPage) {
    return null;
  }

  const sections = data.genericPage?.sections;

  return <FinanceGapInsuranceContainer sections={sections} />;
};

export default withApollo(MultiYearInsurancePage, { getDataFromTree });
