import { NextPage } from 'next';
import { getDataFromTree } from '@apollo/react-ssr';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import { useVanaramaSmilesPage } from '../../containers/VanaramaSmilesContainer/gql';
import withApollo from '../../hocs/withApollo';
import Head from '../../components/Head/Head';
import VanaramaSmilesContainer from '../../containers/VanaramaSmilesContainer/VanaramaSmilesContainer';

const EligibilityChecker: NextPage = () => {
  const { data, loading, error } = useVanaramaSmilesPage(
    'welcome-to-vanarama-smiles',
  );
  if (loading) {
    return <Loading size="large" />;
  }
  if (error) {
    return (
      <div>
        <p>Error: {error?.message}</p>
      </div>
    );
  }

  if (!data?.genericPage) {
    return null;
  }

  const metaData = data?.genericPage?.metaData;
  const sections = data.genericPage?.sections;

  return (
    <>
      <Head
        title={metaData.title || ''}
        metaDescription={metaData.metaDescription}
        metaRobots={metaData.metaRobots}
        legacyUrl={metaData.legacyUrl}
        canonicalUrl={metaData.canonicalUrl}
        publishedOn={metaData.publishedOn}
        featuredImage={data?.genericPage.featuredImage}
      />
      <VanaramaSmilesContainer
        title={metaData?.name}
        body={data?.genericPage?.body}
        sections={sections}
      />
    </>
  );
};

export default withApollo(EligibilityChecker, { getDataFromTree });
