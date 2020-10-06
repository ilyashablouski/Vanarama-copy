import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { getDataFromTree } from '@apollo/react-ssr';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import withApollo from '../../hocs/withApollo';
import LeasingQuestionsContainer from '../../containers/LeasingQuestionsContainer/LeasingQuestionsContainer';
import { useGenericPage } from '../../gql/genericPage';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

const FinanceInfo: NextPage = () => {
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

  return <LeasingQuestionsContainer data={data} />;
};

export default withApollo(FinanceInfo, { getDataFromTree });
