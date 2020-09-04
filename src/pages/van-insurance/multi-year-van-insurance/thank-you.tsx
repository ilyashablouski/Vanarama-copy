import { NextPage } from 'next';
import { getDataFromTree } from '@apollo/react-ssr';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import ThankYouContainer from '../../../containers/ThankYouContainer/ThankYouContainer';
import withApollo from '../../../hocs/withApollo';
import { useGenericPage } from '../../../gql/genericPage';
import Head from '../../../components/Head/Head';

const crumbs = [
  { label: 'Home', href: '/' },
  { label: 'Van Insurance', href: '/van-insurance' },
  {
    label: 'Thank You',
    href: '/van-insurance/multi-year-van-insurance/thank-you',
  },
];

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
      <Head
        title={metaData.title || ''}
        metaDescription={metaData.metaDescription}
        metaRobots={metaData.metaRobots}
        legacyUrl={metaData.legacyUrl}
        publishedOn={metaData.publishedOn}
        canonicalUrl={metaData.canonicalUrl}
        featuredImage={data?.genericPage.featuredImage}
      />
      <ThankYouContainer sections={sections} crumbs={crumbs} />
    </>
  );
};

export default withApollo(ThankYouPage, { getDataFromTree });
