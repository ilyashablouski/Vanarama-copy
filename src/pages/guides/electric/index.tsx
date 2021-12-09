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
import { getBreadCrumbsItems } from '../../../utils/breadcrumbs';

const ElectricGuides: NextPage<IReviewHubPage> = ({ data: encodedData }) => {
  const data = decodeData(encodedData);

  const metaData = getSectionsData(['metaData'], data.genericPage);
  const breadcrumbsItems = getBreadCrumbsItems(metaData);

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
  return getReviewsHubCategoryStaticProps(client, 'guides/electric', context);
}

export default ElectricGuides;
