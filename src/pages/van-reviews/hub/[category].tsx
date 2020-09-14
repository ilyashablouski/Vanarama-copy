import { NextPage } from 'next';
import { getDataFromTree } from '@apollo/react-ssr';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import { useRouter } from 'next/router';
import { getReviewCategoryCrumbs as getVehicleReviewCategoryCrumbs } from '../../../containers/VehicleReviewCategoryContainer/Utils';
import withApollo from '../../../hocs/withApollo';
import Head from '../../../components/Head/Head';
import VehicleReviewCategoryContainer from '../../../containers/VehicleReviewCategoryContainer/VehicleReviewCategoryContainer';
import { useReviewsHubCategoryQuery } from '../../../containers/VehicleReviewCategoryContainer/gql';

const FinanceInfo: NextPage = () => {
  const router = useRouter();

  const { data, loading, error } = useReviewsHubCategoryQuery(
    `${(router.query.category as string) || ''}`,
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
  const body = data.genericPage?.body;

  const crumbs = getVehicleReviewCategoryCrumbs(data);
  return (
    <>
      <Head
        metaData={metaData}
        featuredImage={data.genericPage.featuredImage}
      />
      <VehicleReviewCategoryContainer
        crumbs={crumbs}
        body={body}
        title={metaData?.name}
        sections={sections}
      />
    </>
  );
};

export default withApollo(FinanceInfo, { getDataFromTree });
