import { useRouter } from 'next/router';
import { NextPage } from 'next';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import Head from '../../components/Head/Head';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { useGenericPage } from '../../gql/genericPage';
import withApollo from '../../hocs/withApollo';
import { getSectionsData } from '../../utils/getSectionsData';
import FeaturedAndTilesContainer from '../../containers/FeaturedAndTilesContainer/FeaturedAndTilesContainer';

const RedundancyAndLifeEventCoverPage: NextPage = () => {
  const router = useRouter();
  const { data, loading, error } = useGenericPage(router.asPath.slice(1));

  if (loading) {
    return <Loading size="large" />;
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  const metaData = data?.genericPage?.metaData;
  const sections = getSectionsData(['sections'], data?.genericPage);

  return (
    <>
      <FeaturedAndTilesContainer
        title={metaData?.name || ''}
        body={data?.genericPage?.body || ''}
        sections={sections}
      />
      {metaData && (
        <Head
          metaData={metaData}
          featuredImage={data?.genericPage.featuredImage}
        />
      )}
    </>
  );
};

export default withApollo(RedundancyAndLifeEventCoverPage);
