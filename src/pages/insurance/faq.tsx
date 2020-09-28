import { NextPage } from 'next';
import { getDataFromTree } from '@apollo/react-ssr';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import { useRouter } from 'next/router';
import withApollo from '../../hocs/withApollo';
import FAQContainer from '../../containers/FAQContainer/FAQContainer';
import Head from '../../components/Head/Head';
import { useGenericPage } from '../../gql/genericPage';

const EligibilityChecker: NextPage = () => {
  const router = useRouter();
  const { data, loading, error } = useGenericPage(router.asPath.slice(1));

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
  const intro = data.genericPage?.intro;

  return (
    <>
      <FAQContainer title={metaData.name} sections={sections} intro={intro} />
      <Head
        metaData={metaData}
        featuredImage={data?.genericPage.featuredImage}
      />
    </>
  );
};

export default withApollo(EligibilityChecker, { getDataFromTree });
