import { NextPage } from 'next';
import { getDataFromTree } from '@apollo/react-ssr';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import { useRouter } from 'next/router';
import ThankYouContainer from '../../../containers/ThankYouContainer/ThankYouContainer';
import withApollo from '../../../hocs/withApollo';
import { useGenericPage } from '../../../gql/genericPage';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage';

const ThankYouPage: NextPage = () => {
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

  return <ThankYouContainer sections={sections} />;
};

export default withApollo(ThankYouPage, { getDataFromTree });
