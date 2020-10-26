import { NextPage } from 'next';
import { getDataFromTree } from '@apollo/react-ssr';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import { useRouter } from 'next/router';
import { useReviewsPageQuery } from '../../../../containers/VehicleReviewContainer/gql';
import withApollo from '../../../../hocs/withApollo';
import VehicleReviewContainer from '../../../../containers/VehicleReviewContainer/VehicleReviewContainer';
import ErrorMessage from '../../../../components/ErrorMessage/ErrorMessage';
import { getSectionsData } from '../../../../utils/getSectionsData';

const ReviewPage: NextPage = () => {
  const router = useRouter();

  const { data, loading, error } = useReviewsPageQuery(router.asPath.slice(1));

  if (loading) {
    return <Loading size="large" />;
  }
  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  if (!data?.reviewsPage) {
    return null;
  }

  const title = getSectionsData(['metaData', 'name'], data?.reviewsPage);
  const body = getSectionsData(['body'], data?.reviewsPage);
  const sections = getSectionsData(['sections'], data?.reviewsPage);

  return (
    <VehicleReviewContainer body={body} title={title} sections={sections} />
  );
};

export default withApollo(ReviewPage, { getDataFromTree });
