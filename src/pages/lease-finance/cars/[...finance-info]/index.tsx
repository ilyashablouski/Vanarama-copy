import { NextPage } from 'next';
import { getDataFromTree } from '@apollo/react-ssr';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import { useRouter } from 'next/router';
import withApollo from '../../../../hocs/withApollo';
import FinanceInformationExplainedContainer from '../../../../containers/FinanceInformationExplainedContainer/FinanceInfromationExplainedContainer';
import { useGenericPage } from '../../../../gql/genericPage';
import ErrorMessage from '../../../../components/ErrorMessage/ErrorMessage';
import { getSectionsData } from '../../../../utils/getSectionsData';

const FinanceInfo: NextPage = () => {
  const router = useRouter();
  const { data, loading, error } = useGenericPage(router.asPath.slice(1));

  if (loading) {
    return <Loading size="large" />;
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  if (!data?.genericPage) {
    return null;
  }

  const title = getSectionsData(['metaData', 'name'], data?.genericPage);
  const sections = getSectionsData(['sections'], data?.genericPage);

  return (
    <FinanceInformationExplainedContainer title={title} sections={sections} />
  );
};

export default withApollo(FinanceInfo, { getDataFromTree });
