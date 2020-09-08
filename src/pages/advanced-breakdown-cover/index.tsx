import { NextPage } from 'next';
import { getDataFromTree } from '@apollo/react-ssr';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import withApollo from '../../hocs/withApollo';
import Head from '../../components/Head/Head';
import AdvancedBreakdownCoverContainer from '../../containers/BreakdownCoverContainer/AdvancedBreakdownCoverContainer';
import { useAdvancedBreakdownCoverPage } from '../../gql/advancedBreakdownCoverPage';

const EligibilityChecker: NextPage = () => {
  const { data, loading, error } = useAdvancedBreakdownCoverPage();
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

  if (!data?.advancedBreakdownCoverPage) {
    return null;
  }

  const metaData = data?.advancedBreakdownCoverPage?.metaData;
  const sections = data.advancedBreakdownCoverPage?.sections;

  return (
    <>
      <Head
        metaData={metaData}
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
