import { NextPage } from 'next';
import { getDataFromTree } from '@apollo/react-ssr';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import withApollo from '../../hocs/withApollo';
import Head from '../../components/Head/Head';
import { useGenericPage, useGenericPageHead } from '../../gql/genericPage';
import AdvancedBreakdownCoverContainer from 'containers/BreakdownCoverContainer/AdvancedBreakdownCoverContainer';
import { useAdvancedBreakdownCoverPage } from 'gql/advancedBreakdownCoverPage';

const EligibilityChecker: NextPage = () => {
  const { data, loading, error } = useAdvancedBreakdownCoverPage();
  const {
    data: dataHead,
    loading: loadingHead,
    error: errorHead,
  } = useGenericPageHead('/advanced-breakdown-cover');

  if (loading || loadingHead) {
    return <Loading size="large" />;
  }
  if (error || errorHead) {
    return <div><p>Error: {error?.message}</p><p>Error: {errorHead?.message}</p></div>;
  }

  if (!data?.advancedBreakdownCoverPage) {
    return null;
  }

  const metaData = data?.advancedBreakdownCoverPage?.metaData;
  const sections = data.advancedBreakdownCoverPage?.sections;

  return (
    <>
       <Head
        title={metaData.title || ''}
        metaDescription={metaData.metaDescription}
        metaRobots={metaData.metaRobots}
        legacyUrl={metaData.legacyUrl}
        publishedOn={metaData.publishedOn}
        featuredImage={data?.advancedBreakdownCoverPage.featuredImage}
      />
      <AdvancedBreakdownCoverContainer
        title={metaData?.title}
        body={data?.advancedBreakdownCoverPage?.body}
        sections={sections}
      />
    </>
  );
};

export default withApollo(EligibilityChecker, { getDataFromTree });
