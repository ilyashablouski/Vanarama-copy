import { NextPage } from 'next';
import { getDataFromTree } from '@apollo/react-ssr';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import withApollo from '../../hocs/withApollo';
import FAQContainer from '../../containers/FAQContainer/FAQContainer';
import Head from '../../components/Head/Head';
import { useGenericPage } from '../../gql/genericPage';

const EligibilityChecker: NextPage = () => {
  const { data, loading, error } = useGenericPage('/van-insurance/faq');

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
      <Head
        title={metaData.title || ''}
        metaDescription={metaData.metaDescription}
        metaRobots={metaData.metaRobots}
        legacyUrl={metaData.legacyUrl}
        publishedOn={metaData.publishedOn}
        featuredImage={data?.genericPage.featuredImage}
      />
      <FAQContainer title={metaData?.title} sections={sections} intro={intro} />
    </>
  );
};

export default withApollo(EligibilityChecker, { getDataFromTree });
