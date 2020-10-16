import { useRouter } from 'next/router';
import { NextPage } from 'next';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { useGenericPage } from '../../gql/genericPage';
import withApollo from '../../hocs/withApollo';
import FeaturedAndTilesContainer from '../../containers/FeaturedAndTilesContainer/FeaturedAndTilesContainer';

const NationalLeaguePage: NextPage = () => {
  const router = useRouter();
  const { data, loading, error } = useGenericPage(router.asPath.slice(1));

  if (loading) {
    return <Loading size="large" />;
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  return <FeaturedAndTilesContainer data={data} />;
};

export default withApollo(NationalLeaguePage);
