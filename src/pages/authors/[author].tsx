import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { useGenericPage } from '../../gql/genericPage';
import withApollo from '../../hocs/withApollo';
import SimplePageContainer from '../../containers/SipmlePageContainer/SipmlePageContainer';

const AuthorPage: NextPage = () => {
  const router = useRouter();
  const { data, loading, error } = useGenericPage(router.asPath.slice(1));

  return <SimplePageContainer data={data} loading={loading} error={error} />;
};

export default withApollo(AuthorPage);
