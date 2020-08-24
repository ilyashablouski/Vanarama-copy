import { NextPage } from 'next';
import { getDataFromTree } from '@apollo/react-ssr';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import withApollo from '../../hocs/withApollo';
import LeasingExplainedContainer from '../../containers/LeasingExplainedContainer/LeasingExplainedContainer';
import Head from '../../components/Head/Head';
import { useGenericPage } from '../../gql/genericPage';

const crumbs = [
  { label: 'Home', href: '/' },
  { label: 'Van Leasing Explained', href: '/van-leasing-explained' },
];

const FinanceInfo: NextPage = () => {
  const { data, loading, error } = useGenericPage('/van-leasing-explained');

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
        title={metaData.title || ''}
        metaDescription={metaData.metaDescription}
        metaRobots={metaData.metaRobots}
        legacyUrl={metaData.legacyUrl}
        publishedOn={metaData.publishedOn}
        featuredImage={data?.genericPage.featuredImage}
      />
      <LeasingExplainedContainer
        crumbs={crumbs}
        body={body}
        title={metaData?.title}
        sections={sections}
      />
    </>
  );
};

export default withApollo(FinanceInfo, { getDataFromTree });
