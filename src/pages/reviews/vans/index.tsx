import { NextPage } from 'next';
import { getDataFromTree } from '@apollo/react-ssr';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import { useRouter } from 'next/router';
import withApollo from '../../../hocs/withApollo';
import VehicleReviewCategoryContainer from '../../../containers/VehicleReviewCategoryContainer/VehicleReviewCategoryContainer';
import { useReviewsHubCategoryQuery } from '../../../containers/VehicleReviewCategoryContainer/gql';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage';
import { getSectionsData } from '../../../utils/getSectionsData';

const ReviewHub: NextPage = () => {
  const router = useRouter();

  const { data, loading, error } = useReviewsHubCategoryQuery(
    router.asPath.slice(1),
  );

  if (loading) {
    return <Loading size="large" />;
  }
  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  if (!data?.genericPage) {
    return null;
  }

  const metaData = getSectionsData(['metaData', 'name'], data.genericPage);
  const breadcrumbsItems = metaData?.breadcrumbs?.map((el: any) => ({
    link: { href: el.href || '', label: el.label },
  }));

  return (
    <VehicleReviewCategoryContainer
      data={data}
      breadcrumbsItems={breadcrumbsItems}
    />
  );
};

export default withApollo(ReviewHub, { getDataFromTree });
