import { GetStaticPropsContext, GetStaticPropsResult, NextPage } from 'next';
import VehicleReviewCategoryContainer from '../../../containers/VehicleReviewCategoryContainer/VehicleReviewCategoryContainer';
import createApolloClient from '../../../apolloClient';
import { getSectionsData } from '../../../utils/getSectionsData';
import {
  getReviewsHubCategoryStaticProps,
  IReviewHubPage,
} from '../../../containers/VehicleReviewCategoryContainer/gql';
import { decodeData } from '../../../utils/data';
import { IPageWithError } from '../../../types/common';

const ReviewHub: NextPage<IReviewHubPage> = ({ data: encodedData }) => {
  const data = decodeData(encodedData);

  const metaData = getSectionsData(['metaData'], data.genericPage);
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

export async function getStaticProps(
  context: GetStaticPropsContext,
): Promise<GetStaticPropsResult<IReviewHubPage | IPageWithError>> {
  const client = createApolloClient({});
  return getReviewsHubCategoryStaticProps(client, 'reviews/vans', context);
}

export default ReviewHub;
