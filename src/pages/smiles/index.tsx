import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { getDataFromTree } from '@apollo/react-ssr';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import { useGenericPage } from '../../gql/genericPage';
import withApollo from '../../hocs/withApollo';
import FeaturedAndTilesContainer from '../../containers/FeaturedAndTilesContainer/FeaturedAndTilesContainer';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

const EligibilityChecker: NextPage = () => {
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

  return <FeaturedAndTilesContainer data={data} />;
};

export default withApollo(EligibilityChecker, { getDataFromTree });
