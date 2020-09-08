import { NextPage } from 'next';
import { getDataFromTree } from '@apollo/react-ssr';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import withApollo from '../../hocs/withApollo';
import LeasingQuestionsContainer from '../../containers/LeasingQuestionsContainer/LeasingQuestionsContainer';
import Head from '../../components/Head/Head';
import { useGenericPage } from '../../gql/genericPage';

const crumbs = [
  { label: 'Home', href: '/' },
  { label: 'Ask A Question About Van Leasing', href: '/van-leasing-questions' },
];

const FinanceInfo: NextPage = () => {
  const { data, loading, error } = useGenericPage('van-leasing-questions');

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
  const body = data.genericPage?.body;

  return (
    <>
      <Head
        metaData={metaData}
        featuredImage={data?.genericPage.featuredImage}
      />
      <LeasingQuestionsContainer
        crumbs={crumbs}
        body={body}
        title={metaData?.title}
        sections={sections}
      />
    </>
  );
};

export default withApollo(FinanceInfo, { getDataFromTree });
