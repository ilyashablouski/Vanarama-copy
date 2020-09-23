import { NextPage } from 'next';
import { getDataFromTree } from '@apollo/react-ssr';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import ThankYouContainer from '../../../containers/ThankYouContainer/ThankYouContainer';
import withApollo from '../../../hocs/withApollo';
import { useGenericPage } from '../../../gql/genericPage';
import Head from '../../../components/Head/Head';

const ThankYouPage: NextPage = () => {
  const { data, loading, error } = useGenericPage(
    '/van-insurance/multi-year-van-insurance/thank-you',
  );

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

  return (
    <>
      <ThankYouContainer sections={sections} />
      <Head
        metaData={metaData}
        featuredImage={data?.genericPage.featuredImage}
      />
    </>
  );
};

export default withApollo(ThankYouPage, { getDataFromTree });
