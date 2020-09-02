import { NextPage } from 'next';
import { getDataFromTree } from '@apollo/react-ssr';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import { useRouter } from 'next/router';
import withApollo from '../../hocs/withApollo';
import Head from '../../components/Head/Head';
import { useGenericPageQuestion } from '../../containers/LeasingQuestionContainer/gql';
import VehicleReviewContainer from '../../containers/VehicleReviewContainer/VehicleReviewContainer';
import { useReviewsPageQuery } from 'containers/VehicleReviewContainer/gql';

const FinanceInfo: NextPage = () => {
  const router = useRouter();

  const { data, loading, error } = useReviewsPageQuery(
    `/van-reviews/${router.query.van as string}`,
  );

  if (loading) {
    return <Loading size="large" />;
  }
  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!data?.reviewsPage) {
    return null;
  }

  const metaData = data?.reviewsPage?.metaData;
  const sections = data.reviewsPage?.sections;
  const body = data.reviewsPage?.body;

  const crumbs = [
    { label: 'Home', href: '/' },
    {
      label: 'Van Reviews',
      href: '/van-reviews',
    },
    {
      label: data.reviewsPage.metaData.name || '',
      href: '/',
    },
  ];

  return (
    <>
      <Head
        title={metaData.title || ''}
        metaDescription={metaData.metaDescription}
        metaRobots={metaData.metaRobots}
        legacyUrl={metaData.legacyUrl}
        publishedOn={metaData.publishedOn}
        //featuredImage={data?.reviewsPage.metaData.}
      />
      <VehicleReviewContainer
        crumbs={crumbs}
        body={body}
        title={metaData?.title}
        sections={sections}
      />
    </>
  );
};

export default withApollo(FinanceInfo, { getDataFromTree });
