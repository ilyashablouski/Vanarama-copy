import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { getDataFromTree } from '@apollo/react-ssr';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import withApollo from '../../hocs/withApollo';
import LeasingQuestionsContainer from '../../containers/LeasingQuestionsContainer/LeasingQuestionsContainer';
import Head from '../../components/Head/Head';
import { useGenericPage } from '../../gql/genericPage';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

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

  const metaData = data?.genericPage?.metaData;
  const sections = data.genericPage?.sections;
  const body = data.genericPage?.body;

  return (
    <>
      <LeasingQuestionsContainer
        body={body}
        title={metaData?.name}
        sections={sections}
      />
      <Head
        metaData={metaData}
        featuredImage={data?.genericPage.featuredImage}
      />
    </>
  );
};

export default withApollo(FinanceInfo, { getDataFromTree });
