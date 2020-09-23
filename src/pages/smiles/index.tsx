import { NextPage } from 'next';
import { getDataFromTree } from '@apollo/react-ssr';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import { useGenericPage } from '../../gql/genericPage';
import withApollo from '../../hocs/withApollo';
import Head from '../../components/Head/Head';
import VanaramaSmilesContainer from '../../containers/VanaramaSmilesContainer/VanaramaSmilesContainer';

const EligibilityChecker: NextPage = () => {
  const { data, loading, error } = useGenericPage('welcome-to-vanarama-smiles');
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
      <VanaramaSmilesContainer
        title={metaData?.name}
        body={data?.genericPage?.body}
        sections={sections}
      />
      <Head
        metaData={metaData}
        featuredImage={data?.genericPage.featuredImage}
      />
    </>
  );
};

export default withApollo(EligibilityChecker, { getDataFromTree });
