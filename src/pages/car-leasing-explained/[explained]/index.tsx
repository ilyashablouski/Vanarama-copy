import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { getDataFromTree } from '@apollo/react-ssr';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import withApollo from '../../../hocs/withApollo';
import LeasingArticleContainer from '../../../containers/LeasingArticleContainer/LeasingArticleContainer';
import Head from '../../../components/Head/Head';
import { useGenericPage } from '../../../gql/genericPage';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage';

const FinanceInfo: NextPage = () => {
  const router = useRouter();
  const { data, loading, error } = useGenericPage(`guides${router.asPath}`);

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
      <LeasingArticleContainer
        body={body}
        title={metaData?.name}
        sections={sections}
        image={data?.genericPage.featuredImage?.file?.url}
      />
      <Head
        metaData={metaData}
        featuredImage={data?.genericPage.featuredImage}
      />
    </>
  );
};

export default withApollo(FinanceInfo, { getDataFromTree });
