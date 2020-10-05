import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { getDataFromTree } from '@apollo/react-ssr';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import withApollo from '../../../hocs/withApollo';
import LeasingExplainedContainer from '../../../containers/LeasingExplainedContainer/LeasingExplainedContainer';
import { useGenericPage } from '../../../gql/genericPage';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage';
import { getSectionsData } from '../../../utils/getSectionsData';

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
  const body = getSectionsData(['body'], data?.genericPage);

  return (
    <LeasingExplainedContainer body={body} title={title} sections={sections} />
  );
};

export default withApollo(FinanceInfo, { getDataFromTree });
