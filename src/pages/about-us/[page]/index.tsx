import { useRouter } from 'next/router';
import { NextPage } from 'next';
import Head from '../../../components/Head/Head';
import { useGenericPage } from '../../../gql/genericPage';
import withApollo from '../../../hocs/withApollo';
import SimplePageContainer from '../../../containers/SipmlePageContainer/SipmlePageContainer';

const AboutUsPage: NextPage = () => {
  const router = useRouter();
  const { data, loading, error } = useGenericPage(router.asPath.slice(1));

  const metaData = data?.genericPage?.metaData;

  return (
    <>
      <SimplePageContainer data={data} loading={loading} error={error} />
      {metaData && (
        <Head
          metaData={metaData}
          featuredImage={data?.genericPage.featuredImage}
        />
      )}
    </>
  );
};

export default withApollo(AboutUsPage);
