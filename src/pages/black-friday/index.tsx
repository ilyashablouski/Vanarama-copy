import { NextPage } from 'next';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import { useRouter } from 'next/router';
import withApollo from '../../hocs/withApollo';
import { useGenericPage } from '../../gql/genericPage';
import FeaturedAndTilesContainer from '../../containers/FeaturedAndTilesContainer/FeaturedAndTilesContainer';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

const BlackFriday: NextPage = () => {
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

export default withApollo(BlackFriday);
